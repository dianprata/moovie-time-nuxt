import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { GenreList, Media, MediaType, PageResult, Review } from '~/types'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://moovie-time-proxy.vercel.app'

const promiseCache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

async function _fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}) {
  return await $fetch(url, {
    baseURL: `${apiBaseUrl}/tmdb`,
    params,
  })
}

export function fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  const state = useState<any>(hash, () => null)
  if (state.value)
    return state.value
  if (!promiseCache.has(hash)) {
    promiseCache.set(
      hash,
      _fetchTMDB(url, params)
        .then((res) => {
          state.value = res
          return res
        })
        .catch((e) => {
          promiseCache.delete(hash)
          throw e
        }),
    )
  }
  return promiseCache.get(hash)!
}

export function listMedia(type: MediaType, query: string, page: number): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${query}`, { page })
}

export function getMedia(type: MediaType, id: string): Promise<Media> {
  return fetchTMDB(`${type}/${id}`, {
    include_image_language: 'en',
  })
}

export function getRecommendations(type: MediaType, id: string, page = 1): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${id}/recommendations`, { page })
}

export function getReviews(type: MediaType, id: string, page = 1): Promise<PageResult<Review>> {
  return fetchTMDB(`${type}/${id}/reviews`, { page })
}

export function getDiscover(type: MediaType, payload: any): Promise<PageResult<Media>> {
  return fetchTMDB(`discover/${type}`, payload)
}

export function getGenreList(media: string): Promise<GenreList> {
  return fetchTMDB(`genre/${media}/list`)
}

export function getSearchKeyword(query: string) {
  return fetchTMDB('search/multi', { query })
}

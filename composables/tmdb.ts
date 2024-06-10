import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Media, MediaType, PageResult, Review } from '~/types'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

function _fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}) {
  return $fetch(`/api/tmdb/${url}`, {
    params,
  })
}

export function fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchTMDB(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
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

export function getGenreList(media: string): Promise<{ name: string; id: number }[]> {
  return fetchTMDB(`genre/${media}/list`).then(res => res.genres)
}

export function getSearchKeyword(query: string) {
  return fetchTMDB('search/multi', { query })
}

export function getTrendingList(media: string, time_window: string = 'day'): Promise<PageResult<Media>> {
  return fetchTMDB(`trending/${media}/${time_window}`, { language: 'id-ID' })
}

export function getConfiguration(config: string, query?: string) {
  return fetchTMDB(`configuration/${config}`, { query })
}

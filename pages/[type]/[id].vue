<script setup lang="ts">
import type { MediaType } from '~/types'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')
const id = computed(() => route.params.id as string)

const [item, recommendations, reviews] = await Promise.all([
  getMedia(type.value, id.value),
  getRecommendations(type.value, id.value),
  getReviews(type.value, id.value),
])

const genreList = await getGenreList(type.value)
function getGenre(genre_ids: number) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}

const $img = useImage()

useHead({
  title: item.name || item.title,
  meta: [
    { name: 'description', content: item.overview },
    { property: 'og:title', content: item.name || item.title },
    { property: 'og:description', content: item.overview },
    { property: 'og:image', content: $img(`/tmdb${item.poster_path}`, { width: 1200, height: 630 }) },
    { property: 'twitter:title', content: item.name || item.title },
    { property: 'twitter:description', content: item.overview },
    { property: 'twitter:image', content: $img(`/tmdb${item.poster_path}`, { width: 1200, height: 630 }) },
  ],
})
</script>

<template>
  <div>
    <MediaHero :item="item" />
    <MediaReviews :reviews="reviews.results" class="pt-40" />
    <div class="container-wrapper px-4 py-12">
      <h1 class="mb-10 text-white font-semibold uppercase">
        Recommendation Movies
      </h1>
      <div class="grid grid-cols-minmax-10rem gap-6 lg:grid-cols-minmax-12rem">
        <MediaCard
          v-for="list in recommendations.results"
          :key="list.id"
          :item="list"
          :genre="getGenre(list.genre_ids[0])"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

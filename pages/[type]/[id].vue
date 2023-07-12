<script setup lang="ts">
import type { MediaType } from '~/types'

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')
const id = computed(() => route.params.id as string)

const [item, recommendations, reviews] = await Promise.all([
  getMedia(type.value, id.value),
  getRecommendations(type.value, id.value),
  getReviews(type.value, id.value),
])

const genreList = await getGenreList(type.value)
function getGenre(genre_ids) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}
</script>

<template>
  <div>
    <MediaHero :item="item" />
    <MediaReviews :reviews="reviews.results" class="pt-40" />
    <div class="container-wrapper px-4 py-12">
      <h1 class="mb-10 font-semibold uppercase text-white">
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

<script setup lang="ts">
import { getTrendingList } from '~/composables/tmdb'

const lists = [
  { title: 'Movies', type: 'movie' },
  { title: 'TV Shows', type: 'tv' },
]

const slides = await getTrendingList('movie', 'week')
</script>

<template>
  <div>
    <MediaSlider :items="slides.results" />
    <DiscoverList
      v-for="list in lists"
      :key="list.type"
      :title="list.title"
      :type="list.type"
      class="mb-10 sm:mb-20"
    />
  </div>
</template>

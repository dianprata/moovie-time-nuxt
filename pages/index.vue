<script setup lang="ts">
const lists = [
  { title: 'Movies', type: 'movie' },
  { title: 'TV Shows', type: 'tv' },
]

const slides = await listMedia('movie', 'top_rated', 1)
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

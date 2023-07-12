<script setup lang="ts">
import type { Media, MediaType } from '~/types'

const props = defineProps<{
  type: MediaType
  title: string
}>()

const sortBy = ref('popularity')
const lists = ref<Media[]>()

const genreList = await getGenreList(props.type)
function getGenre(genre_ids) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}
watch(sortBy, () => {
  fetchDiscoverList()
})
async function fetchDiscoverList() {
  const payload = {
    page: 1,
    sort_by: `${sortBy.value}.desc`,
  }
  const data = await getDiscover(props.type, payload)
  lists.value = data.results
}

onMounted(() => fetchDiscoverList())
</script>

<template>
  <div>
    <div class="h-80 bg-white/5" />
    <div class="container-wrapper px-4 -mt-64 sm:-mt-56">
      <div class="mb-10 flex flex-col justify-between gap-x-2 gap-y-4 md:flex-row">
        <div class="text-2xl font-semibold">
          <span class="bg-primary mb-3 block h-[6px] w-32" />
          <span>Discover {{ title }}</span>
        </div>
        <div class="flex items-center gap-3 sm:gap-5">
          <button
            class="rounded-full py-1.5 btn"
            :class="sortBy === 'popularity' ? 'btn-primary' : 'btn-secondary'"
            @click="sortBy = 'popularity'"
          >
            Popularity
          </button>
          <button
            class="rounded-full py-1.5 btn"
            :class="sortBy === 'primary_release_date' ? 'btn-primary' : 'btn-secondary'"
            @click="sortBy = 'primary_release_date'"
          >
            Release Date
          </button>
        </div>
      </div>
      <div class="grid grid-cols-minmax-10rem gap-6 lg:grid-cols-minmax-12rem">
        <MediaCard
          v-for="list in lists"
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

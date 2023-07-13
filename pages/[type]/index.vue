<script setup lang="ts">
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import type { Genre, Media, MediaType, Options } from '~/types'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')

useHead({
  title: type.value === 'movie' ? 'Movies' : 'TV Shows',
})

const title = getTitle(type.value)
const filterBottomSheet = ref()
const loadingLoad = ref(false)
const page = ref(1)

const sortBy = ref({
  name: 'Popularity Descending',
  value: 'popularity.desc',
})
const genres = ref<Genre[]>([])

const lists = ref<Media[]>([])
const sortByOptions: Options[] = [
  {
    name: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    name: 'Popularity Descending',
    value: 'popularity.desc',
  },
  {
    name: 'Release Date Ascending',
    value: 'primary_release_date.asc',
  },
  {
    name: 'Release Date Descending',
    value: 'primary_release_date.desc',
  },
  {
    name: 'Rating Ascending',
    value: 'vote_average.asc',
  },
  {
    name: 'Rating Descending',
    value: 'vote_average.desc',
  },
] as Options[]
const genreList = await getGenreList(type.value)
function getGenre(genre_ids: number) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}

async function fetchDiscoverList(loadMore = false) {
  const payload = {
    page: page.value,
    sort_by: sortBy.value.value,
    with_genres: genres.value.map(obj => obj.id).join(','),
  }
  const data = await getDiscover(type.value, payload)
  if (loadMore)
    lists.value.push(...data.results)
  else
    lists.value = data.results
}

function openFilter() {
  filterBottomSheet.value.open()
}

function resetFilter() {
  sortBy.value = {
    name: 'Popularity Descending',
    value: 'popularity.desc',
  }
  genres.value = []
  page.value = 1
  fetchDiscoverList()
}

const filtered = computed(() => sortBy.value.value !== 'popularity.desc' || genres.value.length > 0)

async function handleLoadMore() {
  if (loadingLoad.value)
    return
  loadingLoad.value = true
  try {
    page.value++
    await fetchDiscoverList(true)
  }
  finally {
    loadingLoad.value = false
  }
}

watch(() => sortBy.value, () => {
  page.value = 1
  fetchDiscoverList()
})

watch(() => genres.value, () => {
  page.value = 1
  fetchDiscoverList()
})

onMounted(() => {
  fetchDiscoverList()
})
</script>

<template>
  <div class="my-10 sm:mt-0">
    <div class="hidden h-80 bg-white/5 sm:block" />
    <div class="container-wrapper px-4 sm:-mt-60">
      <div class="mb-6 flex items-end justify-between gap-4 md:mb-10">
        <div class="text-2xl font-semibold md:text-4xl">
          <span class="mb-3 block h-[6px] w-20 bg-primary md:w-32" />
          <span class="capitalize">{{ title }}</span>
        </div>
        <div class="flex items-center md:hidden">
          <button
            class="flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm"
            :class="{ 'border-primary text-primary': filtered }"
            @click="openFilter"
          >
            <span class="i-ph:sliders-horizontal-duotone" />
            <span>Filter</span>
          </button>
          <button
            v-if="filtered"
            class="px-4 py-1.5 text-sm text-blue-400"
            @click="resetFilter"
          >
            <span>Reset</span>
          </button>
        </div>
      </div>
      <div class="flex gap-8">
        <div class="hidden h-full w-60 rounded-lg from-[#0E1723] to-[#1E232A]/0 bg-gradient-to-b md:block">
          <div class="p-5">
            <span class="text-base font-semibold text-neutral-200">
              Sort Result By
            </span>
          </div>
          <hr class="border-white/7">
          <div class="p-5">
            <BaseSelect v-model="sortBy" :max-width="200" placeholder="Choose Sort By" :options="sortByOptions" />
          </div>
          <hr class="border-white/7">
          <div class="px-5 py-3">
            <span class="text-base font-semibold text-neutral-200">
              Genres
            </span>
          </div>
          <hr class="border-white/7">
          <div class="flex flex-col gap-4 p-5">
            <template v-for="(g, index) in genreList" :key="index">
              <BaseCheckbox :id="g.name + g.id" v-model="genres" :value="g" :label="g.name" />
            </template>
          </div>
        </div>
        <div class="flex flex-1 flex-col justify-center gap-10">
          <div class="grid grid-cols-minmax-10rem flex-1 gap-6 lg:grid-cols-minmax-12rem">
            <ClientOnly>
              <MediaCard
                v-for="list in lists"
                :key="list.id"
                :item="list"
                :genre="getGenre(list.genre_ids[0])"
                :type="type"
              />
            </ClientOnly>
          </div>
          <button
            class="mx-auto rounded-full bg-[#ff0000] py-2"
            @click="handleLoadMore"
          >
            <span v-show="!loadingLoad" key="loadmore" class="block px-10">Load More</span>
            <span
              v-show="loadingLoad"
              key="loading"
              class="flex animate-pulse items-center justify-center px-2"
            >
              <span class="i-carbon:circle-dash ma inline-block animate-spin text-xl" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <ClientOnly>
    <VueBottomSheet ref="filterBottomSheet">
      <div>
        <div class="p-5 pt-0">
          <span class="text-base font-semibold text-neutral-200">
            Sort Result By
          </span>
        </div>
        <hr class="border-white/7">
        <div class="p-5">
          <BaseSelect v-model="sortBy" block placeholder="Choose Sort By" :options="sortByOptions" />
        </div>
        <hr class="border-white/7">
        <div class="px-5 py-3">
          <span class="text-base font-semibold text-neutral-200">
            Genres
          </span>
        </div>
        <hr class="border-white/7">
        <div class="flex flex-col gap-4 p-5">
          <template v-for="(g, index) in genreList" :key="index">
            <BaseCheckbox :id="g.name + g.id" v-model="genres" :value="g" :label="g.name" />
          </template>
        </div>
      </div>
    </VueBottomSheet>
  </ClientOnly>
</template>

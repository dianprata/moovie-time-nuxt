<script setup lang="ts">
import type { Component } from 'vue'
import IconCategories from '@/components/icon/Categories.vue'
import type { Media, PageResult } from '~/types'

interface MenuLists {
  name: string
  path: string
  icon?: Component
}

const loading = ref(false)
const search = ref<string>('')
const searchData = ref<PageResult<Media>>()
const error = ref()
const openSearch = ref<Boolean>(false)
const menuLists: MenuLists[] = [
  {
    name: 'Categories',
    path: '',
    icon: IconCategories,
  },
  {
    name: 'Movies',
    path: '/movie',
  },
  {
    name: 'Tv Shows',
    path: '/tv',
  },
  {
    name: 'Login',
    path: '/login',
  },
]

const openCategories = ref(false)

const categories = await getGenreList('movie')
const elCategories = ref()
onClickOutside(elCategories, () => openCategories.value = false)

function closeSearch() {
  search.value = ''
  openSearch.value = false
}

async function searching() {
  if (!search)
    return
  loading.value = true
  try {
    searchData.value = await getSearchKeyword(search.value)
  }
  catch (err: any) {
    error.value = err
  }
  finally {
    loading.value = false
  }
}

const throttledSearch = useDebounceFn(searching, 500)

watch(search, () => throttledSearch())

const { width } = useWindowSize()

watch(width, () => {
  if (width.value > 768 && openSearch.value)
    openSearch.value = false
})
</script>

<template>
  <div class="relative z-50 bg-white/5">
    <div class="container-wrapper h-16 max-h-16 flex items-center justify-between gap-4 p-4">
      <NuxtLink v-if="!openSearch" to="/">
        <Logo class="text-white" />
      </NuxtLink>
      <!--   Visible when window size more than 1024px   -->
      <div class="hidden flex-1 lg:flex">
        <BaseSearch
          v-model="search"
          block
          placeholder="Find movie"
          :data="searchData?.results || []"
          :loading="loading"
        >
          <template #icon-left>
            <IconMovie />
          </template>
          <template #icon-right>
            <IconSearch v-if="!search" />
            <span v-else class="i-carbon-close" @click="search = ''" />
          </template>
        </BaseSearch>
      </div>
      <div class="hidden items-center gap-10 text-sm font-semibold uppercase text-neutral-200 lg:flex">
        <template v-for="(menu, index) in menuLists" :key="index">
          <template v-if="!menu.path">
            <div ref="elCategories" class="relative">
              <div
                class="flex cursor-pointer items-center gap-3"
                @click="openCategories = !openCategories"
              >
                <component
                  :is="menu.icon"
                  class="transition-rotate transform transition duration-300"
                  :class="{ 'rotate-45': openCategories }"
                />
                <span>{{ menu.name }}</span>
              </div>
              <div
                v-show="openCategories"
                class="absolute mt-3 max-h-80 of-y-auto rounded-md bg-white py-1"
              >
                <div
                  v-for="category in categories"
                  :key="category.id"
                  class="cursor-pointer px-4 py-1 text-sm text-[#1E232B] hover:bg-black/50 hover:text-white"
                >
                  {{ category.name }}
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              :to="menu.path"
              class="flex items-center gap-3"
            >
              <component :is="menu.icon" />
              <span>{{ menu.name }}</span>
            </NuxtLink>
          </template>
        </template>
      </div>
      <!--   Visible when window size under 1024px   -->
      <div v-if="openSearch" class="block flex-1 lg:hidden">
        <BaseSearch
          v-model="search"
          block
          placeholder="Find movie"
          :data="searchData?.results"
          :loading="loading"
        >
          <template #icon-left>
            <IconMovie />
          </template>
          <template #icon-right>
            <IconSearch v-if="!search" />
            <span v-else class="i-carbon-close" @click="search = ''" />
          </template>
        </BaseSearch>
      </div>
      <div class="flex items-center gap-4 lg:hidden">
        <button v-if="!openSearch" @click="openSearch = !openSearch">
          <IconSearch class="h-6 w-6" />
        </button>
        <button v-else class="h-6 w-6">
          <span class="i-carbon-close block h-6 w-6" @click="closeSearch" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

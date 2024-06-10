<script setup lang="ts">
import { formatToDollar } from '~/composables/utils'
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()
const $img = useImage()
const mounted = useMounted()
</script>

<template>
  <div
    :key="item.id"
    class="bg-hero"
    :style="{ backgroundImage: `url(${$img(`/tmdb${item.backdrop_path}`)})` }"
  >
    <Transition appear name="fade-slow">
      <div v-show="mounted" class="h-full">
        <div class="absolute bottom-0 w-full bg-black/70 p-2 sm:p-5">
          <div class="container-wrapper lg:pl-[17rem]">
            <div class="flex flex-wrap items-center gap-y-2 lg:flex-nowrap lg:gap-0">
              <div class="flex items-center gap-2 sm:gap-4">
                <span class="i-ph-star-fill h-6 w-6 text-[#FFB802] lg:h-8 lg:w-8" />
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-semibold lg:text-4xl">{{ Math.floor(item.vote_average * 10) / 10 || 0 }}</span>
                  <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                    <span class="text-white/50">User Score</span>
                    <span class="text-white">{{ item.vote_count || 0 }} Votes</span>
                  </div>
                </div>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8" />
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Status</span>
                <span class="text-white">{{ item.status || '-' }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8" />
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Language</span>
                <span class="text-white">{{ formatLang(item.original_language) || '-' }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8" />
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Budget</span>
                <span class="text-white">{{ formatToDollar.format(item.budget || 0) }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8" />
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Production</span>
                <span class="text-white">{{ item.production_companies[0]?.name || '-' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-wrapper absolute bottom-32 left-1/2 w-full transform px-4 md:bottom-24 -translate-x-1/2 lg:-bottom-1/5">
          <div class="flex gap-8">
            <div class="hidden aspect-10/16 w-56 lg:block">
              <NuxtImg
                v-if="item.poster_path"
                width="400"
                height="600"
                format="webp"
                :src="`/tmdb${item.poster_path}`"
                :alt="item.title || item.name || ''"
                class="shadow-lg"
                h-full w-full object-cover
                :style="{ 'view-transition-name': `item-${item.id}` }"
              />
              <div v-else class="h-full w-full flex bg-black/50">
                <div class="i-ph:question ma text-4xl op60" />
              </div>
            </div>
            <div class="mt-4">
              <span class="text-lg font-medium">{{ item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) }}</span>
              <h1 class="line-clamp-2 my-1 text-2xl font-semibold lg:text-4xl">
                {{ item.title || item.name }}
              </h1>
              <span class="text-medium text-sm">
                {{ item.genres.map(i => i.name).join(', ') }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="container-wrapper absolute left-1/2 w-full transform px-4 -bottom-1/4 -translate-x-1/2 lg:pl-[17rem] sm:-bottom-1/5"
        >
          <span class="mb-1.5 inline-block text-sm text-[#FF0000] font-medium uppercase">Overview</span>
          <p class="line-clamp-3 text-sm text-black leading-relaxed lg:line-clamp-2 xl:line-clamp-3">
            {{ item.overview }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.bg-hero::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

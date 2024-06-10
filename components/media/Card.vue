<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: Media
  genre: string
}>()
</script>

<template>
  <div class="flex flex-col gap-1 sm:gap-3">
    <div class="relative aspect-10/16">
      <div class="absolute left-0 top-0 z-10 h-full w-full bg-black/80 op0 transition transition-opacity duration-300 hover:op100">
        <div class="h-full flex flex-col items-center justify-evenly">
          <div class="flex items-center gap-3">
            <span class="i-ph-star-fill h-7 w-7 text-[#FFB802]" />
            <span class="text-2xl font-semibold">{{ Math.floor(item.vote_average * 10) / 10 || 0 }}</span>
          </div>
          <div class="text-lg font-semibold">
            {{ genre }}
          </div>
          <NuxtLink
            :to="`/${item.media_type || type}/${item.id}`"
            class="rounded-full px-8 py-2 btn btn-primary"
          >
            View
          </NuxtLink>
        </div>
      </div>
      <div class="absolute right-0 top-0 z-1 bg-[#1E232B]/80 px-2.5 py-1.5">
        <span class="text-lg text-neutral-200 font-semibold">{{ Math.floor(item.vote_average * 10) / 10 || 0 }}</span>
      </div>
      <NuxtImg
        v-if="item.poster_path"
        width="400"
        height="600"
        format="webp"
        :src="`/tmdb${item.poster_path}`"
        :alt="item.title || item.name || ''"
        h-full w-full object-cover
        :style="{ 'view-transition-name': `item-${item.id}` }"
      />
      <div v-else class="h-full flex bg-white/10">
        <div class="i-ph:question ma text-4xl op10" />
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <span class="truncate text-sm font-semibold sm:text-base">{{ item.title || item.name }}</span>
      <span class="text-xs text-[#929292] sm:text-sm">{{ item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>

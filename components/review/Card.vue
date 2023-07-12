<script setup lang="ts">
import { formatDate } from '~/composables/utils'
import type { Review } from '~/types'

defineProps<{
  item: Review
}>()
</script>

<template>
  <div class="rounded-[14px] bg-[#f9f9f9] p-6 shadow-md">
    <div class="mb-8 flex items-center justify-between gap-2">
      <div class="flex items-center gap-4.5">
        <div class="h-12 w-12 rounded-full">
          <NuxtImg
            v-if="item.author_details.avatar_path"
            width="100"
            height="100"
            format="webp"
            :src="`/tmdb${item.author_details.avatar_path}`"
            :alt="item.author || item.author_details.name"
            class="shadow-lg"
            h-full w-full rounded-full object-cover
          />
          <div v-else class="h-12 w-12 flex items-center rounded-full bg-[#1E232B36]">
            <div class="i-ph:question ma text-xl text-black op60" />
          </div>
        </div>
        <div>
          <p class="text-sm font-semibold text-[#1E232A]">
            {{ item.author || item.author_details.name }}
          </p>
          <span class="text-xs text-[#666666]">{{ formatDate(item.created_at) }}</span>
        </div>
      </div>
      <div class="flex gap-1.5 rounded-lg bg-[#C4C4C447] py-1 pl-2 pr-3 text-black">
        <span class="i-ph-star-fill mt-1 h-4 w-4 text-[#FFB802]" />
        <span class="text-4xl font-semibold">{{ Number(item.author_details.rating).toFixed(1) || 0 }}</span>
      </div>
    </div>
    <div class="line-clamp-8 text-[13px] leading-relaxed font-italic text-black" v-html="item.content" />
  </div>
</template>

<style scoped>

</style>

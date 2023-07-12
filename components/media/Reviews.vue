<script setup lang="ts">
import type { Review } from '~/types'

defineProps<{
  reviews: Review[]
}>()
</script>

<template>
  <div class="bg-white">
    <div class="container-wrapper px-4 pb-16">
      <span class="mb-6 inline-block text-sm font-medium uppercase text-[#FF0000]">Reviews</span>
      <div class="grid grid-cols-minmax-20rem gap-4 lg:grid-cols-minmax-30rem lg:gap-8">
        <template v-if="reviews.length > 0">
          <ReviewCard v-for="review in reviews" :key="review.id" :item="review" />
        </template>
        <template v-else>
          <div class="text-black">
            Review not found.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

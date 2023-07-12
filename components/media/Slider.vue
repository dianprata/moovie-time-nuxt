<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  items: Media[]
}>()
const genreList = await getGenreList('movie')
function getGenre(genre_ids) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}
const mounted = useMounted()
const breakpointsSwiper = ref({
  '@0.00': {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  '@1.00': {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  '@1.50': {
    slidesPerView: 3,
    spaceBetween: 30,
  },
})
</script>

<template>
  <div class="relative pb-28 pt-10">
    <Transition appear name="fade">
      <div v-show="mounted">
        <Swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperEffectCreative]"
          :slides-per-view="3"
          :loop="true"
          :pagination="{
            enabled: true,
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 5,
          }"
          :autoplay="{
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            delay: 2500,
          }"
          :breakpoints="breakpointsSwiper"
          :grab-cursor="true"
          :space-between="34"
          :centered-slides="true"
          :creative-effect="{
            prev: {
              shadow: false,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }"
        >
          <SwiperSlide
            v-for="(slide, idx) in items"
            :key="idx"
          >
            <NuxtLink :to="`/movie/${slide.id}`">
              <div class="grid grid-cols-[max-content_1fr] items-center">
                <div class="aspect-10/16 max-w-56">
                  <NuxtImg
                    v-if="slide.poster_path"
                    width="400"
                    height="600"
                    format="webp"
                    :src="`/tmdb${slide.poster_path}`"
                    :alt="slide.title || slide.name || ''"
                    class="shadow-lg"
                    h-full w-full object-cover
                  />
                </div>
                <div class="h-[90%] w-full flex flex-col gap-1 bg-black p-6 text-white">
                  <div class="flex items-center gap-2">
                    <span class="i-ph-star-fill block h-4 w-4 text-[#FFB802]" />
                    <span class="text-lg font-semibold">{{ Math.floor(slide.vote_average * 10) / 10 || 0 }}</span>
                  </div>
                  <h1 class="line-clamp-2 text-2xl font-semibold">
                    {{ slide.title || slide.name }}
                  </h1>
                  <div class="flex items-center gap-1.5">
                    <span class="text-lg">{{ slide.release_date?.slice(0, 4) || slide.first_air_date?.slice(0, 4) }}</span>
                    <span class="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span class="text-lg">{{ getGenre(slide.genre_ids[0]) }}</span>
                  </div>
                  <div class="line-clamp-7 text-xs leading-5">
                    {{ slide.overview }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination max-w-[180px] !bottom-8" />
      </div>
    </Transition>
  </div>
</template>

<style>
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(255,255,255, .50);
}
.swiper-pagination-bullet-active {
  @apply bg-primary w-10 rounded-lg transition transition-width duration-500;
}
</style>

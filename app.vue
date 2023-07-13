<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: 'Moovie Time',
  titleTemplate: title => title !== 'Moovie Time' ? `${title} · Moovie Time` : title,
  meta: [
    { name: 'description', content: 'A TMDB client built with Nuxt Image to show the potential of it ✨' },
    { property: 'og:image', content: 'https://moovie-time-nuxt.vercel.app/social-card.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@dianprataaa' },
    { name: 'twitter:creator', content: '@dianprataaa' },
  ],
  link: [
    {
      rel: 'icon', type: 'image/webp', href: '/moovie-time.webp',
    },
  ],
})
</script>

<template>
  <NuxtLoadingIndicator />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

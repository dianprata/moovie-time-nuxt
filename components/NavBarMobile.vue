<script setup lang="ts">
</script>

<template>
  <div class="fixed bottom-0 z-100 block w-full bg-[#1E232B] lg:hidden">
    <div class="container-wrapper h-16 max-h-16 flex items-center justify-evenly gap-4 p-4">
      <NuxtLink v-slot="{ isActive }" to="/" title="Home">
        <div
          text-2xl
          :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
        />
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/movie" title="Movies">
        <div
          text-2xl
          :class="isActive ? 'i-ph-film-strip-fill text-primary' : 'i-ph-film-strip'"
        />
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/tv" title="TV Shows">
        <div
          text-2xl
          :class="isActive ? 'i-ph-television-simple-fill text-primary' : 'i-ph-television-simple'"
        />
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/login" title="Login">
        <div
          text-2xl
          :class="isActive ? 'i-ph-user-fill text-primary' : 'i-ph-user-bold'"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>

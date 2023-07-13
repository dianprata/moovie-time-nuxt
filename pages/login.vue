<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center px-4">
    <NuxtLink to="/" class="mb-4">
      <Logo class="h-20 w-40" />
    </NuxtLink>
    <div class="w-full rounded-lg bg-white/5 p-6 sm:max-w-md">
      <h1 class="mb-4 text-2xl font-bold">
        Login
      </h1>
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm">Email</label>
          <input
            id="email"
            type="email"
            class="border border-gray-300/50 rounded-lg p-2"
            placeholder="Input your email"
          >
        </div>
        <div class="flex flex-col gap-2">
          <label for="password" class="text-sm">Password</label>
          <input
            id="password"
            type="password"
            class="border border-gray-300/50 rounded-lg p-2"
            placeholder="Input your password"
          >
        </div>
        <button
          type="submit"
          class="mt-2 rounded-lg bg-primary py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>

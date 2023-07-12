<template>
  <div class="bg-black/29">
    <div class="container-wrapper relative mb-16 flex flex-col items-center justify-between gap-4 px-4 py-16 text-[#929292] md:mb-0 lg:flex-row">
      <span>© {{ new Date().getFullYear() }} MoovieTime. All rights reserved.</span>
      <LogoGrey
        class="w-full transform"
        lg="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      />
      <span>Made with <a href="https://nuxt.com/" class="hover:underline" target="_blank">Nuxt</a></span>
    </div>
  </div>
</template>

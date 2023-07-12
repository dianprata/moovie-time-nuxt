<script setup lang="ts">
import type { Media } from '~/types'

const props = defineProps<{
  modelValue: string
  block?: boolean
  data?: Media[]
  loading?: boolean
}>()

const emit = defineEmits(['update:model-value'])

function handleInput(event: Event) {
  emit('update:model-value', event.target?.value)
}

const el = ref()
const showSearch = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    showSearch.value = val.length > 0
  },
)

onClickOutside(el, () => showSearch.value = false)

function redirectToDetail(id: number) {
  const router = useRouter()
  router.push(`/movie/${id}`)
  showSearch.value = false
}

function handleFocus() {
  if (props.modelValue.length > 0)
    showSearch.value = true
}
</script>

<template>
  <div ref="el" class="relative" :class="{ 'w-full': block }">
    <div class="flex items-center gap-3 rounded bg-black/13 px-3 py-2">
      <slot name="icon-left" />
      <input
        type="text"
        class="base-input"
        :value="modelValue"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
      >
      <slot name="icon-right" />
    </div>
    <Transition name="fade">
      <div
        v-show="showSearch"
        class="absolute max-h-80 w-full flex flex-col of-y-auto rounded-b-lg bg-black/90 py-1.5"
      >
        <template v-if="!loading && data?.length > 0">
          <div
            v-for="d in data" :key="d.id"
            class="cursor-pointer px-4.5 py-1 text-sm hover:bg-white/50"
            @click="redirectToDetail(d.id)"
          >
            {{ d.title || d.name }}
          </div>
        </template>
        <template v-if="!loading && data?.length === 0">
          <div class="text-center">
            Data not found.
          </div>
        </template>
        <template v-else>
          <div v-if="loading" class="animate-pulse p4">
            <div class="i-carbon:circle-dash ma animate-spin text-4xl" />
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

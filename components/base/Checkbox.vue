<script setup lang="ts">
const props = defineProps<{
  modelValue: any[] | boolean
  value: boolean | object
  label: string
  id?: string
}>()
const emit = defineEmits(['update:model-value'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:model-value', value)
  },
})
</script>

<template>
  <div class="flex items-center justify-between text-sm">
    <label :for="id" class="flex-1 cursor-pointer">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :value="value"
      type="checkbox"
      class="accent-primary cursor-pointer"
    >
  </div>
</template>

<style scoped>

</style>

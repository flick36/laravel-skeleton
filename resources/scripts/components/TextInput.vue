<script setup lang="ts">
const { modelValue } = defineProps<{ modelValue: string }>()

defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const input = $ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input?.hasAttribute('autofocus'))
    input?.focus()
})

defineExpose({ focus: () => input?.focus() })
</script>

<template>
  <input
    ref="input"
    class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>

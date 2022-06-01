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
    class="rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 shadow-sm"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>

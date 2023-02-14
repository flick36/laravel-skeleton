<script setup lang="ts">
interface Props {
  checked: boolean | string[]
  value?: string
}

const {
  checked = false,
  value = '',
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:checked', checked: Props['checked']): void }>()

const proxyChecked = $computed({
  get: () => checked,
  set: newValue => emit('update:checked', newValue),
})
</script>

<template>
  <input
    v-model="proxyChecked"
    type="checkbox"
    :value="value"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
  >
</template>

<script setup lang="ts">
interface Props {
  checked: unknown[] | boolean
  value?: string
}

const { checked = false, value = '' } = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:checked', checked: unknown[] | boolean): void }>()

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
    class="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  >
</template>

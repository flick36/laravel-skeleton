<script setup lang="ts">
interface Props {
  checked: boolean
  value?: string
}

const {
  checked = false,
  value = '',
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'update:checked', checked: boolean): void }>()

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
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
  >
</template>

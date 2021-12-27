<template>
  <label class="block text-sm font-medium text-gray-700">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot></slot></span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value?: string
}>()
</script>

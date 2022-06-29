<script setup lang="ts">
interface Props { type?: 'button' | 'submit' | 'reset'}

const { type } = defineProps<Props>()
</script>

<template>
  <button :type="type" class="inline-flex items-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700 focus:border-gray-900 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-900 disabled:opacity-25">
    <slot />
  </button>
</template>

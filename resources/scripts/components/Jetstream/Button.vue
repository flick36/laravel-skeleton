<script setup lang="ts">
interface Props { type?: 'button' | 'submit' | 'reset'}

const { type = 'button' } = defineProps<Props>()
</script>

<template>
  <button :type="type" class="inline-flex items-center py-2 px-4 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-md border border-transparent focus:border-gray-900 focus:outline-none focus:ring focus:ring-gray-300 disabled:opacity-25 transition">
    <slot />
  </button>
</template>

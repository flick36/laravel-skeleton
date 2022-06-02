<script setup lang="ts">
interface Props { type?: 'button' | 'submit' | 'reset'}

const { type } = defineProps<Props>()
</script>

<template>
  <button :type="type" class="inline-flex items-center py-2 px-4 text-xs font-semibold tracking-widest text-gray-700 hover:text-gray-500 active:text-gray-800 uppercase bg-white active:bg-gray-50 rounded-md border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 shadow-sm disabled:opacity-25 transition">
    <slot />
  </button>
</template>

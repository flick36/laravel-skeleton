<script setup lang="ts">
interface Props { type?: 'button' | 'submit' | 'reset'}

const { type = 'button' } = defineProps<Props>()
</script>

<template>
  <button :type="type" class="inline-flex justify-center items-center py-2 px-4 text-xs font-semibold tracking-widest text-white uppercase bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-md border border-transparent focus:border-red-700 focus:outline-none focus:ring focus:ring-red-200 disabled:opacity-25 transition">
    <slot />
  </button>
</template>

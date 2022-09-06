<script setup lang="ts">
interface Props { type?: 'button' | 'submit' | 'reset'}

const { type = 'button' } = defineProps<Props>()
</script>

<template>
  <button :type="type" class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-red-500 focus:border-red-700 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25">
    <slot />
  </button>
</template>

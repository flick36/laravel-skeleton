<script setup lang="ts">
const { on } = defineProps<{ on: boolean }>()
</script>

<template>
  <div>
    <transition leave-active-class="transition duration-1000 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-show="on" class="text-sm text-gray-600 dark:text-gray-400">
        <slot />
      </div>
    </transition>
  </div>
</template>

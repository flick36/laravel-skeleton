<script setup lang="ts">
const errors = $computed(() => usePage().props.value.errors)
const hasErrors = $computed(() => Object.keys(errors).length > 0)
</script>

<template>
  <div v-if="hasErrors">
    <div class="font-medium text-red-600">
      Whoops! Something went wrong.
    </div>

    <ul class="mt-3 text-sm text-red-600 list-disc list-inside">
      <li v-for="(error, key) in errors" :key="key">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

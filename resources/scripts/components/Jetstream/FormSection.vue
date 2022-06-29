<script setup lang="ts">
defineEmits<{ (e: 'submitted'): void }>()
const hasActions = $computed(() => !!useSlots().actions)
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <JetSectionTitle>
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </JetSectionTitle>

    <div class="mt-5 md:col-span-2 md:mt-0">
      <form @submit.prevent="$emit('submitted')">
        <div
          class="bg-white py-5 px-4 shadow sm:p-6"
          :class="hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'"
        >
          <div class="grid grid-cols-6 gap-6">
            <slot name="form" />
          </div>
        </div>

        <div v-if="hasActions" class="flex items-center justify-end bg-gray-50 py-3 px-4 text-right shadow sm:rounded-b-md sm:px-6">
          <slot name="actions" />
        </div>
      </form>
    </div>
  </div>
</template>

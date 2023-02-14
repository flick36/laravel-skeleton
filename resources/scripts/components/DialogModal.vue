<script setup lang="ts">
interface Props {
  show: boolean
  maxWidth?: string
  closeable?: boolean
}

const {
  show = false,
  maxWidth = '2xl',
  closeable = true,
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'close'): void }>()

const close = () => emit('close')
</script>

<template>
  <Modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
  >
    <div class="py-4 px-6">
      <div class="text-lg font-medium text-gray-900 dark:text-gray-100">
        <slot name="title" />
      </div>

      <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <slot name="content" />
      </div>
    </div>

    <div class="flex flex-row justify-end bg-gray-100 py-4 px-6 text-right dark:bg-gray-800">
      <slot name="footer" />
    </div>
  </Modal>
</template>

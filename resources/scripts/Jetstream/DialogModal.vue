<script setup lang="ts">
import Modal from './Modal.vue'

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
    <div class="px-6 py-4">
      <div class="text-lg">
        <slot name="title" />
      </div>

      <div class="mt-4">
        <slot name="content" />
      </div>
    </div>

    <div class="flex flex-row justify-end px-6 py-4 text-right bg-gray-100">
      <slot name="footer" />
    </div>
  </Modal>
</template>

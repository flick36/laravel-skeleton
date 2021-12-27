<template>
  <modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
    <div class="px-6 py-4">
      <div class="text-lg">
        <slot name="title"> </slot>
      </div>

      <div class="mt-4">
        <slot name="content"> </slot>
      </div>
    </div>

    <div class="flex flex-row justify-end px-6 py-4 text-right bg-gray-100">
      <slot name="footer"> </slot>
    </div>
  </modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'

interface Props {
  show: boolean
  maxWidth?: string
  closeable?: boolean
}

withDefaults(defineProps<Props>(), {
  show: false,
  maxWidth: '2xl',
  closeable: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')
</script>

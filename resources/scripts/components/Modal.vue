<script setup lang="ts">
interface Props {
  show: boolean
  maxWidth: string
  closeable: boolean
}

const {
  show = false,
  maxWidth = '2xl',
  closeable = true,
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'close'): void }>()

watch(() => show, () => {
  if (show)
    document.body.style.overflow = 'hidden'
  else
    document.body.style.overflow = ''
},
)

const close = () => {
  if (closeable)
    emit('close')
}

const closeOnEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && show)
    close()
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = ''
})

const maxWidthClass = $computed(() => {
  return {
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth]
})
</script>

<template>
  <teleport to="body">
    <transition leave-active-class="duration-200">
      <div v-show="show" class="fixed inset-0 z-50 overflow-y-auto py-6 px-4 sm:px-0" scroll-region>
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="show" class="fixed inset-0 transition-all" @click="close">
            <div class="absolute inset-0 bg-gray-500/75 dark:bg-gray-900" />
          </div>
        </transition>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        >
          <div v-show="show" class="relative mb-6 overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-gray-800 sm:mx-auto sm:w-full" :class="maxWidthClass">
            <slot v-if="show" />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

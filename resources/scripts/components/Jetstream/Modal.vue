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
      <div v-show="show" class="overflow-y-auto fixed inset-0 z-50 py-6 px-4 sm:px-0" scroll-region>
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="show" class="fixed inset-0 transition-all" @click="close">
            <div class="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
        </transition>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-show="show" class="overflow-hidden mb-6 bg-white rounded-lg shadow-xl transition-all sm:mx-auto sm:w-full" :class="maxWidthClass">
            <slot v-if="show" />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

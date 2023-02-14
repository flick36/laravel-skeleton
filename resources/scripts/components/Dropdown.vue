<script setup lang="ts">
interface Props {
  align: string
  width: string
  contentClasses?: string[]
}

const {
  align = 'right',
  width = '48',
  contentClasses = ['py-1', 'bg-white', 'dark:bg-gray-700'],
} = defineProps<Props>()

let open = $ref(false)

const closeOnEscape = (e: KeyboardEvent) => {
  if (open && e.key === 'Escape')
    open = false
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))

const widthClass = $computed(() => {
  return { 48: 'w-48' }[width.toString()]
})

const alignmentClasses = $computed(() => {
  if (align === 'left')
    return 'origin-top-left left-0'

  if (align === 'right')
    return 'origin-top-right right-0'

  return 'origin-top'
})
</script>

<template>
  <div class="relative">
    <div @click="open = !open">
      <slot name="trigger" />
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <div v-show="open" class="fixed inset-0 z-40" @click="open = false" />

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="scale-95 transform opacity-0"
      enter-to-class="scale-100 transform opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="scale-100 transform opacity-100"
      leave-to-class="scale-95 transform opacity-0"
    >
      <div
        v-show="open"
        class="absolute z-50 mt-2 rounded-md shadow-lg"
        :class="[widthClass, alignmentClasses]"
        style="display: none;"
        @click="open = false"
      >
        <div class="rounded-md ring-1 ring-black/5" :class="contentClasses">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

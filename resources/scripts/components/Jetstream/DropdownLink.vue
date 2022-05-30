<script setup lang="ts">
interface Props {
  href?: string
  as?: string
}

const {
  href = '',
  as = '',
} = defineProps<Props>()
</script>

<template>
  <div>
    <button v-if="as === 'button'" type="submit" class="block py-2 px-4 w-full text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition">
      <slot />
    </button>

    <a v-else-if="as === 'a'" :href="href" class="block py-2 px-4 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition">
      <slot />
    </a>

    <Link v-else :href="href" class="block py-2 px-4 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition">
      <slot />
    </Link>
  </div>
</template>

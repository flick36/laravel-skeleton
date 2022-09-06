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
    <button v-if="as === 'button'" type="submit" class="block w-full py-2 px-4 text-left text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
      <slot />
    </button>

    <a v-else-if="as === 'a'" :href="href" class="block py-2 px-4 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
      <slot />
    </a>

    <Link v-else :href="href" class="block py-2 px-4 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
      <slot />
    </Link>
  </div>
</template>

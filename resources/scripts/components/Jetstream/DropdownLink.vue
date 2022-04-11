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
    <button v-if="as == 'button'" type="submit" class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
      <slot />
    </button>

    <a v-else-if="as =='a'" :href="href" class="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
      <slot />
    </a>

    <Link v-else :href="href" class="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
      <slot />
    </Link>
  </div>
</template>

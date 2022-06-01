<script setup lang="ts">
const { terms } = defineProps<{ terms: string }>()
</script>

<template>
  <Head title="Terms of Service" />

  <div class="font-sans antialiased text-gray-900">
    <div class="pt-4 bg-gray-100">
      <div class="flex flex-col items-center pt-6 min-h-screen sm:pt-0">
        <div>
          <JetAuthenticationCardLogo />
        </div>

        <div class="overflow-hidden p-6 mt-6 w-full bg-white shadow-md prose  sm:max-w-2xl sm:rounded-lg" v-html="terms" />
      </div>
    </div>
  </div>
</template>

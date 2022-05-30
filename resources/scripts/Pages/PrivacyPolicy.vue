<script setup lang="ts">
defineProps<{ policy: string }>()
</script>

<template>
  <Head title="Privacy Policy" />

  <div class="font-sans antialiased text-gray-900">
    <div class="pt-4 bg-gray-100">
      <div class="flex flex-col items-center pt-6 min-h-screen sm:pt-0">
        <div>
          <JetAuthenticationCardLogo />
        </div>

        <div class="overflow-hidden p-6 mt-6 w-full bg-white shadow-md prose sm:max-w-2xl sm:rounded-lg" v-html="policy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm.vue'
</script>

<template>
  <AppLayout title="Create Team">
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Create Team
      </h2>
    </template>

    <div>
      <div class="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <CreateTeamForm />
      </div>
    </div>
  </AppLayout>
</template>

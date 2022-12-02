<script setup lang="ts">
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import type { ApiToken, CRUDPermissions } from '@/types/general'

interface Props {
  tokens: ApiToken[]
  availablePermissions: CRUDPermissions
  defaultPermissions: CRUDPermissions
}

const {
  tokens,
  availablePermissions,
  defaultPermissions,
} = defineProps<Props>()
</script>

<template>
  <AppLayout title="API Tokens">
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        API Tokens
      </h2>
    </template>

    <div>
      <div class="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <ApiTokenManager
          :tokens="tokens"
          :available-permissions="availablePermissions"
          :default-permissions="defaultPermissions"
        />
      </div>
    </div>
  </AppLayout>
</template>

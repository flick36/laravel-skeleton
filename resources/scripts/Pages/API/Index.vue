<template>
  <app-layout title="API Tokens">
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">API Tokens</h2>
    </template>

    <div>
      <div class="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <api-token-manager
          :tokens="tokens"
          :available-permissions="availablePermissions"
          :default-permissions="defaultPermissions"
        />
      </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/scripts/Layouts/AppLayout.vue'
import { Permissions, Token } from '@/scripts/models'
import ApiTokenManager from '@/scripts/Pages/API/Partials/ApiTokenManager.vue'

defineProps<{
  tokens: Token[]
  availablePermissions: Permissions
  defaultPermissions: Permissions
}>()
</script>

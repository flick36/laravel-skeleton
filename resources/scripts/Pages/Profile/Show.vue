<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import DeleteUserForm from '@/pages/profile/partials/DeleteUserForm.vue'
import LogoutOtherBrowserSessionsForm from '@/pages/profile/partials/LogoutOtherBrowserSessionsForm.vue'
import TwoFactorAuthenticationForm from '@/pages/profile/partials/TwoFactorAuthenticationForm.vue'
import UpdatePasswordForm from '@/pages/profile/partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from '@/pages/profile/partials/UpdateProfileInformationForm.vue'
import type { UserSession } from '@/types'

defineProps<{
  confirmsTwoFactorAuthentication: boolean
  sessions: UserSession[]
}>()
</script>

<template>
  <AppLayout title="Profile">
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Profile
      </h2>
    </template>

    <div>
      <div class="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div v-if="$page.props.jetstream.canUpdateProfileInformation && $page.props.user">
          <UpdateProfileInformationForm :user="$page.props.user" />

          <JetSectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canUpdatePassword">
          <UpdatePasswordForm class="mt-10 sm:mt-0" />

          <JetSectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
          <TwoFactorAuthenticationForm
            :requires-confirmation="confirmsTwoFactorAuthentication"
            class="mt-10 sm:mt-0"
          />

          <JetSectionBorder />
        </div>

        <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0" />

        <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
          <JetSectionBorder />

          <DeleteUserForm class="mt-10 sm:mt-0" />
        </template>
      </div>
    </div>
  </AppLayout>
</template>

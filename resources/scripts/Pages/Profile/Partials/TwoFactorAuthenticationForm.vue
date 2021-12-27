<template>
  <jet-action-section>
    <template #title> Two Factor Authentication </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template #content>
      <h3 v-if="twoFactorEnabled" class="text-lg font-medium text-gray-900">
        You have enabled two factor authentication.
      </h3>

      <h3 v-else class="text-lg font-medium text-gray-900">
        You have not enabled two factor authentication.
      </h3>

      <div class="max-w-xl mt-3 text-sm text-gray-600">
        <p>
          When two factor authentication is enabled, you will be prompted for a secure, random token
          during authentication. You may retrieve this token from your phone's Google Authenticator
          application.
        </p>
      </div>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <div class="max-w-xl mt-4 text-sm text-gray-600">
            <p class="font-semibold">
              Two factor authentication is now enabled. Scan the following QR code using your
              phone's authenticator application.
            </p>
          </div>

          <div class="mt-4" v-html="qrCode"></div>
        </div>

        <div v-if="recoveryCodes.length > 0">
          <div class="max-w-xl mt-4 text-sm text-gray-600">
            <p class="font-semibold">
              Store these recovery codes in a secure password manager. They can be used to recover
              access to your account if your two factor authentication device is lost.
            </p>
          </div>

          <div class="grid max-w-xl gap-1 px-4 py-4 mt-4 font-mono text-sm bg-gray-100 rounded-lg">
            <div v-for="code in recoveryCodes" :key="code">
              {{ code }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div v-if="!twoFactorEnabled">
          <jet-confirms-password @confirmed="enableTwoFactorAuthentication">
            <jet-button type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
              Enable
            </jet-button>
          </jet-confirms-password>
        </div>

        <div v-else>
          <jet-confirms-password @confirmed="regenerateRecoveryCodes">
            <jet-secondary-button v-if="recoveryCodes.length > 0" class="mr-3">
              Regenerate Recovery Codes
            </jet-secondary-button>
          </jet-confirms-password>

          <jet-confirms-password @confirmed="showRecoveryCodes">
            <jet-secondary-button v-if="recoveryCodes.length === 0" class="mr-3">
              Show Recovery Codes
            </jet-secondary-button>
          </jet-confirms-password>

          <jet-confirms-password @confirmed="disableTwoFactorAuthentication">
            <jet-danger-button :class="{ 'opacity-25': disabling }" :disabled="disabling">
              Disable
            </jet-danger-button>
          </jet-confirms-password>
        </div>
      </div>
    </template>
  </jet-action-section>
</template>

<script setup lang="ts">
import JetActionSection from '@/scripts/Jetstream/ActionSection.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import JetConfirmsPassword from '@/scripts/Jetstream/ConfirmsPassword.vue'
import JetDangerButton from '@/scripts/Jetstream/DangerButton.vue'
import JetSecondaryButton from '@/scripts/Jetstream/SecondaryButton.vue'
import axios from '@/scripts/plugins/axios'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'
import { computed, ref } from 'vue'

const qrCode = ref('')
const enabling = ref(false)
const disabling = ref(false)
const recoveryCodes = ref([''])

const enableTwoFactorAuthentication = () => {
  enabling.value = true

  Inertia.post(
    '/user/two-factor-authentication',
    {},
    {
      preserveScroll: true,
      onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
      onFinish: () => (enabling.value = false),
    }
  )
}

const showQrCode = () => {
  return axios
    .get('/user/two-factor-qr-code')
    .then((response) => (qrCode.value = response.data.svg))
}

const showRecoveryCodes = () => {
  return axios
    .get('/user/two-factor-recovery-codes')
    .then((response) => (recoveryCodes.value = response.data))
}

const regenerateRecoveryCodes = () => {
  axios.post('/user/two-factor-recovery-codes').then(() => showRecoveryCodes())
}

const disableTwoFactorAuthentication = () => {
  disabling.value = true

  Inertia.delete('/user/two-factor-authentication', {
    preserveScroll: true,
    onSuccess: () => (disabling.value = false),
  })
}

const twoFactorEnabled = computed(
  () => !enabling.value && usePage().props.value.user?.two_factor_enabled
)
</script>

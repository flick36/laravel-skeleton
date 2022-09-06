<script setup lang="ts">
import axios from '@/modules/axios'

const { requiresConfirmation } = defineProps<{ requiresConfirmation: boolean }>()

let enabling = $ref(false)
let confirming = $ref(false)
let disabling = $ref(false)
let qrCode = $ref('')
let setupKey = $ref('')
let recoveryCodes = $ref([])

const confirmationForm = useForm({ code: '' })

const twoFactorEnabled = $computed(() => !enabling && usePage().props.value.user?.two_factor_enabled)

watch($$(twoFactorEnabled), () => {
  if (!twoFactorEnabled) {
    confirmationForm.reset()
    confirmationForm.clearErrors()
  }
})

const showQrCode = () => axios.get('/user/two-factor-qr-code').then(response => (qrCode = response.data.svg))

const showSetupKey = () => axios.get('/user/two-factor-secret-key').then(response => (setupKey = response.data.secretKey))

const showRecoveryCodes = () => axios.get('/user/two-factor-recovery-codes').then(response => (recoveryCodes = response.data))

const regenerateRecoveryCodes = () => axios.post('/user/two-factor-recovery-codes').then(() => showRecoveryCodes())

const enableTwoFactorAuthentication = () => {
  enabling = true

  Inertia.post('/user/two-factor-authentication', {}, {
    preserveScroll: true,
    onSuccess: () => Promise.all([
      showQrCode(),
      showSetupKey(),
      showRecoveryCodes(),
    ]),
    onFinish: () => {
      enabling = false
      confirming = requiresConfirmation
    },
  })
}

const confirmTwoFactorAuthentication = () => {
  confirmationForm.post('/user/confirmed-two-factor-authentication', {
    errorBag: 'confirmTwoFactorAuthentication',
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      confirming = false
      qrCode = ''
      setupKey = ''
    },
  })
}

const disableTwoFactorAuthentication = () => {
  disabling = true

  Inertia.delete('/user/two-factor-authentication', {
    preserveScroll: true,
    onSuccess: () => {
      disabling = false
      confirming = false
    },
  })
}
</script>

<template>
  <ActionSection>
    <template #title>
      Two Factor Authentication
    </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template #content>
      <h3
        v-if="twoFactorEnabled && !confirming"
        class="text-lg font-medium text-gray-900"
      >
        You have enabled two factor authentication.
      </h3>

      <h3
        v-else-if="twoFactorEnabled && confirming"
        class="text-lg font-medium text-gray-900"
      >
        Finish enabling two factor authentication.
      </h3>

      <h3
        v-else
        class="text-lg font-medium text-gray-900"
      >
        You have not enabled two factor authentication.
      </h3>

      <div class="mt-3 max-w-xl text-sm text-gray-600">
        <p>When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.</p>
      </div>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p
              v-if="confirming"
              class="font-semibold"
            >
              To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code.
            </p>

            <p
              v-else
            >
              Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key.
            </p>
          </div>

          <div class="mt-4" v-html="qrCode" />

          <div v-if="setupKey" class="mt-4 max-w-xl text-sm text-gray-600">
            <p class="font-semibold">
              Setup Key:
              <span v-html="setupKey" />
            </p>
          </div>

          <div v-if="confirming" class="mt-4">
            <InputLabel for="code" value="Code" />

            <TextInput
              id="code"
              v-model="confirmationForm.code"
              type="text"
              name="code"
              class="mt-1 block w-1/2"
              inputmode="numeric"
              autofocus
              autocomplete="one-time-code"
              @keyup.enter="confirmTwoFactorAuthentication"
            />

            <InputError :message="confirmationForm.errors.code" class="mt-2" />
          </div>
        </div>

        <div v-if="recoveryCodes.length > 0 && !confirming">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p
              class="font-semibold"
            >
              Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
            </p>
          </div>

          <div class="mt-4 grid max-w-xl gap-1 rounded-lg bg-gray-100 p-4 font-mono text-sm">
            <div v-for="code in recoveryCodes" :key="code">
              {{ code }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div v-if="!twoFactorEnabled">
          <ConfirmsPassword @confirmed="enableTwoFactorAuthentication">
            <PrimaryButton type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
              Enable
            </PrimaryButton>
          </ConfirmsPassword>
        </div>

        <div v-else>
          <ConfirmsPassword @confirmed="confirmTwoFactorAuthentication">
            <PrimaryButton
              v-if="confirming"
              type="button"
              class="mr-3"
              :class="{ 'opacity-25': enabling }"
              :disabled="enabling"
            >
              Confirm
            </PrimaryButton>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="regenerateRecoveryCodes">
            <SecondaryButton
              v-if="recoveryCodes.length > 0 && !confirming"
              class="mr-3"
            >
              Regenerate Recovery Codes
            </SecondaryButton>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="showRecoveryCodes">
            <SecondaryButton
              v-if="recoveryCodes.length === 0 && !confirming"
              class="mr-3"
            >
              Show Recovery Codes
            </SecondaryButton>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
            <SecondaryButton
              v-if="confirming"
              :class="{ 'opacity-25': disabling }"
              :disabled="disabling"
            >
              Cancel
            </SecondaryButton>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
            <DangerButton
              v-if="!confirming"
              :class="{ 'opacity-25': disabling }"
              :disabled="disabling"
            >
              Disable
            </DangerButton>
          </ConfirmsPassword>
        </div>
      </div>
    </template>
  </ActionSection>
</template>

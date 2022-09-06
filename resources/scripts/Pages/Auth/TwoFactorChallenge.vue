<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'

let recovery = $ref(false)
const codeInput = $ref<InstanceType<typeof TextInput> | null>(null)
const recoveryCodeInput = $ref<InstanceType<typeof TextInput> | null>(null)

const form = useForm({
  code: '',
  recovery_code: '',
})

const toggleRecovery = async () => {
  recovery = !recovery

  await nextTick()

  if (recovery) {
    recoveryCodeInput?.focus()
    form.code = ''
  }
  else {
    codeInput?.focus()
    form.recovery_code = ''
  }
}

const submit = () => form.post('/two-factor-challenge')
</script>

<template>
  <Head title="Two-factor Confirmation" />

  <AuthenticationCard>
    <template #logo>
      <AuthenticationCardLogo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      <template v-if="!recovery">
        Please confirm access to your account by entering the authentication code provided by your authenticator application.
      </template>

      <template v-else>
        Please confirm access to your account by entering one of your emergency recovery codes.
      </template>
    </div>

    <form @submit.prevent="submit">
      <div v-if="!recovery">
        <InputLabel for="code" value="Code" />
        <TextInput
          id="code"
          ref="codeInput"
          v-model="form.code"
          type="text"
          inputmode="numeric"
          class="mt-1 block w-full"
          autofocus
          autocomplete="one-time-code"
        />
        <InputError class="mt-2" :message="form.errors.code" />
      </div>

      <div v-else>
        <InputLabel for="recovery_code" value="Recovery Code" />
        <TextInput
          id="recovery_code"
          ref="recoveryCodeInput"
          v-model="form.recovery_code"
          type="text"
          class="mt-1 block w-full"
          autocomplete="one-time-code"
        />
        <InputError class="mt-2" :message="form.errors.recovery_code" />
      </div>

      <div class="mt-4 flex items-center justify-end">
        <button type="button" class="cursor-pointer text-sm text-gray-600 underline hover:text-gray-900" @click.prevent="toggleRecovery">
          <template v-if="!recovery">
            Use a recovery code
          </template>

          <template v-else>
            Use an authentication code
          </template>
        </button>

        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Log in
        </PrimaryButton>
      </div>
    </form>
  </AuthenticationCard>
</template>

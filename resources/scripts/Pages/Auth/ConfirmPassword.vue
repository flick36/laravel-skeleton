<script setup lang="ts">
import JetInput from '@/components/Jetstream/Input.vue'

const form = useForm({ password: '' })

const passwordInput = $ref<InstanceType<typeof JetInput> | null>(null)

const submit = () =>
  form.post('/user/confirm-password', {
    onFinish: () => {
      form.reset()

      passwordInput?.focus()
    },
  })
</script>

<template>
  <Head title="Secure Area" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <form @submit.prevent="submit">
      <div>
        <JetLabel for="password" value="Password" />
        <JetInput
          id="password"
          ref="passwordInput"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
          autofocus
        />
        <JetInputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4 flex justify-end">
        <JetButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Confirm
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

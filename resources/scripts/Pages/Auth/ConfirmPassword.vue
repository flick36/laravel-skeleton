<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'

const form = useForm({ password: '' })

const passwordInput = $ref<InstanceType<typeof TextInput> | null>(null)

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

  <AuthenticationCard>
    <template #logo>
      <AuthenticationCardLogo />
    </template>

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="password" value="Password" />
        <TextInput
          id="password"
          ref="passwordInput"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
          autofocus
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4 flex justify-end">
        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Confirm
        </PrimaryButton>
      </div>
    </form>
  </AuthenticationCard>
</template>

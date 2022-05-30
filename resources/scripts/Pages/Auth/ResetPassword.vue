<script setup lang="ts">
const { email, token } = defineProps<{
  email: string
  token: string
}>()

const form = useForm({
  token,
  email,
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.post('/reset-password', {
    onFinish: () => form.reset('password', 'password_confirmation'),
  })
}
</script>

<template>
  <Head title="Reset Password" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <JetValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <JetLabel for="email" value="Email" />
        <JetInput
          id="email"
          v-model="form.email"
          type="email"
          class="block mt-1 w-full"
          required
          autofocus
        />
      </div>

      <div class="mt-4">
        <JetLabel for="password" value="Password" />
        <JetInput
          id="password"
          v-model="form.password"
          type="password"
          class="block mt-1 w-full"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <JetLabel for="password_confirmation" value="Confirm Password" />
        <JetInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="block mt-1 w-full"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex justify-end items-center mt-4">
        <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Reset Password
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

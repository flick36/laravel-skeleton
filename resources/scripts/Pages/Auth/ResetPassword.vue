<template>
  <Head title="Reset Password" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          v-model="form.email"
          type="email"
          class="block w-full mt-1"
          required
          autofocus
        />
      </div>

      <div class="mt-4">
        <jet-label for="password" value="Password" />
        <jet-input
          id="password"
          v-model="form.password"
          type="password"
          class="block w-full mt-1"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <jet-label for="password_confirmation" value="Confirm Password" />
        <jet-input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="block w-full mt-1"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Reset Password
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script setup lang="ts">
import JetAuthenticationCard from '@/scripts/Jetstream/AuthenticationCard.vue'
import JetAuthenticationCardLogo from '@/scripts/Jetstream/AuthenticationCardLogo.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import JetInput from '@/scripts/Jetstream/Input.vue'
import JetLabel from '@/scripts/Jetstream/Label.vue'
import JetValidationErrors from '@/scripts/Jetstream/ValidationErrors.vue'
import { Head, useForm } from '@inertiajs/inertia-vue3'

const props = defineProps<{
  email: string
  token: string
}>()

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.post('/reset-password', {
    onFinish: () => form.reset('password', 'password_confirmation'),
  })
}
</script>

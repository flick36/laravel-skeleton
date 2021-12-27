<template>
  <Head title="Secure Area" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="password" value="Password" />
        <jet-input
          id="password"
          v-model="form.password"
          type="password"
          class="block w-full mt-1"
          required
          autocomplete="current-password"
          autofocus
        />
      </div>

      <div class="flex justify-end mt-4">
        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Confirm
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

const form = useForm({
  password: '',
})

const submit = () =>
  form.post('/user/confirm-password', {
    onFinish: () => form.reset(),
  })
</script>

<template>
  <Head title="Forgot Password" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and we will email you a
      password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
      {{ status }}
    </div>

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

      <div class="flex items-center justify-end mt-4">
        <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Email Password Reset Link
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

defineProps<{
  status?: string
}>()

const form = useForm({
  email: '',
})

const submit = () => form.post('/forgot-password')
</script>

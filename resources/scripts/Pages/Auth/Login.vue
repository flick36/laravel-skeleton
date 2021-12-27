<template>
  <Head title="Log in" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
      {{ status }}
    </div>

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
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <jet-checkbox v-model:checked="form.remember" name="remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          v-if="canResetPassword"
          href="/forgot-password"
          class="text-sm text-gray-600 underline hover:text-gray-900"
        >
          Forgot your password?
        </Link>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script setup lang="ts">
import JetAuthenticationCard from '@/scripts/Jetstream/AuthenticationCard.vue'
import JetAuthenticationCardLogo from '@/scripts/Jetstream/AuthenticationCardLogo.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import JetCheckbox from '@/scripts/Jetstream/Checkbox.vue'
import JetInput from '@/scripts/Jetstream/Input.vue'
import JetLabel from '@/scripts/Jetstream/Label.vue'
import JetValidationErrors from '@/scripts/Jetstream/ValidationErrors.vue'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3'

defineProps<{
  canResetPassword: boolean
  status?: string
}>()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () =>
  form
    .transform((data) => ({ ...data, remember: form.remember ? 'on' : '' }))
    .post('/login', {
      onFinish: () => form.reset('password'),
    })
</script>

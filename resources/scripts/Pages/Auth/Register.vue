<template>
  <Head title="Register" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="name" value="Name" />
        <jet-input
          id="name"
          v-model="form.name"
          type="text"
          class="block w-full mt-1"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div class="mt-4">
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          v-model="form.email"
          type="email"
          class="block w-full mt-1"
          required
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

      <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
        <jet-label for="terms">
          <div class="flex items-center">
            <jet-checkbox id="terms" v-model:checked="form.terms" name="terms" />

            <div class="ml-2">
              I agree to the
              <a
                target="_blank"
                href="/terms-of-service"
                class="text-sm text-gray-600 underline hover:text-gray-900"
                >Terms of Service</a
              >
              and
              <a
                target="_blank"
                href="/privacy-policy"
                class="text-sm text-gray-600 underline hover:text-gray-900"
                >Privacy Policy</a
              >
            </div>
          </div>
        </jet-label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link href="/login" class="text-sm text-gray-600 underline hover:text-gray-900">
          Already registered?
        </Link>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
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

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
})

const submit = () => {
  form.post('/register', {
    onFinish: () => form.reset('password', 'password_confirmation'),
  })
}
</script>

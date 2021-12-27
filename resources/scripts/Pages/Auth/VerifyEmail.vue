<template>
  <Head title="Email Verification" />

  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email address by clicking
      on the link we just emailed to you? If you didn't receive the email, we will gladly send you
      another.
    </div>

    <div v-if="verificationLinkSent" class="mb-4 text-sm font-medium text-green-600">
      A new verification link has been sent to the email address you provided during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="flex items-center justify-between mt-4">
        <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Resend Verification Email
        </jet-button>

        <Link
          href="/logout"
          method="post"
          as="button"
          class="text-sm text-gray-600 underline hover:text-gray-900"
          >Log Out</Link
        >
      </div>
    </form>
  </jet-authentication-card>
</template>

<script setup lang="ts">
import JetAuthenticationCard from '@/scripts/Jetstream/AuthenticationCard.vue'
import JetAuthenticationCardLogo from '@/scripts/Jetstream/AuthenticationCardLogo.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import { Head, Link, useForm } from '@inertiajs/inertia-vue3'
import { computed } from 'vue'

const props = defineProps<{
  status: string
}>()

const form = useForm({})

const submit = () => form.post('/verification.send')

const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>

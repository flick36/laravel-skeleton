<script setup lang="ts">
defineProps<{ status?: string }>()

const form = useForm({ email: '' })

const submit = () => form.post('/forgot-password')
</script>

<template>
  <Head title="Forgot Password" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
      {{ status }}
    </div>

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

      <div class="flex justify-end items-center mt-4">
        <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Email Password Reset Link
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

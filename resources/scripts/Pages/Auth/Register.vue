<script setup lang="ts">
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

<template>
  <Head title="Register" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <JetValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <JetLabel for="name" value="Name" />
        <JetInput
          id="name"
          v-model="form.name"
          type="text"
          class="block mt-1 w-full"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div class="mt-4">
        <JetLabel for="email" value="Email" />
        <JetInput
          id="email"
          v-model="form.email"
          type="email"
          class="block mt-1 w-full"
          required
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

      <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
        <JetLabel for="terms">
          <div class="flex items-center">
            <JetCheckbox id="terms" v-model:checked="form.terms" name="terms" />

            <div class="ml-2">
              I agree to the <a target="_blank" href="/terms-of-service" class="text-sm text-gray-600 hover:text-gray-900 underline">Terms of Service</a> and <a target="_blank" href="/privacy-policy" class="text-sm text-gray-600 hover:text-gray-900 underline">Privacy Policy</a>
            </div>
          </div>
        </JetLabel>
      </div>

      <div class="flex justify-end items-center mt-4">
        <Link href="/login" class="text-sm text-gray-600 hover:text-gray-900 underline">
          Already registered?
        </Link>

        <JetButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Register
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

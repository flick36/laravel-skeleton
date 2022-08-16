<script setup lang="ts">
interface Props {
  canResetPassword: boolean
  status?: string
}

const { canResetPassword, status } = defineProps<Props>()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () =>
  form.transform(data => ({
    ...data,
    remember: form.remember ? 'on' : '',
  })).post('/login', {
    onFinish: () => form.reset('password'),
  })
</script>

<template>
  <Head title="Log in" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <JetLabel for="email" value="Email" />
        <JetInput
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full"
          required
          autofocus
        />
        <JetInputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <JetLabel for="password" value="Password" />
        <JetInput
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
        />
        <JetInputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4 block">
        <label class="flex items-center">
          <JetCheckbox v-model:checked="form.remember" name="remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="mt-4 flex items-center justify-end">
        <Link v-if="canResetPassword" href="/forgot-password" class="text-sm text-gray-600 underline hover:text-gray-900">
          Forgot your password?
        </Link>

        <JetButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Log in
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

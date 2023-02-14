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

  <AuthenticationCard>
    <template #logo>
      <AuthenticationCardLogo />
    </template>

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="email" value="Email" />
        <TextInput
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full"
          required
          autofocus
          autocomplete="username"
        />
        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />
        <TextInput
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4 block">
        <label class="flex items-center">
          <Checkbox v-model:checked="form.remember" name="remember" />
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
      </div>

      <div class="mt-4 flex items-center justify-end">
        <Link v-if="canResetPassword" href="/forgot-password" class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
          Forgot your password?
        </Link>

        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Log in
        </PrimaryButton>
      </div>
    </form>
  </AuthenticationCard>
</template>

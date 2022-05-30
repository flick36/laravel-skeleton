<script setup lang="ts">
import JetInput from '@/components/Jetstream/Input.vue'

const passwordInput = $ref<InstanceType<typeof JetInput> | null>(null)
const currentPasswordInput = $ref<InstanceType<typeof JetInput> | null>(null)

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const updatePassword = () => {
  form.put('/user/password', {
    errorBag: 'updatePassword',
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation')
        passwordInput?.focus()
      }

      if (form.errors.current_password) {
        form.reset('current_password')
        currentPasswordInput?.focus()
      }
    },
  })
}
</script>

<template>
  <JetFormSection @submitted="updatePassword">
    <template #title>
      Update Password
    </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="current_password" value="Current Password" />
        <JetInput
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          type="password"
          class="block mt-1 w-full"
          autocomplete="current-password"
        />
        <JetInputError :message="form.errors.current_password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="password" value="New Password" />
        <JetInput
          id="password"
          ref="passwordInput"
          v-model="form.password"
          type="password"
          class="block mt-1 w-full"
          autocomplete="new-password"
        />
        <JetInputError :message="form.errors.password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="password_confirmation" value="Confirm Password" />
        <JetInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="block mt-1 w-full"
          autocomplete="new-password"
        />
        <JetInputError :message="form.errors.password_confirmation" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <JetActionMessage :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </JetActionMessage>

      <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Save
      </JetButton>
    </template>
  </JetFormSection>
</template>

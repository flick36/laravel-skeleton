<template>
  <jet-form-section @submitted="updatePassword">
    <template #title> Update Password </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="current_password" value="Current Password" />
        <jet-input
          id="current_password"
          ref="current_password"
          v-model="form.current_password"
          type="password"
          class="block w-full mt-1"
          autocomplete="current-password"
        />
        <jet-input-error :message="form.errors.current_password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label for="password" value="New Password" />
        <jet-input
          id="password"
          ref="password"
          v-model="form.password"
          type="password"
          class="block w-full mt-1"
          autocomplete="new-password"
        />
        <jet-input-error :message="form.errors.password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label for="password_confirmation" value="Confirm Password" />
        <jet-input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="block w-full mt-1"
          autocomplete="new-password"
        />
        <jet-input-error :message="form.errors.password_confirmation" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <jet-action-message :on="form.recentlySuccessful" class="mr-3"> Saved. </jet-action-message>

      <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Save
      </jet-button>
    </template>
  </jet-form-section>
</template>

<script setup lang="ts">
import JetActionMessage from '@/scripts/Jetstream/ActionMessage.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import JetFormSection from '@/scripts/Jetstream/FormSection.vue'
import JetInput from '@/scripts/Jetstream/Input.vue'
import JetInputError from '@/scripts/Jetstream/InputError.vue'
import JetLabel from '@/scripts/Jetstream/Label.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'

const password = ref<InstanceType<typeof JetInput> | null>(null)
const current_password = ref<InstanceType<typeof JetInput> | null>(null)
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
        password.value?.focus()
      }

      if (form.errors.current_password) {
        form.reset('current_password')
        current_password.value?.focus()
      }
    },
  })
}
</script>

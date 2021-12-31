<template>
  <jet-action-section>
    <template #title> Delete Account </template>

    <template #description> Permanently delete your account. </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once your account is deleted, all of its resources and data will be permanently deleted.
        Before deleting your account, please download any data or information that you wish to
        retain.
      </div>

      <div class="mt-5">
        <jet-danger-button @click="confirmUserDeletion"> Delete Account </jet-danger-button>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <jet-dialog-modal :show="confirmingUserDeletion" @close="closeModal">
        <template #title> Delete Account </template>

        <template #content>
          Are you sure you want to delete your account? Once your account is deleted, all of its
          resources and data will be permanently deleted. Please enter your password to confirm you
          would like to permanently delete your account.

          <div class="mt-4">
            <jet-input
              ref="password"
              v-model="form.password"
              type="password"
              class="block w-3/4 mt-1"
              placeholder="Password"
              @keyup.enter="deleteUser"
            />

            <jet-input-error :message="form.errors.password" class="mt-2" />
          </div>
        </template>

        <template #footer>
          <jet-secondary-button @click="closeModal"> Cancel </jet-secondary-button>

          <jet-danger-button
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            Delete Account
          </jet-danger-button>
        </template>
      </jet-dialog-modal>
    </template>
  </jet-action-section>
</template>

<script setup lang="ts">
import JetActionSection from '@/scripts/Jetstream/ActionSection.vue'
import JetDangerButton from '@/scripts/Jetstream/DangerButton.vue'
import JetDialogModal from '@/scripts/Jetstream/DialogModal.vue'
import JetInput from '@/scripts/Jetstream/Input.vue'
import JetInputError from '@/scripts/Jetstream/InputError.vue'
import JetSecondaryButton from '@/scripts/Jetstream/SecondaryButton.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'

const confirmingUserDeletion = ref(false)
const password = ref<InstanceType<typeof JetInput> | null>(null)
const form = useForm({
  password: '',
})

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true

  setTimeout(() => password.value?.focus(), 250)
}

const deleteUser = () =>
  form.delete('/user', {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => password.value?.focus(),
    onFinish: () => form.reset(),
  })

const closeModal = () => {
  confirmingUserDeletion.value = false

  form.reset()
}
</script>

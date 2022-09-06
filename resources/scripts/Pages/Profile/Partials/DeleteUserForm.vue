<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'

let confirmingUserDeletion = $ref(false)
const passwordInput = $ref<InstanceType<typeof TextInput> | null>(null)

const form = useForm({ password: '' })

const confirmUserDeletion = () => {
  confirmingUserDeletion = true

  setTimeout(() => passwordInput?.focus(), 250)
}

const closeModal = () => {
  confirmingUserDeletion = false

  form.reset()
}

const deleteUser = () =>
  form.delete('/user', {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput?.focus(),
    onFinish: () => form.reset(),
  })
</script>

<template>
  <ActionSection>
    <template #title>
      Delete Account
    </template>

    <template #description>
      Permanently delete your account.
    </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
      </div>

      <div class="mt-5">
        <DangerButton @click="confirmUserDeletion">
          Delete Account
        </DangerButton>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <DialogModal :show="confirmingUserDeletion" @close="closeModal">
        <template #title>
          Delete Account
        </template>

        <template #content>
          Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.

          <div class="mt-4">
            <TextInput
              ref="passwordInput"
              v-model="form.password"
              type="password"
              class="mt-1 block w-3/4"
              placeholder="Password"
              @keyup.enter="deleteUser"
            />

            <InputError :message="form.errors.password" class="mt-2" />
          </div>
        </template>

        <template #footer>
          <SecondaryButton @click="closeModal">
            Cancel
          </SecondaryButton>

          <DangerButton
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            Delete Account
          </DangerButton>
        </template>
      </DialogModal>
    </template>
  </ActionSection>
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue'
import axios from '@/modules/axios'

interface Props {
  title?: string
  content?: string
  button?: string
}

const {
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'confirmed'): void }>()

let confirmingPassword = $ref(false)
const passwordInput = $ref<InstanceType<typeof TextInput> | null>(null)
const form = reactive({
  password: '',
  error: '',
  processing: false,
})

const startConfirmingPassword = () => {
  axios.get('/user/confirmed-password-status').then((response) => {
    if (response.data.confirmed)
      return emit('confirmed')

    confirmingPassword = true
    setTimeout(() => passwordInput?.focus(), 250)
  })
}

const closeModal = () => {
  confirmingPassword = false
  form.password = ''
  form.error = ''
}

const confirmPassword = () => {
  form.processing = true

  axios.post('/user/confirm-password', {
    password: form.password,
  }).then(() => {
    form.processing = false

    closeModal()
    nextTick(() => emit('confirmed'))
  }).catch((error) => {
    form.processing = false
    form.error = error.response.data.errors.password[0]
    passwordInput?.focus()
  })
}
</script>

<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <DialogModal :show="confirmingPassword" @close="closeModal">
      <template #title>
        {{ title }}
      </template>

      <template #content>
        {{ content }}

        <div class="mt-4">
          <TextInput
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-3/4"
            placeholder="Password"
            @keyup.enter="confirmPassword"
          />

          <InputError :message="form.error" class="mt-2" />
        </div>
      </template>

      <template #footer>
        <SecondaryButton @click="closeModal">
          Cancel
        </SecondaryButton>

        <PrimaryButton
          class="ml-3"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          @click="confirmPassword"
        >
          {{ button }}
        </PrimaryButton>
      </template>
    </DialogModal>
  </span>
</template>

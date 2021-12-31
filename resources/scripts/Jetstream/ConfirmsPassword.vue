<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <jet-dialog-modal :show="confirmingPassword" @close="closeModal">
      <template #title>
        {{ title }}
      </template>

      <template #content>
        {{ content }}

        <div class="mt-4">
          <jet-input
            ref="password"
            v-model="form.password"
            type="password"
            class="block w-3/4 mt-1"
            placeholder="Password"
            @keyup.enter="confirmPassword"
          />

          <jet-input-error :message="form.error" class="mt-2" />
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="closeModal"> Cancel </jet-secondary-button>

        <jet-button
          class="ml-3"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          @click="confirmPassword"
        >
          {{ button }}
        </jet-button>
      </template>
    </jet-dialog-modal>
  </span>
</template>

<script setup lang="ts">
import axios from '@/scripts/plugins/axios'
import { nextTick, reactive, ref } from 'vue'
import JetButton from './Button.vue'
import JetDialogModal from './DialogModal.vue'
import JetInput from './Input.vue'
import JetInputError from './InputError.vue'
import JetSecondaryButton from './SecondaryButton.vue'

const confirmingPassword = ref(false)
const password = ref<InstanceType<typeof JetInput> | null>(null)
const form = reactive({
  password: '',
  error: '',
  processing: false,
})

interface Props {
  title?: string
  content?: string
  button?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm Password',
  content: 'For your security, please confirm your password to continue.',
  button: 'Confirm',
})

const emit = defineEmits<{
  (e: 'confirmed'): void
}>()

const startConfirmingPassword = () => {
  axios.get('/user/confirmed-password-status').then((response) => {
    if (response.data.confirmed) {
      emit('confirmed')
    } else {
      confirmingPassword.value = true

      setTimeout(() => password.value?.focus(), 250)
    }
  })
}

const confirmPassword = () => {
  form.processing = true

  axios
    .post('/user/confirm-password', {
      password: form.password,
    })
    .then(() => {
      form.processing = false
      closeModal()
      nextTick(() => emit('confirmed'))
    })
    .catch((error) => {
      form.processing = false
      form.error = error.response.data.errors.password[0]
      password.value?.focus()
    })
}

const closeModal = () => {
  confirmingPassword.value = false
  form.password = ''
  form.error = ''
}
</script>

<template>
  <jet-form-section @submitted="updateProfileInformation">
    <template #title> Profile Information </template>

    <template #description> Update your account's profile information and email address. </template>

    <template #form>
      <!-- Profile Photo -->
      <div v-if="$page.props.jetstream.managesProfilePhotos" class="col-span-6 sm:col-span-4">
        <!-- Profile Photo File Input -->
        <input ref="photo" type="file" class="hidden" @change="updatePhotoPreview" />

        <jet-label for="photo" value="Photo" />

        <!-- Current Profile Photo -->
        <div v-show="!photoPreview" class="mt-2">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="object-cover w-20 h-20 rounded-full"
          />
        </div>

        <!-- New Profile Photo Preview -->
        <div v-show="photoPreview" class="mt-2">
          <span
            class="block w-20 h-20 bg-center bg-no-repeat bg-cover rounded-full"
            :style="'background-image: url(\'' + photoPreview + '\');'"
          >
          </span>
        </div>

        <jet-secondary-button class="mt-2 mr-2" type="button" @click.prevent="selectNewPhoto">
          Select A New Photo
        </jet-secondary-button>

        <jet-secondary-button
          v-if="user.profile_photo_path"
          type="button"
          class="mt-2"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </jet-secondary-button>

        <jet-input-error :message="form.errors.photo" class="mt-2" />
      </div>

      <!-- Name -->
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="name" value="Name" />
        <jet-input
          id="name"
          v-model="form.name"
          type="text"
          class="block w-full mt-1"
          autocomplete="name"
        />
        <jet-input-error :message="form.errors.name" class="mt-2" />
      </div>

      <!-- Email -->
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="email" value="Email" />
        <jet-input id="email" v-model="form.email" type="email" class="block w-full mt-1" />
        <jet-input-error :message="form.errors.email" class="mt-2" />
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
import JetSecondaryButton from '@/scripts/Jetstream/SecondaryButton.vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'

const props = defineProps<{
  user: {
    name: string
    email: string
    profile_photo_url: string
    profile_photo_path: string
  }
}>()

const photo = ref<HTMLInputElement | null>(null)
const photoPreview = ref<string | ArrayBuffer | null>(null)
const form = useForm<{
  _method: string
  name: string
  email: string
  photo: File | null
}>({
  _method: 'PUT',
  name: props.user.name,
  email: props.user.email,
  photo: null,
})

const updateProfileInformation = () => {
  if (photo.value?.files) form.photo = photo.value.files[0]

  form.post('/user/profile-information', {
    preserveScroll: true,
    onSuccess: () => clearPhotoFileInput(),
  })
}

const selectNewPhoto = () => photo.value?.click()

const updatePhotoPreview = () => {
  if (!photo.value?.files) return

  const newPhoto = photo.value.files[0]
  const reader = new FileReader()

  reader.onload = () => (photoPreview.value = reader.result)
  reader.readAsDataURL(newPhoto)
}

const deletePhoto = () => {
  Inertia.delete('/user/profile-photo', {
    preserveScroll: true,
    onSuccess: () => {
      photoPreview.value = null
      clearPhotoFileInput()
    },
  })
}

const clearPhotoFileInput = () => {
  if (photo.value?.value) photo.value.value = ''
}
</script>

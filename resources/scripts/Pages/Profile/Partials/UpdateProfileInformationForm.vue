<script setup lang="ts">
import type { JetstreamUser } from '@/types'
import JetButton from '@/Jetstream/Button.vue'
import JetFormSection from '@/Jetstream/FormSection.vue'
import JetInput from '@/Jetstream/Input.vue'
import JetInputError from '@/Jetstream/InputError.vue'
import JetLabel from '@/Jetstream/Label.vue'
import JetActionMessage from '@/Jetstream/ActionMessage.vue'
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'

const { user } = defineProps<{ user: JetstreamUser }>()

const photoInput = $ref<HTMLInputElement | null>(null)
let photoPreview = $ref<string | ArrayBuffer | null>(null)

const form = useForm<{
  _method: string
  name: string
  email: string
  photo: File | null
}>({
  _method: 'PUT',
  name: user.name,
  email: user.email,
  photo: null,
})

const clearPhotoFileInput = () => {
  if (photoInput)
    photoInput.value = ''
}

const updateProfileInformation = () => {
  if (photoInput?.files)
    form.photo = photoInput.files[0]

  form.post('/user/profile-information', {
    errorBag: 'updateProfileInformation',
    preserveScroll: true,
    onSuccess: () => clearPhotoFileInput(),
  })
}

const selectNewPhoto = () => photoInput?.click()

const updatePhotoPreview = () => {
  if (!photoInput?.files)
    return

  const photo = photoInput.files[0]

  const reader = new FileReader()

  reader.onload = () => (photoPreview = reader.result)
  reader.readAsDataURL(photo)
}

const deletePhoto = () => {
  Inertia.delete('/user/profile-photo', {
    preserveScroll: true,
    onSuccess: () => {
      photoPreview = null
      clearPhotoFileInput()
    },
  })
}
</script>

<template>
  <JetFormSection @submitted="updateProfileInformation">
    <template #title>
      Profile Information
    </template>
    <template #description>
      Update your account's profile information and email address.
    </template>
    <template #form>
      <!-- Profile Photo -->
      <div
        v-if="$page.props.jetstream.managesProfilePhotos"
        class="col-span-6 sm:col-span-4"
      >
        <!-- Profile Photo File Input -->
        <input ref="photoInput" type="file" class="hidden" @change="updatePhotoPreview">
        <JetLabel for="photo" value="Photo" />
        <!-- Current Profile Photo -->
        <div v-show="!photoPreview" class="mt-2">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="object-cover w-20 h-20 rounded-full"
          >
        </div>
        <!-- New Profile Photo Preview -->
        <div v-show="photoPreview" class="mt-2">
          <span
            class="block w-20 h-20 bg-center bg-no-repeat bg-cover rounded-full"
            :style="'background-image: url(\'' + photoPreview + '\');'"
          />
        </div>
        <JetSecondaryButton
          class="mt-2 mr-2"
          type="button"
          @click.prevent="selectNewPhoto"
        >
          Select A New Photo
        </JetSecondaryButton>
        <JetSecondaryButton
          v-if="user.profile_photo_path"
          type="button"
          class="mt-2"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </JetSecondaryButton>
        <JetInputError :message="form.errors.photo" class="mt-2" />
      </div>
      <!-- Name -->
      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="name" value="Name" />
        <JetInput
          id="name"
          v-model="form.name"
          type="text"
          class="block w-full mt-1"
          autocomplete="name"
        />
        <JetInputError :message="form.errors.name" class="mt-2" />
      </div>
      <!-- Email -->
      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="email" value="Email" />
        <JetInput
          id="email"
          v-model="form.email"
          type="email"
          class="block w-full mt-1"
        />
        <JetInputError :message="form.errors.email" class="mt-2" />
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

<script setup lang="ts">
import type { JetstreamUser } from '@/types/general'

const { user } = defineProps<{ user: JetstreamUser }>()

const photoInput = $ref<HTMLInputElement | null>(null)
let photoPreview = $ref<string | ArrayBuffer | null>(null)
let verificationLinkSent = $ref(false)

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

const sendEmailVerification = () => {
  verificationLinkSent = true
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
  router.delete('/user/profile-photo', {
    preserveScroll: true,
    onSuccess: () => {
      photoPreview = null
      clearPhotoFileInput()
    },
  })
}
</script>

<template>
  <FormSection @submitted="updateProfileInformation">
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
        <InputLabel for="photo" value="Photo" />
        <!-- Current Profile Photo -->
        <div v-show="!photoPreview" class="mt-2">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="h-20 w-20 rounded-full object-cover"
          >
        </div>
        <!-- New Profile Photo Preview -->
        <div v-show="photoPreview" class="mt-2">
          <span
            class="block h-20 w-20 rounded-full bg-cover bg-center bg-no-repeat"
            :style="`background-image: url('${photoPreview}');`"
          />
        </div>
        <SecondaryButton
          class="mt-2 mr-2"
          type="button"
          @click.prevent="selectNewPhoto"
        >
          Select A New Photo
        </SecondaryButton>
        <SecondaryButton
          v-if="user.profile_photo_path"
          type="button"
          class="mt-2"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </SecondaryButton>
        <InputError :message="form.errors.photo" class="mt-2" />
      </div>
      <!-- Name -->
      <div class="col-span-6 sm:col-span-4">
        <InputLabel for="name" value="Name" />
        <TextInput
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full"
          autocomplete="name"
        />
        <InputError :message="form.errors.name" class="mt-2" />
      </div>
      <!-- Email -->
      <div class="col-span-6 sm:col-span-4">
        <InputLabel for="email" value="Email" />
        <TextInput
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full"
          autocomplete="username"
        />
        <InputError :message="form.errors.email" class="mt-2" />

        <div v-show="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
          <p class="mt-2 text-sm dark:text-white">
            Your email address is unverified.
            <Link
              href="/email/verification-notification"
              method="post"
              as="button"
              class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
              @click.prevent="sendEmailVerification"
            >
              Click here to re-send the verification email.
            </Link>
          </p>
          <div v-show="verificationLinkSent" class="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
            A new verification link has been sent to your email address.
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </ActionMessage>
      <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Save
      </PrimaryButton>
    </template>
  </FormSection>
</template>

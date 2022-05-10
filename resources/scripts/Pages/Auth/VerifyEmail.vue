<script setup lang="ts">
const { status } = defineProps<{ status: string }>()

const form = useForm({})

const submit = () => form.post('/verification.send')

const verificationLinkSent = $computed(() => status === 'verification-link-sent')
</script>

<template>
  <Head title="Email Verification" />

  <JetAuthenticationCard>
    <template #logo>
      <JetAuthenticationCardLogo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
    </div>

    <div v-if="verificationLinkSent" class="mb-4 text-sm font-medium text-green-600">
      A new verification link has been sent to the email address you provided in your profile settings.
    </div>

    <form @submit.prevent="submit">
      <div class="flex items-center justify-between mt-4">
        <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Resend Verification Email
        </JetButton>

        <div>
          <Link
            href="/user/profile"
            class="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Edit Profile
          </Link>

          <Link
            href="/logout"
            method="post"
            as="button"
            class="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Log Out
          </Link>
        </div>
      </div>
    </form>
  </JetAuthenticationCard>
</template>

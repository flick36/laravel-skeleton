<script setup lang="ts">
import type { ApiToken, UserPermissions } from '@/types'

const {
  tokens,
  availablePermissions,
  defaultPermissions,
} = defineProps<{
  tokens: ApiToken[]
  availablePermissions: UserPermissions
  defaultPermissions: UserPermissions
}>()

const createApiTokenForm = useForm({
  name: '',
  permissions: defaultPermissions,
})
const updateApiTokenForm = useForm<{ permissions: UserPermissions }>({ permissions: [] })
const deleteApiTokenForm = useForm({})

let displayingToken = $ref(false)
let managingPermissionsFor = $ref<ApiToken | null>(null)
let apiTokenBeingDeleted = $ref<ApiToken | null>(null)

const createApiToken = () => {
  createApiTokenForm.post('/user/api-tokens', {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken = true
      createApiTokenForm.reset()
    },
  })
}

const manageApiTokenPermissions = (token: ApiToken) => {
  updateApiTokenForm.permissions = token.abilities
  managingPermissionsFor = token
}

const updateApiToken = () =>
  updateApiTokenForm.put(`/user/api-tokens/${managingPermissionsFor?.id}`, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => (managingPermissionsFor = null),
  })

const confirmApiTokenDeletion = (token: ApiToken) => (apiTokenBeingDeleted = token)

const deleteApiToken = () => {
  deleteApiTokenForm.delete(`/user/api-tokens/${apiTokenBeingDeleted?.id}`, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => (apiTokenBeingDeleted = null),
  })
}
</script>

<template>
  <div>
    <!-- Generate API Token -->
    <JetFormSection @submitted="createApiToken">
      <template #title>
        Create API Token
      </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <div class="col-span-6 sm:col-span-4">
          <JetLabel for="name" value="Name" />
          <JetInput
            id="name"
            v-model="createApiTokenForm.name"
            type="text"
            class="block w-full mt-1"
            autofocus
          />
          <JetInputError :message="createApiTokenForm.errors.name" class="mt-2" />
        </div>

        <!-- Token Permissions -->
        <div v-if="availablePermissions.length > 0" class="col-span-6">
          <JetLabel for="permissions" value="Permissions" />

          <div class="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            <div v-for="permission in availablePermissions" :key="permission">
              <label class="flex items-center">
                <JetCheckbox v-model:checked="createApiTokenForm.permissions" :value="permission" />
                <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <JetActionMessage :on="createApiTokenForm.recentlySuccessful" class="mr-3">
          Created.
        </JetActionMessage>

        <JetButton :class="{ 'opacity-25': createApiTokenForm.processing }" :disabled="createApiTokenForm.processing">
          Create
        </JetButton>
      </template>
    </JetFormSection>

    <div v-if="tokens.length > 0">
      <JetSectionBorder />

      <!-- Manage API Tokens -->
      <div class="mt-10 sm:mt-0">
        <JetActionSection>
          <template #title>
            Manage API Tokens
          </template>

          <template #description>
            You may delete any of your existing tokens if they are no longer needed.
          </template>

          <!-- API Token List -->
          <template #content>
            <div class="space-y-6">
              <div v-for="token in tokens" :key="token.id" class="flex items-center justify-between">
                <div>
                  {{ token.name }}
                </div>

                <div class="flex items-center">
                  <div v-if="token.last_used_ago" class="text-sm text-gray-400">
                    Last used {{ token.last_used_ago }}
                  </div>

                  <button
                    v-if="availablePermissions.length > 0"
                    class="ml-6 text-sm text-gray-400 underline cursor-pointer"
                    @click="manageApiTokenPermissions(token)"
                  >
                    Permissions
                  </button>

                  <button class="ml-6 text-sm text-red-500 cursor-pointer" @click="confirmApiTokenDeletion(token)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
        </JetActionSection>
      </div>
    </div>

    <!-- Token Value Modal -->
    <JetDialogModal :show="displayingToken" @close="displayingToken = false">
      <template #title>
        API Token
      </template>

      <template #content>
        <div>
          Please copy your new API token. For your security, it won't be shown again.
        </div>

        <div v-if="$page.props.jetstream.flash.token" class="px-4 py-2 mt-4 font-mono text-sm text-gray-500 bg-gray-100 rounded">
          {{ $page.props.jetstream.flash.token }}
        </div>
      </template>

      <template #footer>
        <JetSecondaryButton @click="displayingToken = false">
          Close
        </JetSecondaryButton>
      </template>
    </JetDialogModal>

    <!-- API Token Permissions Modal -->
    <JetDialogModal :show="Boolean(managingPermissionsFor)" @close="managingPermissionsFor = null">
      <template #title>
        API Token Permissions
      </template>

      <template #content>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div v-for="permission in availablePermissions" :key="permission">
            <label class="flex items-center">
              <JetCheckbox v-model:checked="updateApiTokenForm.permissions" :value="permission" />
              <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <JetSecondaryButton @click="managingPermissionsFor = null">
          Cancel
        </JetSecondaryButton>

        <JetButton
          class="ml-3"
          :class="{ 'opacity-25': updateApiTokenForm.processing }"
          :disabled="updateApiTokenForm.processing"
          @click="updateApiToken"
        >
          Save
        </JetButton>
      </template>
    </JetDialogModal>

    <!-- Delete Token Confirmation Modal -->
    <JetConfirmationModal :show="Boolean(apiTokenBeingDeleted)" @close="apiTokenBeingDeleted = null">
      <template #title>
        Delete API Token
      </template>

      <template #content>
        Are you sure you would like to delete this API token?
      </template>

      <template #footer>
        <JetSecondaryButton @click="apiTokenBeingDeleted = null">
          Cancel
        </JetSecondaryButton>

        <JetDangerButton
          class="ml-3"
          :class="{ 'opacity-25': deleteApiTokenForm.processing }"
          :disabled="deleteApiTokenForm.processing"
          @click="deleteApiToken"
        >
          Delete
        </JetDangerButton>
      </template>
    </JetConfirmationModal>
  </div>
</template>
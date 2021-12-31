<template>
  <div>
    <!-- Generate API Token -->
    <jet-form-section @submitted="createApiToken">
      <template #title> Create API Token </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <div class="col-span-6 sm:col-span-4">
          <jet-label for="name" value="Name" />
          <jet-input
            id="name"
            v-model="createApiTokenForm.name"
            type="text"
            class="block w-full mt-1"
            autofocus
          />
          <jet-input-error :message="createApiTokenForm.errors.name" class="mt-2" />
        </div>

        <!-- Token Permissions -->
        <div v-if="availablePermissions.length > 0" class="col-span-6">
          <jet-label for="permissions" value="Permissions" />

          <div class="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            <div v-for="permission in availablePermissions" :key="permission">
              <label class="flex items-center">
                <jet-checkbox
                  v-model:checked="createApiTokenForm.permissions"
                  :value="permission"
                />
                <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <jet-action-message :on="createApiTokenForm.recentlySuccessful" class="mr-3">
          Created.
        </jet-action-message>

        <jet-button
          :class="{ 'opacity-25': createApiTokenForm.processing }"
          :disabled="createApiTokenForm.processing"
        >
          Create
        </jet-button>
      </template>
    </jet-form-section>

    <div v-if="tokens.length > 0">
      <jet-section-border />

      <!-- Manage API Tokens -->
      <div class="mt-10 sm:mt-0">
        <jet-action-section>
          <template #title> Manage API Tokens </template>

          <template #description>
            You may delete any of your existing tokens if they are no longer needed.
          </template>

          <!-- API Token List -->
          <template #content>
            <div class="space-y-6">
              <div
                v-for="token in tokens"
                :key="token.id"
                class="flex items-center justify-between"
              >
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

                  <button
                    class="ml-6 text-sm text-red-500 cursor-pointer"
                    @click="confirmApiTokenDeletion(token)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
        </jet-action-section>
      </div>
    </div>

    <!-- Token Value Modal -->
    <jet-dialog-modal :show="displayingToken" @close="displayingToken = false">
      <template #title> API Token </template>

      <template #content>
        <div>Please copy your new API token. For your security, it won't be shown again.</div>

        <div
          v-if="$page.props.jetstream.flash.token"
          class="px-4 py-2 mt-4 font-mono text-sm text-gray-500 bg-gray-100 rounded"
        >
          {{ $page.props.jetstream.flash.token }}
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="displayingToken = false"> Close </jet-secondary-button>
      </template>
    </jet-dialog-modal>

    <!-- API Token Permissions Modal -->
    <jet-dialog-modal
      :show="Boolean(managingPermissionsFor)"
      @close="managingPermissionsFor = null"
    >
      <template #title> API Token Permissions </template>

      <template #content>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div v-for="permission in availablePermissions" :key="permission">
            <label class="flex items-center">
              <jet-checkbox v-model:checked="updateApiTokenForm.permissions" :value="permission" />
              <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="managingPermissionsFor = null"> Cancel </jet-secondary-button>

        <jet-button
          class="ml-3"
          :class="{ 'opacity-25': updateApiTokenForm.processing }"
          :disabled="updateApiTokenForm.processing"
          @click="updateApiToken"
        >
          Save
        </jet-button>
      </template>
    </jet-dialog-modal>

    <!-- Delete Token Confirmation Modal -->
    <jet-confirmation-modal
      :show="Boolean(apiTokenBeingDeleted)"
      @close="apiTokenBeingDeleted = null"
    >
      <template #title> Delete API Token </template>

      <template #content> Are you sure you would like to delete this API token? </template>

      <template #footer>
        <jet-secondary-button @click="apiTokenBeingDeleted = null"> Cancel </jet-secondary-button>

        <jet-danger-button
          class="ml-3"
          :class="{ 'opacity-25': deleteApiTokenForm.processing }"
          :disabled="deleteApiTokenForm.processing"
          @click="deleteApiToken"
        >
          Delete
        </jet-danger-button>
      </template>
    </jet-confirmation-modal>
  </div>
</template>

<script setup lang="ts">
import JetActionMessage from '@/scripts/Jetstream/ActionMessage.vue'
import JetActionSection from '@/scripts/Jetstream/ActionSection.vue'
import JetButton from '@/scripts/Jetstream/Button.vue'
import JetCheckbox from '@/scripts/Jetstream/Checkbox.vue'
import JetConfirmationModal from '@/scripts/Jetstream/ConfirmationModal.vue'
import JetDangerButton from '@/scripts/Jetstream/DangerButton.vue'
import JetDialogModal from '@/scripts/Jetstream/DialogModal.vue'
import JetFormSection from '@/scripts/Jetstream/FormSection.vue'
import JetInput from '@/scripts/Jetstream/Input.vue'
import JetInputError from '@/scripts/Jetstream/InputError.vue'
import JetLabel from '@/scripts/Jetstream/Label.vue'
import JetSecondaryButton from '@/scripts/Jetstream/SecondaryButton.vue'
import JetSectionBorder from '@/scripts/Jetstream/SectionBorder.vue'
import { Permissions, Token } from '@/scripts/models'
import { useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'

const props = defineProps<{
  tokens: Token[]
  availablePermissions: Permissions
  defaultPermissions: Permissions
}>()

const displayingToken = ref(false)
const managingPermissionsFor = ref<Token | null>(null)
const apiTokenBeingDeleted = ref<Token | null>(null)
const deleteApiTokenForm = useForm({})
const createApiTokenForm = useForm({
  name: '',
  permissions: props.defaultPermissions,
})

const updateApiTokenForm = useForm<{
  permissions: Permissions
}>({
  permissions: [],
})

const createApiToken = () => {
  createApiTokenForm.post('/user/api-tokens', {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken.value = true
      createApiTokenForm.reset()
    },
  })
}

const manageApiTokenPermissions = (token: Token) => {
  updateApiTokenForm.permissions = token.abilities

  managingPermissionsFor.value = token
}

const updateApiToken = () =>
  updateApiTokenForm.put(`/user/api-tokens/${managingPermissionsFor.value?.id}`, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => (managingPermissionsFor.value = null),
  })

const confirmApiTokenDeletion = (token: Token) => (apiTokenBeingDeleted.value = token)

const deleteApiToken = () => {
  deleteApiTokenForm.delete(`/user/api-tokens/${apiTokenBeingDeleted.value?.id}`, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => (apiTokenBeingDeleted.value = null),
  })
}
</script>

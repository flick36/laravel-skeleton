<script setup lang="ts">
import type { JetstreamTeamPermissions, JetstreamUser, Role, Team, TeamInvitation } from '@/types'

const props = defineProps<{
  team: Team
  availableRoles: Role[]
  userPermissions: JetstreamTeamPermissions
}>()

const addTeamMemberForm = useForm({
  email: '',
  role: '',
})

const updateRoleForm = useForm({
  role: '',
})

const leaveTeamForm = useForm({})
const removeTeamMemberForm = useForm({})

let currentlyManagingRole = $ref(false)
let managingRoleFor = $ref<JetstreamUser | null>(null)
let confirmingLeavingTeam = $ref(false)
let teamMemberBeingRemoved = $ref<JetstreamUser | null>(null)

const addTeamMember = () => {
  addTeamMemberForm.post(`/teams/${props.team.id}/members`, {
    errorBag: 'addTeamMember',
    preserveScroll: true,
    onSuccess: () => addTeamMemberForm.reset(),
  })
}

const cancelTeamInvitation = (invitation: TeamInvitation) => {
  Inertia.delete(`/team-invitations/${invitation.id}`, {
    preserveScroll: true,
  })
}

const manageRole = (teamMember: JetstreamUser) => {
  if (teamMember.membership) {
    managingRoleFor = teamMember
    updateRoleForm.role = teamMember.membership.role
    currentlyManagingRole = true
  }
}

const updateRole = () => {
  if (managingRoleFor) {
    updateRoleForm.put(`/teams/${props.team.id}/members/${managingRoleFor.id}`, {
      preserveScroll: true,
      onSuccess: () => currentlyManagingRole = false,
    })
  }
}

const confirmLeavingTeam = () => {
  confirmingLeavingTeam = true
}

const leaveTeam = () => {
  leaveTeamForm.delete(`/teams/${props.team.id}/members/${usePage().props.value.user?.id}`)
}

const confirmTeamMemberRemoval = (teamMember: JetstreamUser) => {
  teamMemberBeingRemoved = teamMember
}

const removeTeamMember = () => {
  if (teamMemberBeingRemoved) {
    removeTeamMemberForm.delete(`/teams/${props.team.id}/members/${teamMemberBeingRemoved.id}`, {
      errorBag: 'removeTeamMember',
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => teamMemberBeingRemoved = null,
    })
  }
}

const displayableRole = (role = '') => {
  return props.availableRoles.find(r => r.key === role)?.name
}
</script>

<template>
  <div>
    <div v-if="userPermissions.canAddTeamMembers">
      <JetSectionBorder />

      <!-- Add Team Member -->
      <JetFormSection @submitted="addTeamMember">
        <template #title>
          Add Team Member
        </template>

        <template #description>
          Add a new team member to your team, allowing them to collaborate with you.
        </template>

        <template #form>
          <div class="col-span-6">
            <div class="max-w-xl text-sm text-gray-600">
              Please provide the email address of the person you would like to add to this team.
            </div>
          </div>

          <!-- Member Email -->
          <div class="col-span-6 sm:col-span-4">
            <JetLabel for="email" value="Email" />
            <JetInput
              id="email"
              v-model="addTeamMemberForm.email"
              type="email"
              class="block mt-1 w-full"
            />
            <JetInputError :message="addTeamMemberForm.errors.email" class="mt-2" />
          </div>

          <!-- Role -->
          <div v-if="availableRoles.length > 0" class="col-span-6 lg:col-span-4">
            <JetLabel for="roles" value="Role" />
            <JetInputError :message="addTeamMemberForm.errors.role" class="mt-2" />

            <div class="relative z-0 mt-1 rounded-lg border border-gray-200 cursor-pointer">
              <button
                v-for="(role, i) in availableRoles"
                :key="role.key"
                type="button"
                class="inline-flex relative focus:z-10 py-3 px-4 w-full rounded-lg focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200"
                :class="{ 'border-t border-gray-200 rounded-t-none': i > 0, 'rounded-b-none': i !== Object.keys(availableRoles).length - 1 }"
                @click="addTeamMemberForm.role = role.key"
              >
                <div :class="{ 'opacity-50': addTeamMemberForm.role && addTeamMemberForm.role !== role.key }">
                  <!-- Role Name -->
                  <div class="flex items-center">
                    <div class="text-sm text-gray-600" :class="{ 'font-semibold': addTeamMemberForm.role === role.key }">
                      {{ role.name }}
                    </div>

                    <svg
                      v-if="addTeamMemberForm.role === role.key"
                      class="ml-2 w-5 h-5 text-green-400"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    ><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>

                  <!-- Role Description -->
                  <div class="mt-2 text-xs text-left text-gray-600">
                    {{ role.description }}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </template>

        <template #actions>
          <JetActionMessage :on="addTeamMemberForm.recentlySuccessful" class="mr-3">
            Added.
          </JetActionMessage>

          <JetButton :class="{ 'opacity-25': addTeamMemberForm.processing }" :disabled="addTeamMemberForm.processing">
            Add
          </JetButton>
        </template>
      </JetFormSection>
    </div>

    <div v-if="team.team_invitations && team.team_invitations.length > 0 && userPermissions.canAddTeamMembers">
      <JetSectionBorder />

      <!-- Team Member Invitations -->
      <JetActionSection class="mt-10 sm:mt-0">
        <template #title>
          Pending Team Invitations
        </template>

        <template #description>
          These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation.
        </template>

        <!-- Pending Team Member Invitation List -->
        <template #content>
          <div class="space-y-6">
            <div v-for="invitation in team.team_invitations" :key="invitation.id" class="flex justify-between items-center">
              <div class="text-gray-600">
                {{ invitation.email }}
              </div>

              <div class="flex items-center">
                <!-- Cancel Team Invitation -->
                <button
                  v-if="userPermissions.canRemoveTeamMembers"
                  class="ml-6 text-sm text-red-500 focus:outline-none cursor-pointer"
                  @click="cancelTeamInvitation(invitation)"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </template>
      </JetActionSection>
    </div>

    <div v-if="team.users && team.users.length > 0">
      <JetSectionBorder />

      <!-- Manage Team Members -->
      <JetActionSection class="mt-10 sm:mt-0">
        <template #title>
          Team Members
        </template>

        <template #description>
          All of the people that are part of this team.
        </template>

        <!-- Team Member List -->
        <template #content>
          <div class="space-y-6">
            <div v-for="user in team.users" :key="user.id" class="flex justify-between items-center">
              <div class="flex items-center">
                <img class="w-8 h-8 rounded-full" :src="user.profile_photo_url" :alt="user.name">
                <div class="ml-4">
                  {{ user.name }}
                </div>
              </div>

              <div class="flex items-center">
                <!-- Manage Team Member Role -->
                <button
                  v-if="userPermissions.canAddTeamMembers && availableRoles.length"
                  class="ml-2 text-sm text-gray-400 underline"
                  @click="manageRole(user)"
                >
                  {{ displayableRole(user.membership?.role) }}
                </button>

                <div v-else-if="availableRoles.length" class="ml-2 text-sm text-gray-400">
                  {{ displayableRole(user.membership?.role) }}
                </div>

                <!-- Leave Team -->
                <button
                  v-if="$page.props.user?.id === user.id"
                  class="ml-6 text-sm text-red-500 cursor-pointer"
                  @click="confirmLeavingTeam"
                >
                  Leave
                </button>

                <!-- Remove Team Member -->
                <button
                  v-if="userPermissions.canRemoveTeamMembers"
                  class="ml-6 text-sm text-red-500 cursor-pointer"
                  @click="confirmTeamMemberRemoval(user)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </template>
      </JetActionSection>
    </div>

    <!-- Role Management Modal -->
    <JetDialogModal :show="currentlyManagingRole" @close="currentlyManagingRole = false">
      <template #title>
        Manage Role
      </template>

      <template #content>
        <div v-if="managingRoleFor">
          <div class="relative z-0 mt-1 rounded-lg border border-gray-200 cursor-pointer">
            <button
              v-for="(role, i) in availableRoles"
              :key="role.key"
              type="button"
              class="inline-flex relative focus:z-10 py-3 px-4 w-full rounded-lg focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200"
              :class="{ 'border-t border-gray-200 rounded-t-none': i > 0, 'rounded-b-none': i !== Object.keys(availableRoles).length - 1 }"
              @click="updateRoleForm.role = role.key"
            >
              <div :class="{ 'opacity-50': updateRoleForm.role && updateRoleForm.role !== role.key }">
                <!-- Role Name -->
                <div class="flex items-center">
                  <div class="text-sm text-gray-600" :class="{ 'font-semibold': updateRoleForm.role === role.key }">
                    {{ role.name }}
                  </div>

                  <svg
                    v-if="updateRoleForm.role === role.key"
                    class="ml-2 w-5 h-5 text-green-400"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  ><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>

                <!-- Role Description -->
                <div class="mt-2 text-xs text-gray-600">
                  {{ role.description }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </template>

      <template #footer>
        <JetSecondaryButton @click="currentlyManagingRole = false">
          Cancel
        </JetSecondaryButton>

        <JetButton
          class="ml-3"
          :class="{ 'opacity-25': updateRoleForm.processing }"
          :disabled="updateRoleForm.processing"
          @click="updateRole"
        >
          Save
        </JetButton>
      </template>
    </JetDialogModal>

    <!-- Leave Team Confirmation Modal -->
    <JetConfirmationModal :show="confirmingLeavingTeam" @close="confirmingLeavingTeam = false">
      <template #title>
        Leave Team
      </template>

      <template #content>
        Are you sure you would like to leave this team?
      </template>

      <template #footer>
        <JetSecondaryButton @click="confirmingLeavingTeam = false">
          Cancel
        </JetSecondaryButton>

        <JetDangerButton
          class="ml-3"
          :class="{ 'opacity-25': leaveTeamForm.processing }"
          :disabled="leaveTeamForm.processing"
          @click="leaveTeam"
        >
          Leave
        </JetDangerButton>
      </template>
    </JetConfirmationModal>

    <!-- Remove Team Member Confirmation Modal -->
    <JetConfirmationModal :show="teamMemberBeingRemoved != null" @close="teamMemberBeingRemoved = null">
      <template #title>
        Remove Team Member
      </template>

      <template #content>
        Are you sure you would like to remove this person from the team?
      </template>

      <template #footer>
        <JetSecondaryButton @click="teamMemberBeingRemoved = null">
          Cancel
        </JetSecondaryButton>

        <JetDangerButton
          class="ml-3"
          :class="{ 'opacity-25': removeTeamMemberForm.processing }"
          :disabled="removeTeamMemberForm.processing"
          @click="removeTeamMember"
        >
          Remove
        </JetDangerButton>
      </template>
    </JetConfirmationModal>
  </div>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm.vue'
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager.vue'
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm.vue'
import type { JetstreamTeamPermissions, Role, Team } from '@/types'

interface Props {
  team: Team
  availableRoles: Role[]
  permissions: JetstreamTeamPermissions
}

const {
  team,
  availableRoles,
  permissions,
} = defineProps<Props>()
</script>

<template>
  <AppLayout title="Team Settings">
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Team Settings
      </h2>
    </template>

    <div>
      <div class="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <UpdateTeamNameForm :team="team" :permissions="permissions" />

        <TeamMemberManager
          class="mt-10 sm:mt-0"
          :team="team"
          :available-roles="availableRoles"
          :user-permissions="permissions"
        />

        <template v-if="permissions.canDeleteTeam && !team.personal_team">
          <JetSectionBorder />

          <DeleteTeamForm class="mt-10 sm:mt-0" :team="team" />
        </template>
      </div>
    </div>
  </AppLayout>
</template>

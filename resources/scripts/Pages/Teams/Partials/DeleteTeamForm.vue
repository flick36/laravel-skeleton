<script setup lang="ts">
import type { Team } from '@/types'

const { team } = defineProps<{ team: Team }>()

let confirmingTeamDeletion = $ref(false)
const form = useForm({})

const confirmTeamDeletion = () => {
  confirmingTeamDeletion = true
}

const deleteTeam = () => {
  form.delete(`/teams/${team.id}`, {
    errorBag: 'deleteTeam',
  })
}
</script>

<template>
  <ActionSection>
    <template #title>
      Delete Team
    </template>

    <template #description>
      Permanently delete this team.
    </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.
      </div>

      <div class="mt-5">
        <DangerButton @click="confirmTeamDeletion">
          Delete Team
        </DangerButton>
      </div>

      <!-- Delete Team Confirmation Modal -->
      <ConfirmationModal :show="confirmingTeamDeletion" @close="confirmingTeamDeletion = false">
        <template #title>
          Delete Team
        </template>

        <template #content>
          Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.
        </template>

        <template #footer>
          <JSecondaryButton @click="confirmingTeamDeletion = false">
            Cancel
          </JSecondaryButton>

          <DangerButton
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteTeam"
          >
            Delete Team
          </DangerButton>
        </template>
      </ConfirmationModal>
    </template>
  </ActionSection>
</template>

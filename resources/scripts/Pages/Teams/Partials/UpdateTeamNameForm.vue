<script setup lang="ts">
import type { JetstreamTeamPermissions, Team } from '@/types/general'

interface Props {
  team: Team
  permissions: JetstreamTeamPermissions
}

const { team, permissions } = defineProps<Props>()

const form = useForm({
  name: team.name,
})

const updateTeamName = () => {
  form.put(`teams/${team.id}`, {
    errorBag: 'updateTeamName',
    preserveScroll: true,
  })
}
</script>

<template>
  <FormSection @submitted="updateTeamName">
    <template #title>
      Team Name
    </template>

    <template #description>
      The team's name and owner information.
    </template>

    <template #form>
      <!-- Team Owner Information -->
      <div class="col-span-6">
        <InputLabel value="Team Owner" />

        <div class="mt-2 flex items-center">
          <img class="h-12 w-12 rounded-full object-cover" :src="team.owner?.profile_photo_url" :alt="team.owner?.name">

          <div class="ml-4 leading-tight">
            <div class="dark:text-white">
              {{ team.owner?.name }}
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              {{ team.owner?.email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Team Name -->
      <div class="col-span-6 sm:col-span-4">
        <InputLabel for="name" value="Team Name" />

        <TextInput
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full"
          :disabled="!permissions.canUpdateTeam"
        />

        <InputError :message="form.errors.name" class="mt-2" />
      </div>
    </template>

    <template v-if="permissions.canUpdateTeam" #actions>
      <ActionMessage :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </ActionMessage>

      <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Save
      </PrimaryButton>
    </template>
  </FormSection>
</template>

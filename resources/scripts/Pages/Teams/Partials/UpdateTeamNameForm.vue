<script setup lang="ts">
import type { JetstreamTeamPermissions, Team } from '@/types'

const props = defineProps<{
  team: Team
  permissions: JetstreamTeamPermissions
}>()

const form = useForm({
  name: props.team.name,
})

const updateTeamName = () => {
  form.put(`teams/${props.team.id}`, {
    errorBag: 'updateTeamName',
    preserveScroll: true,
  })
}
</script>

<template>
  <JetFormSection @submitted="updateTeamName">
    <template #title>
      Team Name
    </template>

    <template #description>
      The team's name and owner information.
    </template>

    <template #form>
      <!-- Team Owner Information -->
      <div class="col-span-6">
        <JetLabel value="Team Owner" />

        <div class="flex items-center mt-2">
          <img class="object-cover w-12 h-12 rounded-full" :src="team.owner.profile_photo_url" :alt="team.owner.name">

          <div class="ml-4 leading-tight">
            <div>{{ team.owner.name }}</div>
            <div class="text-sm text-gray-700">
              {{ team.owner.email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Team Name -->
      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="name" value="Team Name" />

        <JetInput
          id="name"
          v-model="form.name"
          type="text"
          class="block w-full mt-1"
          :disabled="!permissions.canUpdateTeam"
        />

        <JetInputError :message="form.errors.name" class="mt-2" />
      </div>
    </template>

    <template v-if="permissions.canUpdateTeam" #actions>
      <JetActionMessage :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </JetActionMessage>

      <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Save
      </JetButton>
    </template>
  </JetFormSection>
</template>

<script setup lang="ts">
const form = useForm({
  name: '',
})

const createTeam = () => {
  form.post('/teams', {
    errorBag: 'createTeam',
    preserveScroll: true,
  })
}
</script>

<template>
  <JetFormSection @submitted="createTeam">
    <template #title>
      Team Details
    </template>

    <template #description>
      Create a new team to collaborate with others on projects.
    </template>

    <template #form>
      <div class="col-span-6">
        <JetLabel value="Team Owner" />

        <div class="mt-2 flex items-center">
          <img class="h-12 w-12 rounded-full object-cover" :src="$page.props.user?.profile_photo_url" :alt="$page.props.user?.name">

          <div class="ml-4 leading-tight">
            <div>{{ $page.props.user?.name }}</div>
            <div class="text-sm text-gray-700">
              {{ $page.props.user?.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-6 sm:col-span-4">
        <JetLabel for="name" value="Team Name" />
        <JetInput
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full"
          autofocus
        />
        <JetInputError :message="form.errors.name" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
        Create
      </JetButton>
    </template>
  </JetFormSection>
</template>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <JetSectionTitle>
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </JetSectionTitle>

    <div class="mt-5 md:col-span-2 md:mt-0">
      <div class="bg-white py-5 px-4 shadow sm:rounded-lg sm:p-6">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

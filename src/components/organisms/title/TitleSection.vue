<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  desc: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="tw-divider-section" />

  <div class="tw-max-w-[794px]">
    <h1 class="tw-mb-4 tw-text-center tw-text-heading-2 tw-text-neutral">{{ props.title }}</h1>
    <p v-if="props.desc" class="tw-text-center tw-text-neutral-desc" v-html="props.desc"></p>
  </div>
</template>

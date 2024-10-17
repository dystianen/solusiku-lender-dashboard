<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'

const props = defineProps({
  icon: {
    type: String
  },
  title: {
    type: String
  },
  total: {
    type: Number
  }
})
</script>

<template>
  <Card class="tw-flex tw-flex-col tw-justify-between tw-gap-4">
    <div class="tw-flex tw-items-center tw-gap-2">
      <img :src="props.icon" alt="Icon Dolar" :width="40" :height="40" />
      <p class="tw-text-base tw-text-neutral-1/[.68]">{{ props.title }}</p>
    </div>

    <h3 class="md:tw-text-md lg:tw-text-md tw-text-base tw-font-semibold 2xl:tw-text-2xl">
      {{ props.total }}
    </h3>
  </Card>
</template>

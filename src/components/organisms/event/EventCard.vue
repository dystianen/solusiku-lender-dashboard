<script lang="ts" setup>
type TItem = {
  img: string
  title: string
  desc: string
  date: string
}
const props = withDefaults(defineProps<TItem>(), {
  img: '',
  title: '',
  desc: '',
  date: ''
})
</script>

<template>
  <div class="tw-relative tw-w-[379px] tw-rounded-2xl tw-p-0 tw-text-left tw-shadow-medium-orange">
    <img :src="props.img" :alt="props.title" class="tw-h-[217px] tw-w-full" />

    <div class="tw-m-5 tw-flex tw-flex-col tw-gap-4">
      <h5 class="tw-text-lg tw-font-semibold">
        {{ props.title }}
      </h5>
      <p class="tw-text-neutral-desc">
        {{ props.desc }}
      </p>
      <p class="tw-text-primary">{{ props.date }}</p>
    </div>
  </div>
</template>

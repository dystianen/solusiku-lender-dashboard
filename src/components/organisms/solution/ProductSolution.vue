<script lang="ts" setup>
import IcChecked from '@/assets/icons/ic_checked.svg'

const props = defineProps({
  flex: {
    type: String,
    default: 'row'
  },
  img: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  list: {
    type: Array<string>,
    default: []
  }
})
</script>
<template>
  <div :class="['tw-flex', `tw-flex-${props.flex}`, 'tw-items-center', 'tw-gap-24']">
    <img :src="props.img" :width="546" :height="546" alt="Solusi Kini" />

    <div class="tw-flex tw-flex-col tw-gap-6">
      <h1 class="tw-text-display tw-leading-none">
        <span class="tw-text-primary">Solusi</span> {{ props.title }}
      </h1>
      <p>
        {{ props.desc }}
      </p>

      <div class="tw-flex tw-flex-col tw-gap-4">
        <div v-for="(item, i) in props.list" :key="i" class="tw-flex tw-gap-4">
          <img :src="IcChecked" :width="24" :height="24" alt="Ic Checked" />
          <p>{{ item }}</p>
        </div>
      </div>
      <el-button type="primary" round class="tw-mt-4">Ajukan Pinjaman</el-button>
    </div>
  </div>
</template>

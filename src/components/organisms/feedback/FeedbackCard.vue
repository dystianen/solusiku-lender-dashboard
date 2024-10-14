<script lang="ts" setup>
import { ref } from 'vue'
import IcDoubleQuotes from '@/assets/icons/ic_double_quotes.svg'
const props = defineProps({
  feedback: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  rate: {
    type: Number,
    default: 0
  }
})
const rate = ref(props.rate)
</script>

<template>
  <div
    class="tw-relative tw-rounded-3xl tw-bg-white tw-px-5 tw-py-10 tw-text-left tw-shadow-soft-red"
  >
    <div class="tw-absolute -tw-top-8">
      <img :src="IcDoubleQuotes" :width="56" :height="56" alt="profile" />
    </div>
    <p>
      {{ props.feedback }}
    </p>
    <el-divider />
    <div class="tw-flex tw-items-center tw-justify-between tw-gap-4">
      <div class="tw-flex tw-gap-2">
        <div>
          <img :src="props.img" :width="52" :height="52" alt="profile" />
        </div>

        <div>
          <h5 class="tw-text-body-semibold">{{ props.name }}</h5>
          <p class="tw-text-primary">{{ props.position }}</p>
        </div>
      </div>

      <el-rate v-model="rate" size="large" :disabled="true" />
    </div>
  </div>
</template>

<style>
.el-rate .el-rate__icon {
  margin-right: 0;
}
.el-rate .el-rate__icon.is-active {
  color: #de4f3f;
}
</style>

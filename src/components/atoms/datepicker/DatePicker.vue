<script lang="ts" setup>
import IcCalendar from '@/assets/icons/ic_calander2.svg'
import { h, shallowRef, useAttrs } from 'vue'

defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const attrs = useAttrs()

const customPrefix = shallowRef({
  render() {
    return h('img', {
      src: IcCalendar,
      alt: 'Calendar Icon'
    })
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="label" class="input-label">{{ label }}</label>
    <el-date-picker
      v-bind="attrs"
      type="date"
      :id="label"
      :placeholder="placeholder"
      size="large"
      class="custom-date"
      style="width: 100%"
      :prefix-icon="customPrefix"
    />
  </div>
</template>

<style scoped>
:deep(.custom-date) {
  height: 100%;
}
</style>

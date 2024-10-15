<script lang="ts" setup>
import type { Options } from '@/types/general'
import { useAttrs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array<Options>,
    default: () => ['']
  }
})

const attrs = useAttrs()
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <el-select
      v-bind="attrs"
      :placeholder="props.placeholder"
      size="large"
      style="border-radius: 15px"
    >
      <el-option v-for="item in props.options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<style>
.ep-select__wrapper {
  border-radius: 8px;
}
</style>

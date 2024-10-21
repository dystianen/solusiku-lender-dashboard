<script lang="ts" setup>
import type { Options } from '@/types/general'
import { useAttrs, type PropType } from 'vue'

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
  },
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'large'
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
      :size="props.size"
      style="border-radius: 15px"
    >
      <el-option v-for="item in props.options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

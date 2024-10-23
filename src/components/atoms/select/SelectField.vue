<script lang="ts" setup>
import type { Option, TSize } from '@/types/general'
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
    type: Array<Option>,
    default: () => ['']
  },
  size: {
    type: String as PropType<TSize>,
    default: 'large'
  }
})

const attrs = useAttrs()
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label tw-max-w-48 tw-truncate md:tw-max-w-full">
      {{ props.label }}
    </label>
    <el-select
      v-bind="attrs"
      :placeholder="props.placeholder"
      :size="props.size"
      style="border-radius: 15px"
    >
      <el-option v-for="item in props.options" :key="item.id" :label="item.name" :value="item.id" />

      <template #suffix>
        <el-icon>
          <v-icon name="fa-chevron-down" />
        </el-icon>
      </template>
    </el-select>
  </div>
</template>

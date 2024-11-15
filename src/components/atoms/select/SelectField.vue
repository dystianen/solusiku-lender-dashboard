<script lang="ts" setup>
import type { Option, TSize } from '@/types/general'
import { useAttrs, type PropType } from 'vue'

defineProps({
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
    default: () => [{ id: 0, name: '' }]
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
    <label :for="label" class="input-label tw-max-w-48 tw-truncate md:tw-max-w-full">
      {{ label }}
    </label>
    <el-select
      v-bind="attrs"
      :id="label"
      :placeholder="placeholder"
      :size="size"
      style="border-radius: 15px"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />

      <template #suffix>
        <el-icon>
          <v-icon name="fa-chevron-down" />
        </el-icon>
      </template>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import type { TSize } from '@/types/general'
import { useAttrs, type PropType } from 'vue'

const attrs = useAttrs()
defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pilih File'
  },
  size: {
    type: String as PropType<TSize>,
    default: 'large'
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="label" class="input-label">{{ label }}</label>
    <el-autocomplete
      v-bind="attrs"
      popper-class="my-autocomplete"
      :id="label"
      :placeholder="placeholder"
      :size="size"
    >
      <template #suffix>
        <el-icon>
          <v-icon name="fa-chevron-down" />
        </el-icon>
      </template>
      <template #default="{ item }">
        <span class="name">{{ item.name }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

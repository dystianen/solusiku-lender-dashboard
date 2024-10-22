<script lang="ts" setup>
import type { TSize } from '@/types/general'
import type { PropType } from 'vue'

const props = defineProps({
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
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <el-autocomplete popper-class="my-autocomplete" placeholder="Please input" :size="props.size">
      <template #suffix>
        <el-icon>
          <v-icon name="fa-chevron-down" />
        </el-icon>
      </template>
      <template #default="{ item }">
        <div class="value">{{ item.value }}</div>
        <span class="link">{{ item.link }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

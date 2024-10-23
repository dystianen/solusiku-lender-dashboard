<script lang="ts" setup>
import type { TSize } from '@/types/general'
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
    <el-input
      v-bind="attrs"
      :placeholder="props.placeholder"
      :size="props.size"
      style="border-radius: 15px"
    >
      <template #prefix>
        <slot name="prefix" />
      </template>
    </el-input>
  </div>
</template>

<style scoped>
:deep(.ep-input__prefix-inner > :last-child) {
  margin-right: 0;
}
</style>

<script lang="ts" setup>
import { useAttrs } from 'vue'

const props = defineProps({
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
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <el-date-picker
      v-bind="attrs"
      type="date"
      :placeholder="props.placeholder"
      size="large"
      style="width: 100%"
    />
  </div>
</template>

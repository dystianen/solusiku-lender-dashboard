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
    <el-input
      v-bind="attrs"
      :placeholder="props.placeholder"
      size="large"
      style="border-radius: 15px"
    />
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  width: 100%;
}

.input-label {
  position: absolute;
  font-size: 0.9rem;
  left: 10px;
  top: -8px;
  background-color: white;
  padding: 0 4px;
  z-index: 1;
  line-height: 1.2;
}
</style>

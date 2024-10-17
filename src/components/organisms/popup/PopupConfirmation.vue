<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  }
})
const emits = defineEmits(['onClose', 'onConfirm'])
</script>

<template>
  <el-dialog :title="props.title" width="500">
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('onClose')">Cancel</el-button>
        <el-button type="primary" @click="emits('onConfirm')"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

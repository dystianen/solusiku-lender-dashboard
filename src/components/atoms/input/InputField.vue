<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String as () => 'text' | 'number' | 'date' | 'file',
    default: 'text'
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <input :type="props.inputType" :placeholder="props.placeholder" class="input-field" />
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
  top: -12px;
  background-color: white;
  padding: 0 4px;
}

.input-field {
  width: 100%;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  border: 1px solid #c0c0c9;
  border-radius: 8px;
}

.input-field:focus,
.input-field:focus-visible {
  outline: none;
  border: 1px solid #de4f3f !important;
}

.input-field::placeholder {
  color: #c0c0c9;
  width: max-content;
  font-weight: 400;
  font-size: 14px;
}
</style>

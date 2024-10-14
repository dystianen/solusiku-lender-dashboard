<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button>{{ props.label }}</button>
</template>

<style scoped>
button {
  border-radius: 50px;
  width: max-content;
  padding: 16px 40px;
  font-weight: 600;
}
.primary {
  color: white;
  background: linear-gradient(101.9deg, #fb7b4a 3.62%, #de4f3f 92.8%);
}
.light {
  background: #fff0e9;
  color: #de4f3f;
}
</style>

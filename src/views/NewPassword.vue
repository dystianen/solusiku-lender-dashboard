<script lang="ts" setup>
import { ref } from 'vue'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'

const password = ref('')
const checked = ref(true)
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Buat Kata Sandi Baru</h1>
    <p class="tw-text-neutral-desc">Masukan kata sandi yang sering digunakan agar mudah diingat.</p>

    <InputField v-model="password" label="Kata Sandi" placeholder="Masukan Kata sandi" />

    <div>
      <p>Kata sandi harus memiliki:</p>
      <div class="tw-flex tw-items-center tw-gap-2">
        <el-checkbox :checked="checked" size="large" color="green" />
        <p class="tw-text-neutral-desc">Minimal terdiri dari 6-20 karakter</p>
      </div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <el-checkbox v-model="checked" size="large" color="green" />
        <p class="tw-text-neutral-desc">Minimal terdiri dari 1 huruf besar dan 1 angka</p>
      </div>
    </div>

    <el-button round type="primary" size="large" style="width: 100%"> Selanjutnya </el-button>
  </VerificationLayout>
</template>

<style scoped>
:deep(.el-checkbox.el-checkbox--large .el-checkbox__inner) {
  border-radius: 100%;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #03ab6f;
  background-color: #03ab6f;
}
</style>

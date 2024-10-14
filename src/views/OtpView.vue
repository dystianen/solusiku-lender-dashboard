<script lang="ts" setup>
import { ref } from 'vue'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import VOtpInput from 'vue3-otp-input'

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)
const bindModal = ref('')

const handleOnComplete = (value: string) => {
  console.log('OTP completed: ', value)
}

const handleOnChange = (value: string) => {
  console.log('OTP changed: ', value)
}
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Masukan Kode OTP</h1>
    <p class="tw-text-neutral-desc">
      Kami telah mengirim kode OTP via e-mail ke
      <span class="tw-font-semibold tw-text-primary">Jhondue@example.com</span>
    </p>

    <VOtpInput
      ref="otpInput"
      v-model:value="bindModal"
      input-classes="otp-input"
      input-type="number"
      :num-inputs="6"
      :should-auto-focus="true"
      :should-focus-order="true"
      :conditional-class="['one', 'two', 'three', 'four']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />

    <p class="tw-text-neutral-subtle">Kirim ulang setelah 59 detik.</p>

    <el-button round type="primary" size="large" style="width: 100%"> Konfirmasi </el-button>
  </VerificationLayout>
</template>

<style scoped>
:deep(.otp-input) {
  width: 60px;
  height: auto;
  padding: 5px;
  margin: 0 10px;
  font-size: 30px;
  border-radius: 0;
  border-bottom: 1px solid #31353b;
  text-align: center;
  font-weight: 600;
}

@media screen and (max-width: 480px) {
  :deep(.otp-input) {
    margin: 0 5px;
    width: 50px;
  }
}

:deep(.otp-input::-webkit-inner-spin-button),
:deep(.otp-input::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(input::placeholder) {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  width: 60px;
}

:deep(.otp-input:focus),
:deep(.otp-input:focus-visible) {
  outline: none;
  border-bottom: 1px solid #de4f3f !important;
}
</style>

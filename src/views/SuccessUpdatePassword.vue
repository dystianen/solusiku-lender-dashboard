<script lang="ts" setup>
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import IcChecked2 from '@/assets/icons/ic_checked2.svg'
</script>

<template>
  <VerificationLayout>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-4">
      <img :src="IcChecked2" />
      <h1 class="tw-text-center tw-text-4xl tw-font-semibold">Kata Sandi Berhasil Diperbarui!</h1>
      <p class="tw-text-center">Anda akan di kirim kehalaman login dalam 3 detik</p>

      <el-button round type="primary" size="large" style="width: 100%">
        Kembali ke Halaman Login
      </el-button>
    </div>
  </VerificationLayout>
</template>

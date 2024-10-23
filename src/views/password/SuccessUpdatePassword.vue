<script lang="ts" setup>
import IcChecked2 from '@/assets/icons/ic_checked2.svg'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToLogin = () => {
  setTimeout(() => {
    router.push({ name: 'login' })
  }, 3000)
}

onMounted(() => {
  redirectToLogin()
})
</script>

<template>
  <VerificationLayout>
    <div class="tw-mt-8 tw-flex tw-flex-col tw-items-center tw-gap-4">
      <img :src="IcChecked2" />
      <h1 class="tw-text-center tw-text-4xl tw-font-semibold">Kata Sandi Berhasil Diperbarui!</h1>
      <p class="tw-text-center">Anda akan di kirim kehalaman login dalam 3 detik</p>

      <el-button round type="primary" size="large" style="width: 100%">
        Kembali ke Halaman Login
      </el-button>
    </div>
  </VerificationLayout>
</template>

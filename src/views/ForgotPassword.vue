<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'

const email = ref('')
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Lupa Kata Sandi?</h1>
    <p class="tw-text-neutral-desc">
      Masukkan Email/No.Telepon yang digunakan saat mendaftar untuk memulihkan kata sandi. Anda akan
      menerima tautan pengaturan ulang kata sandi.
    </p>

    <InputField v-model="email" label="Email/No.Telepon" placeholder="Cth: Jhondue@example.com" />

    <el-button round size="large" style="width: 100%"> Kirim Email </el-button>
    <RouterLink
      to="/registration"
      class="tw-w-full tw-text-center tw-font-semibold tw-text-primary"
    >
      Kembali ke Halaman Login
    </RouterLink>
  </VerificationLayout>
</template>

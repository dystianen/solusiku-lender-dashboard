<script lang="ts" setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import useScreenType from '@/composables/useScreenType'

const { isMobile } = useScreenType()
const form = reactive({
  email: '',
  fullName: ''
})
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">
      Selamat Datang Kembali <br v-if="!isMobile" />
      Sahabat<span class="tw-text-primary"> Solusiku</span>
    </h1>
    <p class="tw-text-neutral-desc">
      Silahkan masukan Email/No.Telepon akun Lender <br v-if="!isMobile" />
      yang sudah pernah terdaftar.
    </p>

    <div class="tw-flex tw-w-full tw-flex-col tw-gap-6">
      <InputField v-model="form.email" label="Email/No.Telepon" placeholder="Cth: Jhon Due" />
      <InputField v-model="form.fullName" label="Kata Sandi" placeholder="Cth: Jhon Due" />
      <RouterLink to="/forgot-password" class="tw-font-semibold tw-text-primary">
        Lupa Kata Sandi?
      </RouterLink>
    </div>

    <el-button round type="primary" size="large" style="width: 100%"> Masuk </el-button>
    <p class="tw-w-full tw-text-center">
      Belum Punya Akun?
      <RouterLink to="/registration" class="tw-font-semibold tw-text-primary"> Daftar </RouterLink>
    </p>
  </VerificationLayout>
</template>

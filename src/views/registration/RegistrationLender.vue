<script lang="ts" setup>
import { ref } from 'vue'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import InputField from '@/components/atoms/input/InputField.vue'

const selectedType = ref('perusahaan')
const fullName = ref('')

const typeUser = [
  {
    key: 'perusahaan',
    title: 'Perusahaan'
  },
  {
    key: 'pribadi',
    title: 'Pribadi'
  }
]

const handleSelectedType = (value: string) => {
  selectedType.value = value
}
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Registrasi Akun Lender</h1>
    <p class="tw-text-neutral-desc">
      Mohon lengkapi informasi dibawah ini dengan <br />
      baik dan benar.
    </p>

    <h5 class="tw-font-semibold">Daftar Sebagai</h5>
    <div class="tw-flex tw-gap-8">
      <button
        v-for="(item, i) in typeUser"
        :key="i"
        :class="[
          'tw-flex tw-max-w-[155px] tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-rounded-lg tw-px-10 tw-py-3 tw-shadow-medium-orange md:tw-max-w-[240px]',
          selectedType === item.key ? 'tw-border-2 tw-border-primary' : ''
        ]"
        @click="handleSelectedType(item.key)"
      >
        <h5>
          {{ item.title }}
        </h5>
      </button>
    </div>

    <el-divider style="margin: 0px" />

    <InputField v-model="fullName" label="Nama Lengkap Sesuai KTP" placeholder="Cth: Jhon Due" />
    <InputField v-model="fullName" label="Alamat Email" placeholder="Cth: namaanda@domain.com" />
    <InputField v-model="fullName" label="No. Hp/Telepon" placeholder="Cth: 8128 1234 5678" />
    <InputField v-model="fullName" label="Kata Sandi" placeholder="Masukan Kata Sandi" />
    <InputField
      v-model="fullName"
      label="Konfirmasi Kata Sandi"
      placeholder="Konfirmasi Kata Sandi"
    />

    <div class="tw-flex tw-gap-4">
      <el-checkbox size="large" />
      <p>
        Dengan mendaftar, Saya menyetujui Syarat dan Ketentuan serta Kebijakan Privasi dari
        Solusiku.
      </p>
    </div>
    <el-button round type="primary" size="large" style="width: 100%"> Daftar Sekarang </el-button>
  </VerificationLayout>
</template>

<script lang="ts" setup>
import IcBribe from '@/assets/icons/ic_bribe.svg'
import IcInvest from '@/assets/icons/ic_invest.svg'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedType = ref('Pemberi Dana')

const typeUser = [
  {
    key: 'Pemberi Dana',
    icon: IcInvest,
    title: 'Daftar Sebagai Pemberi Dana'
  },
  {
    key: 'Peminjam Dana',
    icon: IcBribe,
    title: 'Daftar Sebagai Peminjam Dana'
  }
]

const handleSelectedType = (value: string) => {
  selectedType.value = value
}

const handleRedirect = () => {
  if (selectedType.value === 'Pemberi Dana') {
    router.push({ name: 'register' })
  } else {
    router.push({ name: 'register-borrower' })
  }
}
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Pilih Jenis Akun</h1>
    <p>
      Silahkan pilih jenis akun yang tepat. <br />
      Pengguna hanya bisa memiliki satu jenis akun.
    </p>

    <div class="tw-flex tw-gap-8">
      <button
        v-for="(item, i) in typeUser"
        :key="i"
        :class="[
          'tw-flex tw-max-w-[155px] tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-rounded-2xl tw-px-10 tw-py-8 tw-shadow-soft-red md:tw-max-w-[240px]',
          selectedType === item.key ? 'tw-border-2 tw-border-primary' : ''
        ]"
        @click="handleSelectedType(item.key)"
      >
        <img :src="item.icon" />
        <h5>
          {{ item.title }}
        </h5>
      </button>
    </div>

    <el-button round type="primary" size="large" style="width: 100%" @click="handleRedirect">
      Daftar Sebagai {{ selectedType }}
    </el-button>
  </VerificationLayout>
</template>

<script lang="ts" setup>
import IcReceiptLight from '@/assets/icons/ic_receipt_light.svg'
import IcSafetyLight from '@/assets/icons/ic_safety_light.svg'
import IcThunderboltLight from '@/assets/icons/ic_thunderbolt_light.svg'
import IcWalletLight from '@/assets/icons/ic_wallet_light.svg'
import LogoAfpi from '@/assets/images/logo_afpi.svg'
import LogoAsosiasiFintechGreen from '@/assets/images/logo_asosiasi_fintech_green.svg'
import LogoIso27001 from '@/assets/images/logo_iso_27001.svg'
import LogoSolusikuLight from '@/assets/images/logo_solusiku_light.svg'
import ParticleDot from '@/assets/particles/particle_dot.svg'
import ParticleWay from '@/assets/particles/particle_way.svg'

const reasonData = [
  {
    icon: IcThunderboltLight,
    title: 'Pencairan Cepat',
    desc: 'Proses pencairan tidak melebihi dari 48 jam.'
  },
  {
    icon: IcReceiptLight,
    title: 'Bunga Rendah',
    desc: 'Dapatkan penawaran bunga terendah di sini.'
  },
  {
    icon: IcSafetyLight,
    title: 'Aman',
    desc: 'Bersertifikasi ISO 27001: 2013.'
  },
  {
    icon: IcWalletLight,
    title: 'Pembayaran Mudah',
    desc: 'Tersedia berbagai jenis metode pembayaran.'
  }
]
</script>

<template>
  <div
    class="tw-relative tw-bg-[linear-gradient(157.87deg,#FB7B4A_-25.28%,#DE4F3F_94.25%)] tw-px-20 tw-py-10"
  >
    <div class="tw-flex tw-max-w-[600px] tw-flex-col tw-gap-6">
      <img :src="ParticleWay" class="tw-absolute tw-right-0 tw-top-2" />
      <img :src="ParticleDot" class="tw-absolute tw-bottom-2 tw-left-2" />

      <img :src="LogoSolusikuLight" :width="146" :height="30" />

      <h1 class="tw-text-3xl tw-font-semibold tw-text-white">
        Alasan Kenapa Anda Harus Memilih SOLUSIKU?
      </h1>

      <div class="tw-z-10 tw-flex tw-flex-col tw-gap-6">
        <div
          v-for="(item, i) in reasonData"
          :key="i"
          :class="['tw-flex', i % 2 === 0 ? 'tw-justify-start' : 'tw-justify-end']"
        >
          <div
            class="tw-flex tw-h-[111px] tw-w-[430px] tw-items-center tw-gap-4 tw-rounded-xl tw-bg-white tw-px-5 tw-py-2"
          >
            <div>
              <div
                class="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary tw-p-2"
              >
                <img :src="item.icon" :width="40" :height="40" alt="icon" />
              </div>
            </div>

            <div>
              <h1 class="tw-text-2xl tw-font-semibold tw-text-primary">{{ item.title }}</h1>
              <p class="tw-text-base">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-flex tw-items-center tw-gap-4 tw-rounded-r-full tw-bg-white tw-px-4 tw-py-3"
      >
        <h5 class="tw-text-[8px] tw-font-semibold">
          Solusiku Berizin dan Diawasi oleh <br />
          Otoritas Jasa Keuangan (OJK)
        </h5>
        <img alt="Logo AFPI" :src="LogoAfpi" :width="122" :height="32" />
        <img alt="Logo Asosiasi Fintech" :src="LogoAsosiasiFintechGreen" :width="28" :height="32" />
        <img alt="Logo ISO 27001" :src="LogoIso27001" :width="32" :height="32" />
      </div>
    </div>
  </div>
</template>

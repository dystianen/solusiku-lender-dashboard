<script lang="ts" setup>
import LogoAdvance from '@/assets/images/logo_advance.svg'
import LogoAlfamart from '@/assets/images/logo_alfamart.svg'
import LogoBca from '@/assets/images/logo_bca.svg'
import LogoBni from '@/assets/images/logo_bni.svg'
import LogoBrankas from '@/assets/images/logo_brankas.svg'
import LogoIndomaret from '@/assets/images/logo_indomaret.svg'
import LogoInstamoney from '@/assets/images/logo_instamoney.svg'
import LogoIntraAsia from '@/assets/images/logo_intra_asia.svg'
import LogoOcbc from '@/assets/images/logo_ocbc.svg'
import LogoSampoerna from '@/assets/images/logo_sampoerna.svg'
const data = [
  LogoAdvance,
  LogoAlfamart,
  LogoBca,
  LogoBni,
  LogoBrankas,
  LogoSampoerna,
  LogoIndomaret,
  LogoInstamoney,
  LogoIntraAsia,
  LogoOcbc
]
</script>

<template>
  <div class="tw-section">
    <TitleSection title="Mitra & Asosiasi" />

    <div class="tw-mt-20 tw-grid tw-w-full tw-grid-cols-5 tw-justify-center tw-gap-12">
      <div v-for="(item, i) in data" :key="i" :span="5">
        <div class="tw-flex tw-items-center tw-justify-center">
          <img alt="Vue logo" :src="item" :width="200" :height="50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MockupCTA from '@/assets/images/mockup_cta.png'
import MockupCTAMobile from '@/assets/images/mockup_cta_mobile.png'
import Barcode from '@/assets/images/barcode_solusiku.svg'
import LogoGooglePlay from '@/assets/images/logo_google_play.svg'
import LogoAppStore from '@/assets/images/logo_app_store.svg'
import useScreenType from '@/composables/useScreenType'

const { isMobile } = useScreenType()
</script>

<template>
  <Card
    class="tw-flex tw-flex-col-reverse tw-items-center tw-gap-8 !tw-p-0 lg:tw-flex-row"
    :style="{
      background: isMobile
        ? 'linear-gradient(129.55deg, #FC6A00 9.01%, #FD403A 94.96%)'
        : 'linear-gradient(129.55deg, #fc6a00 9.01%, #fd403a 94.96%)'
    }"
  >
    <img
      :src="isMobile ? MockupCTAMobile : MockupCTA"
      :width="isMobile ? '100%' : 619"
      height="max-content"
    />

    <div
      class="tw-flex tw-h-full tw-flex-col tw-justify-center tw-gap-4 tw-p-5 tw-text-center tw-text-white lg:tw-text-left"
    >
      <h5 class="tw-text-2xl tw-font-bold md:tw-text-4xl lg:tw-text-[42px]">
        Unduh Aplikasi <br />
        Solusiku Sekarang!
      </h5>
      <p class="tw-text-xs lg:tw-text-sm">Ajukan Pinjaman dengan Bunga Rendah Mulai dari 0.26%</p>

      <div class="tw-flex tw-items-center tw-justify-center tw-gap-4 lg:tw-justify-start">
        <div class="tw-flex tw-flex-col tw-items-center">
          <p class="tw-text-[10px] lg:tw-text-sm">Scan Qr Code</p>

          <img :src="Barcode" :width="isMobile ? 87 : 111" />
        </div>

        <p>Atau</p>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.earnpay.solusiku&pcampaignid=web_share"
          >
            <img
              alt="Logo google play"
              class="logo"
              :src="LogoGooglePlay"
              :width="isMobile ? 136 : 173"
            />
          </a>
          <a target="_blank" href="https://apps.apple.com/us/app/solusiku/id1486755731">
            <img
              alt="Logo app store"
              class="logo"
              :src="LogoAppStore"
              :width="isMobile ? 136 : 173"
            />
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>

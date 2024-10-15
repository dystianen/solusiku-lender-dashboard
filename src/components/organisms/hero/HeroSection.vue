<script setup lang="ts">
import LogoOjk from '@/assets/images/logo_ojk.svg'
import LogoAfpi from '@/assets/images/logo_afpi.svg'
import HeroSolusiku from '@/assets/images/mockup_hero.png'
import LogoGooglePlay from '@/assets/images/logo_google_play.svg'
import LogoAppStore from '@/assets/images/logo_app_store.svg'
import BarcodeSolusiku from '@/assets/images/barcode_solusiku.svg'
import BgHeroClip from '@/assets/backgrounds/bg_hero_clip.svg'

import useScreenType from '@/composables/useScreenType'
const { isMobile } = useScreenType()
</script>

<template>
  <div class="tw-mt-32">
    <div class="tw-absolute -tw-top-14 tw-left-0 tw-z-0 tw-w-full">
      <img :src="BgHeroClip" alt="" width="100%" />
    </div>

    <el-row :gutter="20">
      <el-col :span="isMobile ? 24 : 12">
        <div class="tw-flex tw-flex-col tw-gap-6">
          <div class="tw-flex tw-items-center tw-gap-4">
            <p class="tw-text-xs">
              Berizin & <br />
              Diawasi:
            </p>
            <img alt="Logo OJK" class="logo" :src="LogoOjk" width="103" height="36" />
            <img alt="Logo AFPI" class="logo" :src="LogoAfpi" width="176" height="46" />
          </div>

          <h1 class="tw-text-[65px] tw-font-semibold tw-leading-[5rem]">
            <span class="tw-text-primary">Solusi</span> Untuk <br />
            UMKM Indonesia
          </h1>

          <p class="tw-mr-2">
            Memberikan langkah awal yang tepat untuk mengembangkan usaha Anda. Dengan kemudahan dan
            kepercayaan yang ditawarkan, kami menyediakan solusi keuangan yang efektif dan cepat.
          </p>

          <div class="tw-flex tw-gap-5">
            <a
              href="https://play.google.com/store/apps/details?id=com.earnpay.solusiku&pcampaignid=web_share"
            >
              <img
                alt="Logo google play"
                class="logo"
                :src="LogoGooglePlay"
                width="146.69"
                height="43.49"
              />
            </a>
            <a href="https://apps.apple.com/us/app/solusiku/id1486755731">
              <img
                alt="Logo app store"
                class="logo"
                :src="LogoAppStore"
                width="129.67"
                height="43.49"
              />
            </a>
          </div>

          <div class="tw-flex tw-items-center tw-gap-5">
            <img
              alt="Logo google play"
              class="logo"
              :src="BarcodeSolusiku"
              width="121"
              height="121"
            />

            <el-divider
              direction="vertical"
              style="height: 54px; border-color: #de4f3f; border-width: 1.2px"
            />

            <div class="tw-flex tw-flex-col tw-text-primary">
              <p class="tw-text-body-medium">atau</p>
              <p class="tw-text-[30px]">Scan QR</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="isMobile ? 24 : 12">
        <div class="-tw-right-10 tw-flex tw-justify-end tw-gap-5">
          <img :src="HeroSolusiku" :width="641" :height="614" alt="Hero Solusiku" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

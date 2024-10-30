<script lang="ts" setup>
import LogoAfpi from '@/assets/images/logo_afpi.svg'
import LogoAsosiasiFintechGreen from '@/assets/images/logo_asosiasi_fintech_green.svg'
import LogoIso27001 from '@/assets/images/logo_iso_27001.svg'
import ReasonRightSection from '@/components/organisms/reason/ReasonRightSection.vue'
import useScreenType from '@/composables/useScreenType'

const { isDesktop } = useScreenType()
</script>

<template>
  <div class="tw-grid tw-min-h-screen tw-grid-cols-1 lg:tw-grid-cols-2">
    <ReasonRightSection v-if="isDesktop" />

    <div
      class="tw-relative tw-flex tw-h-screen tw-flex-col tw-items-center tw-justify-between tw-gap-4 tw-overflow-x-auto tw-p-8 tw-text-left tw-max-w-full"
    >
      <div class="tw-relative tw-mt-8">
        <div class="tw-flex tw-max-w-[512px] tw-flex-col tw-items-start tw-justify-center tw-gap-6">
          <slot />
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-justify-between tw-gap-12">
        <div class="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-py-3 lg:tw-hidden">
          <h5 class="tw-text-[8px] tw-font-semibold">
            Solusiku Berizin dan Diawasi oleh <br />
            Otoritas Jasa Keuangan (OJK)
          </h5>
          <img alt="Logo AFPI" :src="LogoAfpi" :width="122" :height="32" />
          <img
            alt="Logo Asosiasi Fintech"
            :src="LogoAsosiasiFintechGreen"
            :width="28"
            :height="32"
          />
          <img alt="Logo ISO 27001" :src="LogoIso27001" :width="32" :height="32" />
        </div>

        <p class="tw-w-full tw-text-center tw-text-neutral-desc">
          &copy; 2023 Solusiku. All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

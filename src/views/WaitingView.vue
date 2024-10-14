<script lang="ts" setup>
import Waiting from '@/assets/images/waiting.png'
import useScreenType from '@/composables/useScreenType'

const { isMobile } = useScreenType()
</script>
<template>
  <div
    class="tw-shadow-highlight tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-14 tw-rounded-2xl tw-p-5 tw-text-center"
  >
    <div class="tw-flex tw-flex-col tw-gap-4">
      <h1 class="tw-text-2xl tw-font-bold tw-text-primary lg:tw-text-[42px]">
        Proses Verifikasi Data!
      </h1>
      <p>Mohon menunggu, saat ini informasi anda sedang dalam proses verifikasi.</p>
    </div>

    <img :src="Waiting" class="lg:tw-h-[315px] lg:tw-w-[682px]" />
    <p>
      Estimasi waktu yang dibutuhkan adalah: <br v-if="isMobile" />
      <span class="tw-text-primary">kurang lebih 20 Menit</span>
    </p>
  </div>
</template>

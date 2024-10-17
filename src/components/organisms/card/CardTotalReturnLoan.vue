<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import IcDownChart from '@/assets/icons/ic_down_chart.svg'
</script>

<template>
  <Card class="tw-flex tw-flex-col tw-justify-between tw-gap-4">
    <div class="tw-flex tw-items-center tw-gap-2">
      <img :src="IcDownChart" alt="IcDownChart" :width="40" :height="40" />
      <p class="tw-text-base tw-text-neutral-1/[.68]">Pembayaran Kembali Pinjaman Pokok</p>
    </div>

    <h3 class="md:tw-text-md lg:tw-text-md tw-text-base tw-font-semibold 2xl:tw-text-2xl">
      Rp 25.453.000
    </h3>
  </Card>
</template>

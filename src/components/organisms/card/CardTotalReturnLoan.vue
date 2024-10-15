<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import IcBarTarget from '@/assets/icons/ic_target_graphic.svg'
</script>

<template>
  <Card class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-gap-4">
      <img :src="IcBarTarget" alt="Icon Dolar" :width="40" :height="40" />
      <div class="tw-flex tw-w-full tw-flex-col tw-gap-2">
        <h3 class="tw-font-semibold">Progress</h3>
        <el-progress :percentage="80" status="success" :show-text="false" />
      </div>
    </div>

    <div>
      <h3 class="md:tw-text-md lg:tw-text-md tw-text-base 2xl:tw-text-lg">Rp 25.453.000</h3>
      <p class="tw-text-xs tw-text-neutral-1/[.68]">Pembayaran Kembali Pinjaman Pokok</p>
    </div>
  </Card>
</template>

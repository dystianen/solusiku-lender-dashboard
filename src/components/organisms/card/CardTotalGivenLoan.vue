<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import IcDolar from '@/assets/icons/ic_dolar.svg'
</script>

<template>
  <Card class="tw-flex tw-flex-col tw-gap-4">
    <img :src="IcDolar" alt="Icon Dolar" :width="40" :height="40" />

    <div>
      <h3 class="md:tw-text-md lg:tw-text-md tw-text-base 2xl:tw-text-lg">Rp 25.453.000</h3>
      <p class="tw-text-xs tw-text-neutral-1/[.68]">Total Pendanaan</p>
    </div>
  </Card>
</template>

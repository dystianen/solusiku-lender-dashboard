<script lang="ts" setup>
import SolusiCepat from '@/assets/images/solusi_cepat.png'
import ProductSolution from './ProductSolution.vue'

const list = [
  'Limit pinjaman mulai dari 600 ribu hingga 4 juta.',
  'Suku bunga yang sangat kompetitif, dimulai dari hanya 0,07%.',
  'Memberikan Anda waktu selama 90 hari untuk melunasi pinjaman.'
]
</script>
<template>
  <ProductSolution
    flex="row-reverse"
    :img="SolusiCepat"
    title="Cepat"
    desc="Solusi Cepat adalah solusi pinjaman terpercaya dan efisien untuk memenuhi kebutuhan
        finansial Anda dengan cepat dan tanpa ribet. Produk ini menawarkan batas limit pinjaman yang
        fleksibel."
    :list="list"
  />
</template>

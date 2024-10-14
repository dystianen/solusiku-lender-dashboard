<script lang="ts" setup>
import SolusiKawan from '@/assets/images/solusi_kawan.png'

const list = [
  'Limit pinjaman mulai dari 100 juta hingga 2 milliar.',
  'Suku bunga yang sangat kompetitif, dimulai dari hanya 0,07%.',
  'Memberikan Anda waktu selama 365 hari untuk melunasi pinjaman.'
]
</script>
<template>
  <ProductSolution
    :img="SolusiKawan"
    title="Kawan"
    desc="Solusi Kawan adalah produk pinjaman yang dapat diandalkan dan berdaya guna, dirancang khusus untuk memenuhi kebutuhan finansial Anda dengan batas limit yang luas."
    :list="list"
  />
</template>

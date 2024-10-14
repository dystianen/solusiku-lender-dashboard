<script lang="ts" setup>
import SolusiKini from '@/assets/images/solusi_kini.png'

const list = [
  'Limit pinjaman mulai dari 600 ribu hingga 1 juta.',
  'Suku bunga yang sangat bersahabat, dimulai dari hanya 0,07%.',
  'Memberikan jangka waktu pinjaman yang panjang, yaitu 60 hari.'
]
</script>
<template>
  <ProductSolution
    :img="SolusiKini"
    title="Kini"
    desc="Solusi Kini adalah produk pinjaman inovatif yang memungkinkan Anda mendapatkan dana tambahan dengan efisien serta menawarkan fleksibilitas yang sesuai dengan kebutuhan keuangan Anda."
    :list="list"
  />
</template>

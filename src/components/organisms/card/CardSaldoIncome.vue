<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'

const series = [
  {
    name: '',
    data: [11, 32, 20, 32, 34, 52, 41, 37, 49, 29, 49, 100]
  }
]

const chartOptions = {
  chart: {
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  fill: {
    colors: ['#72E128']
  }
  // tooltip: {
  //   x: {
  //     format: 'dd/MM/yy HH:mm'
  //   }
  // }
}
</script>

<template>
  <Card>
    <div class="tw-flex tw-justify-between">
      <h5 class="tw-text-xl tw-text-neutral-1/[.87]">Saldo Pendapatan</h5>
      <select></select>
    </div>

    <div class="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row">
      <div class="tw-flex tw-flex-col tw-gap-14">
        <div class="tw-flex tw-flex-col tw-gap-2">
          <p class="tw-text-xs tw-text-neutral-1/[.68]">Bulan ini</p>
          <h3 class="tw-truncate tw-text-base">Rp 25.453.000</h3>
          <el-tag type="success" style="width: max-content">+42%</el-tag>
          <p class="tw-truncate tw-text-xs tw-text-neutral-1/[.68]">Dari periode sebelumnya</p>
        </div>
        <div>
          <p class="tw-text-xs tw-text-neutral-1/[.68]">Bulan Lalu</p>
          <p class="tw-text-[16px] tw-font-semibold tw-text-neutral-1/[.87]">Rp 220.234.21</p>
        </div>
      </div>

      <div class="tw-w-full">
        <apexchart type="area" :options="chartOptions" :height="220" :series="series"></apexchart>
      </div>
    </div>
  </Card>
</template>

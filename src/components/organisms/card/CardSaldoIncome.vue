<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import filters from '@/helpers/filters'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  fundingOldAmount: {
    type: Number,
    default: 0
  },
  fundingCurrentAmount: {
    type: Number,
    default: 0
  },
  fundingPercentage: {
    type: Number,
    default: 0
  },
  months: {
    type: Array<Number>,
    default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  incomeRates: {
    type: Array<Number>,
    default: []
  }
})

const series = computed(() => [
  {
    data: props.incomeRates,
    name: 'Income Rate'
  }
])

const chartOptions = computed(() => ({
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
    categories: props.months
  },
  fill: {
    colors: ['#72E128']
  }
}))

const optionsFilter = reactive([
  { id: 'weekly', name: 'Mingguan' },
  { id: 'monthly', name: 'Bulanan' },
  { id: 'yearly', name: 'Tahunan' }
])
const selectedFilter = ref('monthly')
</script>

<template>
  <Card>
    <div class="tw-flex tw-justify-between">
      <h5 class="tw-text-xl tw-text-neutral-1/[.87]">Saldo Pendapatan</h5>
      <SelectField
        size="default"
        class="tw-w-32"
        placeholder="Select"
        v-model="selectedFilter"
        :options="optionsFilter"
      />
    </div>

    <div class="tw-mt-6 tw-flex tw-w-full tw-flex-grow tw-flex-col tw-gap-4 md:tw-flex-row">
      <div class="tw-flex tw-flex-col tw-gap-4 md:tw-gap-20">
        <div class="tw-flex tw-flex-col tw-gap-2">
          <p class="tw-text-neutral-1/[.68]">Bulan ini</p>
          <h3 class="tw-truncate tw-text-2xl tw-font-semibold">
            {{ filters.currency(fundingCurrentAmount) }}
          </h3>
          <el-tag type="success" style="width: max-content">+{{ fundingPercentage }}%</el-tag>
          <p class="tw-truncate tw-text-neutral-1/[.68]">Dari periode sebelumnya</p>
        </div>
        <div>
          <p class="tw-text-neutral-1/[.68]">Bulan Lalu</p>
          <p class="tw-text-xl tw-font-semibold tw-text-neutral-1/[.87]">
            {{ filters.currency(fundingOldAmount) }}
          </p>
        </div>
      </div>

      <div class="tw-relative tw-w-full tw-overflow-hidden">
        <apexchart
          type="area"
          :options="chartOptions"
          :height="250"
          :series="series"
          style="width: 100%"
        />
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import filters from '@/helpers/filters'
import calculatePercentage from '@/utils/calculate-percentage'

type TProduct = {
  productName: string
  paymentAmount: number
  totalAmount: number
}

defineProps({
  totalPaymentPrinciple: {
    type: Number,
    default: 0
  },
  totalPaymentRate: {
    type: Number,
    default: 0
  },
  products: {
    type: Array<TProduct>,
    default: () => []
  }
})

const colorList = ['#666CFF', '#72E128', '#FF4D49']
const renderColor = (index: number) => {
  return colorList[index % 3]
}
</script>

<template>
  <Card class="tw-flex tw-flex-col tw-gap-4">
    <h5 class="tw-text-xl tw-text-neutral-1/[.87]">
      Pembayaran Kembali <br />
      Pinjaman Pokok
    </h5>

    <h3 class="tw-text-2xl tw-font-semibold">{{ filters.currency(totalPaymentPrinciple) }}</h3>

    <div class="tw-flex tw-gap-2">
      <el-tag type="success">+{{ totalPaymentRate }}%</el-tag>
      <p class="tw-text-neutral-1/[.68]">Bulan ini</p>
    </div>

    <el-scrollbar :height="150">
      <div class="tw-flex tw-flex-col tw-gap-1" v-for="(item, i) in products" :key="i">
        <div class="tw-flex tw-justify-between">
          <h5 class="tw-text-base tw-font-semibold tw-text-neutral-1/[.87]">
            {{ item.productName }}
          </h5>
          <p class="tw-text-neutral-1/[.87]">{{ filters.currency(item.totalAmount) }}</p>
        </div>

        <el-progress
          :percentage="calculatePercentage(item.paymentAmount, item.totalAmount)"
          :stroke-width="8"
          :color="renderColor(i)"
          :show-text="false"
        />
      </div>
    </el-scrollbar>
  </Card>
</template>

<script setup lang="ts">
import useDashboard from '@/api/queries/dashboard/useDashboard'
import useRegistration from '@/api/queries/registration/useRegistration'
import IcBarChart from '@/assets/icons/ic_bar_chart.svg'
import IcDolar from '@/assets/icons/ic_dolar.svg'
import IcDownChart from '@/assets/icons/ic_down_chart.svg'
import IcPendanaan from '@/assets/icons/ic_pendanaan.svg'
import { computed } from 'vue'

// Queries
const { data: fundingCheck } = useRegistration.getFundingCheck()
const { data: dashboard } = useDashboard.getDashboard()

const summary = computed(() => [
  {
    icon: IcBarChart,
    title: 'Total Pendanaan',
    total: dashboard.value?.totalFunding
  },
  {
    icon: IcPendanaan,
    title: 'Pendanaan Aktif',
    total: dashboard.value?.totalActiveFunding
  },
  {
    icon: IcDolar,
    title: 'Total Biaya Pemberi Pinjaman',
    total: dashboard.value?.totalFeeLender
  },
  {
    icon: IcDownChart,
    title: 'Pembayaran Kembali Pinjaman Pokok',
    total: dashboard.value?.totalPaymentPrinciple
  }
])
</script>

<template>
  <template v-if="fundingCheck?.status === 'completed'">
    <div class="tw-flex tw-flex-col tw-gap-4">
      <div class="tw-col-span-4 lg:tw-col-span-2">
        <div class="tw-grid tw-grid-cols-2 tw-gap-4 lg:tw-grid-cols-4">
          <CardSummary
            v-for="(item, i) in summary"
            :key="i"
            :icon="item.icon"
            :title="item.title"
            :total="item.total"
          />
        </div>
      </div>

      <div v-if="dashboard" class="tw-row-span-2 tw-grid tw-grid-cols-4 tw-gap-4 lg:tw-grid-cols-5">
        <CardSaldoIncome
          class="tw-col-span-4 lg:tw-col-span-3"
          :fundingOldAmount="dashboard.income.fundingOldAmount"
          :fundingCurrentAmount="dashboard.income.fundingCurrentAmount"
          :fundingPercentage="dashboard.income.fundingPercentage"
          :incomeRates="dashboard.income.incomeRates"
          :months="dashboard.income.months"
        />
        <CardPrincipalLoan
          class="tw-col-span-4 lg:tw-col-span-2"
          :totalPaymentPrinciple="dashboard.payment.totalPaymentPrinciple"
          :totalPaymentRate="dashboard.payment.totalPaymentRate"
          :products="dashboard.payment.products"
        />
      </div>

      <TableFundingHistory :withTitle="true" />
    </div>
  </template>
  <template v-if="fundingCheck?.status === 'registered'">
    <RegistrationFundingIndividual v-if="fundingCheck?.userType === 'Pribadi'" />
    <RegistrationFundingInstitution v-if="fundingCheck?.userType === 'Perusahaan'" />
  </template>
  <template v-if="fundingCheck?.status === 'verified'">
    <WaitingApproval />
  </template>
</template>

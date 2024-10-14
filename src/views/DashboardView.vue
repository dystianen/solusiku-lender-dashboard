<script setup lang="ts">
import CardActiveFunding from '@/components/organisms/card/CardActiveFunding.vue'
import CardCongratulationsAchievment from '@/components/organisms/card/CardCongratulationsAchievement.vue'
import CardCongratulationsTarget from '@/components/organisms/card/CardCongratulationsTarget.vue'
import CardTotalFunding from '@/components/organisms/card/CardTotalFunding.vue'
import CardTotalReturnLoan from '@/components/organisms/card/CardTotalReturnLoan.vue'
import CardTotalGivenLoan from '@/components/organisms/card/CardTotalGivenLoan.vue'
import CardSaldoIncome from '@/components/organisms/card/CardSaldoIncome.vue'
import TableHistoryFunding from '@/components/organisms/table/TableHistoryFunding.vue'
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <div class="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
      <CardCongratulationsTarget />
      <CardCongratulationsAchievment />
    </div>

    <div class="tw-row-span-2 tw-grid tw-grid-cols-4 tw-gap-4 lg:tw-grid-cols-5">
      <div class="tw-col-span-4 lg:tw-col-span-2">
        <div class="tw-grid tw-grid-cols-2 tw-gap-4">
          <CardTotalGivenLoan />
          <CardActiveFunding />
          <CardTotalFunding />
          <CardTotalReturnLoan />
        </div>
      </div>
      <CardSaldoIncome class="tw-col-span-4 lg:tw-col-span-3" />
    </div>

    <Card>
      <h3 class="tw-text-xl tw-font-medium tw-text-neutral-1/[.87]">Riwayat Pendanaan</h3>
      <TableHistoryFunding />
    </Card>
  </div>
</template>

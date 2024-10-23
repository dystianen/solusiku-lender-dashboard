<script setup lang="ts">
import useOffering from '@/api/queries/offering/useOffering'
import useScreenType from '@/composables/useScreenType'
const { isMobile } = useScreenType()
const { data } = useOffering.getOffering()
</script>

<template>
  <Card>
    <div
      class="tw-mb-6 tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row"
    >
      <el-button size="large" class="tw-w-full md:tw-w-max" v-show="!isMobile">
        <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
      </el-button>
      <InputField placeholder="Search Borrower" v-show="isMobile" />

      <div
        class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-4 md:tw-w-max md:tw-flex-row"
      >
        <InputField placeholder="Search Borrower" v-show="!isMobile" />
        <el-button size="large" class="tw-w-full md:tw-w-max" v-show="isMobile">
          <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
        </el-button>
        <el-button type="primary" size="large" class="tw-w-full md:tw-w-max">PENDANAAN</el-button>
        <el-button type="success" size="large" class="tw-w-full md:tw-w-max">
          PENDANAAN (ASURANSI)
        </el-button>
      </div>
    </div>

    <el-table :data="data">
      <el-table-column type="selection" width="55" />
      <el-table-column label="AKSI" :width="98">
        <template #default>
          <el-button size="small" type="primary" round> Detail </el-button>
        </template>
      </el-table-column>
      <el-table-column property="produk_name" label="NAMA PRODUK" :width="175" />
      <el-table-column property="borrower_id" label="ID PEMINJAM" :width="175" />
      <el-table-column property="transaction_date" label="TANGGAL TRANSAKSI" :width="175" />
      <el-table-column property="loan_value" label="NO. Pengajuan" :width="175" />
      <el-table-column property="loan_period" label="TINGKAT RESIKO" :width="175" />
      <el-table-column property="loan_value" label="NILAI PINJAMAN" :width="175" />
      <el-table-column property="loan_period" label="PERIODE PINJAMAN" :width="175" />
      <el-table-column property="loan_tenor" label="TENOR PINJAMAN" :width="175" />
      <el-table-column property="status" label="STATUS" :width="175" />
    </el-table>

    <Pagination />
  </Card>
</template>

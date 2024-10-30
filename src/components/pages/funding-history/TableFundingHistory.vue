<script lang="ts" setup>
import useScreenType from '@/composables/useScreenType'
import { reactive } from 'vue'

const { isMobile } = useScreenType()

defineProps({
  withTitle: {
    type: Boolean,
    default: false
  }
})

const params = reactive({
  search: '',
  length: 5,
  start: 1
})

const handleChangePage = (value: number) => {
  params.start = value
}

const handleChangeLimit = (value: number) => {
  params.length = value
  params.start = 1
}

const tableData = [
  {
    produk_name: 'Solusi Kini',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    return_value: 'Rp 2.000.000',
    status: 'Aktif'
  },
  {
    produk_name: 'Solusi Cepat',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    return_value: 'Rp 2.000.000',
    status: 'Jatuh Tempo'
  },
  {
    produk_name: 'Solusi Cepat',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    return_value: 'Rp 2.000.000',
    status: 'WO'
  },
  {
    produk_name: 'Solusi Cepat',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    return_value: 'Rp 2.000.000',
    status: 'Restrukturisasi'
  },
  {
    produk_name: 'Solusi Cepat',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    return_value: 'Rp 2.000.000',
    status: 'Lunas'
  }
]
</script>

<template>
  <Card>
    <h3 v-if="withTitle" class="tw-text-xl tw-text-neutral-1/[.87]">Riwayat Pendanaan</h3>
    <div
      :class="`tw-mb-6 ${withTitle ? 'tw-mt-6' : ''} tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row`"
    >
      <el-button size="large" class="tw-w-full md:tw-w-max" v-show="!isMobile">
        <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
      </el-button>
      <InputField
        clearable
        v-model="params.search"
        placeholder="Cari produk, status"
        v-show="isMobile"
      />

      <div
        class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-4 md:tw-w-max md:tw-flex-row"
      >
        <InputField
          clearable
          v-model="params.search"
          placeholder="Cari produk, status"
          v-show="!isMobile"
        />
        <el-button size="large" class="tw-w-full md:tw-w-max" v-show="isMobile">
          <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
        </el-button>
        <el-button type="primary" class="tw-w-full md:tw-w-max" size="large"
          >HAPUS BUKU (WO)</el-button
        >
        <el-button type="success" class="tw-w-full md:tw-w-max" size="large"
          >RESTRUKTURISASI</el-button
        >
      </div>
    </div>

    <el-table :data="tableData">
      <el-table-column type="selection" :width="55" />
      <el-table-column property="produk_name" label="NAMA PRODUK" :width="175" />
      <el-table-column property="borrower_id" label="ID PEMINJAM" :width="175" />
      <el-table-column property="transaction_date" label="TANGGAL TRANSAKSI" :width="175" />
      <el-table-column property="loan_value" label="NILAI PINJAMAN" :width="175" />
      <el-table-column property="loan_period" label="PERIODE PINJAMAN" :width="175" />
      <el-table-column property="return_value" label="JUMLAH PENGEMBALIAN" :width="200" />
      <el-table-column property="status" label="STATUS" :width="175" />
    </el-table>

    <Pagination
      :totalData="tableData.length"
      :current-page="params.start"
      @update:rowsPerPage="handleChangeLimit"
      @update:currentPage="handleChangePage"
    />
  </Card>
</template>

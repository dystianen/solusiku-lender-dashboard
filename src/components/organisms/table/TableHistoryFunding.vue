<script lang="ts" setup>
const tableData = [
  {
    produk_name: 'Solusi Kini',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    loan_tenor: '3 Bulan',
    status: 'LUNAS'
  },
  {
    produk_name: 'Solusi Cepat',
    borrower_id: 'CDBT3Y24',
    transaction_date: '24 January 2024',
    loan_value: 'Rp 2.000.000',
    loan_period: '6 Periode',
    loan_tenor: '3 Bulan',
    status: 'BATAL'
  }
]
</script>

<template>
  <div class="tw-mb-2 tw-mt-6 tw-flex tw-justify-between">
    <el-button size="large">
      <v-icon name="md-fileupload-outlined" class="tw-mr-2" />
      EXPORT
    </el-button>

    <InputField placeholder="Cari produk, status" class="!tw-w-max" />
  </div>

  <el-table :data="tableData">
    <el-table-column type="selection" :width="55" />
    <el-table-column label="Aksi" :width="98">
      <template #default>
        <el-button size="small" type="primary" round> Detail </el-button>
      </template>
    </el-table-column>
    <el-table-column property="produk_name" label="NAMA PRODUK" :width="175" />
    <el-table-column property="borrower_id" label="ID PEMINJAM" :width="175" />
    <el-table-column property="transaction_date" label="TANGGAL TRANSAKSI" :width="175" />
    <el-table-column property="loan_value" label="NILAI PEMINJAM" :width="175" />
    <el-table-column property="loan_period" label="PERIODE PEMINJAM" :width="175" />
    <el-table-column property="loan_tenor" label="TENOR PEMINJAM" :width="175" />
    <el-table-column property="status" label="STATUS" :width="175" />
  </el-table>
</template>

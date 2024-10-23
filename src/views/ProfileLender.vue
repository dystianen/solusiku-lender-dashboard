<script lang="ts" setup>
import TableHistoryTopup from '@/components/organisms/table/TableHistoryTopup.vue'
import { ref } from 'vue'

const activeName = ref('riwayat_hidup')

const dataColumn2 = [
  {
    key: 'Lender ID',
    value: 'LEN01'
  },
  {
    key: 'Jenis Lender',
    value: 'Badan Hukum'
  },
  {
    key: 'No. Hp/Telepon',
    value: '(+62) 12345678'
  },
  {
    key: 'Email Address',
    value: 'wendy.wijaya@qitechcc.com'
  }
]

const dataColumn3 = [
  {
    key: 'Status Dokumen',
    value: 'Terverifikasi'
  },
  {
    key: 'Kependudukan Lender',
    value: 'Indonesia'
  },
  {
    key: 'Tanggal & Waktu Registrasi',
    value: '01/10/2020 - 09:30:02 WIB'
  },
  {
    key: 'Status Lender',
    value: 'Active'
  }
]
</script>

<template>
  <Card>
    <div class="tw-grid tw-grid-cols-5">
      <div class="tw-flex tw-gap-4">
        <el-avatar
          shape="square"
          :size="100"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
        <h3 class="tw-text-xl tw-text-neutral-1/[.87]">Seth Hallam</h3>
      </div>

      <div class="tw-col-span-2 tw-flex tw-flex-col tw-gap-2">
        <div v-for="(item, i) in dataColumn2" :key="i" class="tw-grid tw-grid-cols-3">
          <p class="tw-text-neutral-1/[.87]">{{ item.key }}</p>
          <p class="tw-col-span-2 tw-text-neutral-1/[.68]">: {{ item.value }}</p>
        </div>
      </div>

      <div class="tw-col-span-2 tw-flex tw-flex-col tw-gap-2">
        <div v-for="(item, i) in dataColumn3" :key="i" class="tw-grid tw-grid-cols-4">
          <p class="tw-col-span-2 tw-text-neutral-1/[.87]">{{ item.key }}</p>
          <p class="tw-col-span-2 tw-text-neutral-1/[.68]">: {{ item.value }}</p>
        </div>
      </div>
    </div>
  </Card>

  <Card class="tw-mt-6 !tw-px-4 !tw-pt-0">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="riwayat_hidup">
        <template #label>
          <span class="tw-flex tw-items-center tw-gap-1">
            <v-icon name="ri-history-fill" />
            <span>RIWAYAT TOPUP</span>
          </span>
        </template>

        <TableHistoryTopup />
      </el-tab-pane>
      <el-tab-pane name="riwayat_withdraw">
        <template #label>
          <span class="tw-flex tw-items-center tw-gap-1">
            <v-icon name="ri-database-2-fill" />
            <span>RIWAYAT WITHDRAW</span>
          </span>
        </template>

        RIWAYAT WITHDRAW
      </el-tab-pane>
    </el-tabs>
  </Card>
</template>

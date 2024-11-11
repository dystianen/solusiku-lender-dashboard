<script setup>
const column = [
  {
    label: 'ID Peminjam',
    value: 'CDBT3Y24'
  },
  {
    label: 'Nilai Pinjaman',
    value: 2000000
  },
  {
    label: 'ID Peminjam',
    value: 'CDBT3Y24'
  },
  {
    label: 'ID Peminjam',
    value: 'CDBT3Y24'
  },
  {
    label: 'ID Peminjam',
    value: 'CDBT3Y24'
  }
]
</script>

<template>
  <Card>
    <h3 class="tw-text-xl tw-text-neutral-1/[.87] tw-mb-4">Detail Restrukturisasi</h3>
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <el-card style="border-radius: 10px" shadow="never">
        <template #header>
          <h5 class="tw-text-neutral-1/[.87]">SKEMA PEMBAYARAN AWAL</h5>
        </template>
        <div v-for="(item, i) in 4" :key="item" class="tw-flex tw-flex-col tw-gap-0">
          <div class="tw-grid tw-grid-cols-2">
            <p class="tw-px-5 tw-py-5 tw-text-neutral-1/[.87]">{{ 'List item ' + item }}</p>
            <p class="tw-px-5 tw-py-5 tw-text-neutral-1/[.87]">{{ 'List item ' + item }}</p>
          </div>
          <el-divider v-if="i !== 3" class="!tw-m-0" />
        </div>
      </el-card>
      <el-card style="border-radius: 10px" shadow="never">
        <template #header>
          <h5 class="tw-text-mfjdhfjdlfkdfkddjfdfeutral-1/[.87]">SKEMA PEMBAYARAN AWAL</h5>
        </template>
        <div v-for="(item, i) in 4" :key="item" class="tw-flex tw-flex-col tw-gap-0">
          <div class="tw-grid tw-grid-cols-2">
            <p class="tw-px-5 tw-py-5 tw-text-neutral-1/[.87]">{{ 'List item ' + item }}</p>
            <p class="tw-px-5 tw-py-5 tw-text-neutral-1/[.87]">{{ 'List item ' + item }}</p>
          </div>
          <el-divider v-if="i !== 3" class="!tw-m-0" />
        </div>
      </el-card>
    </div>

    <div class="tw-flex tw-gap-4 tw-mt-4">
      <el-button type="primary" class="tw-w-full md:tw-w-max" size="large"> SETUJUI </el-button>
      <el-button plain class="outline tw-w-full md:tw-w-max" size="large"> TOLAK </el-button>
    </div>
  </Card>
</template>

<style scoped>
:deep(.ep-card__header) {
  text-align: center;
  background-color: #f5f5f7;
}
:deep(.ep-card__body) {
  padding: 0;
}
</style>

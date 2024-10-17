<script lang="ts" setup></script>

<template>
  <Card class="tw-flex tw-flex-col tw-gap-4">
    <h5 class="tw-text-lg tw-text-neutral-1/[.87]">
      Pembayaran Kembali <br />
      Pinjaman Pokok
    </h5>

    <h3 class="tw-text-2xl tw-font-semibold">Rp 25.453.000</h3>

    <div class="tw-flex tw-gap-2">
      <el-tag type="success">+42%</el-tag>
      <p class="tw-text-neutral-1/[.68]">Bulan ini</p>
    </div>

    <div class="tw-flex tw-flex-col tw-gap-1">
      <div class="tw-flex tw-justify-between">
        <h5 class="tw-text-base tw-font-semibold tw-text-neutral-1/[.87]">Solusi Kini</h5>
        <p class="tw-text-neutral-1/[.87]">Rp 24.453.000</p>
      </div>

      <el-progress :percentage="90" :stroke-width="8" color="#666CFF" :show-text="false" />
    </div>
    <div class="tw-flex tw-flex-col tw-gap-1">
      <div class="tw-flex tw-justify-between">
        <h5 class="tw-text-base tw-font-semibold tw-text-neutral-1/[.87]">Solusi Cepat</h5>
        <p class="tw-text-neutral-1/[.87]">Rp 24.453.000</p>
      </div>

      <el-progress :percentage="40" :stroke-width="8" color="#72E128" :show-text="false" />
    </div>
    <div class="tw-flex tw-flex-col tw-gap-1">
      <div class="tw-flex tw-justify-between">
        <h5 class="tw-text-base tw-font-semibold tw-text-neutral-1/[.87]">Solusi Kawan</h5>
        <p class="tw-text-neutral-1/[.87]">Rp 24.453.000</p>
      </div>

      <el-progress :percentage="70" :stroke-width="8" color="#FF4D49" :show-text="false" />
    </div>
  </Card>
</template>

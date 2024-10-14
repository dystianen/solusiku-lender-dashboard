<script lang="ts" setup>
const data = [
  {
    total: '148M+',
    desc: 'Total Pinjaman Sejak Didirikan'
  },
  {
    total: '68M+',
    desc: 'Total Pinjaman Tahun Ini'
  },
  {
    total: '16M+',
    desc: 'Total Outstanding Pinjaman'
  },
  {
    total: '70K+',
    desc: 'Total Peminjam Aktif'
  }
]
</script>

<template>
  <div
    class="tw-relative tw-z-10 tw-mt-16 tw-rounded-2xl tw-bg-gradient-to-b tw-from-primary-1 tw-to-primary-2 tw-p-8"
  >
    <div class="tw-flex tw-items-center tw-justify-between">
      <div class="tw-flex tw-flex-col tw-gap-4">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/images/logo_solusiku_light.svg"
          width="146"
          height="30"
        />
        <p class="tw-text-desc-regular tw-italic tw-text-white">
          Statistik Solusiku (Per Nov 2023)
        </p>
      </div>

      <div v-for="(d, i) in data" :key="i" class="tw-flex tw-items-center tw-gap-4">
        <el-divider direction="vertical" style="height: 103px" />
        <div class="tw-flex tw-flex-col tw-gap-2">
          <h5 class="tw-text-heading-2 tw-text-white">{{ d.total }}</h5>
          <p class="tw-w-36 tw-text-white">
            {{ d.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

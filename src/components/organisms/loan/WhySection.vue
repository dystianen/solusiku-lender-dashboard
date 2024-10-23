<script lang="ts" setup>
import IcAlarm from '@/assets/icons/ic_alarm.svg'
import IcCheque from '@/assets/icons/ic_cheque.svg'
import IcCircleOjk from '@/assets/icons/ic_circle_ojk.svg'
import IcFleksibel from '@/assets/icons/ic_search_dollar.svg'

const data = [
  {
    icon: IcFleksibel,
    title: 'Bunga Fleksibel',
    desc: 'Suku Bunga pinjaman disesuaikan dengan kemampuan Anda dan relatif lebih kompetitif dibandingkan alternatif pinjaman lain.'
  },
  {
    icon: IcCircleOjk,
    title: 'Diawasi Oleh OJK',
    desc: 'Kegiatan usaha yang dilakukan oleh Solusiku diatur oleh OJK. Kami memastikan untuk patuh terhadap Peraturan OJK Nomor 10/POJK.05/2022.'
  },
  {
    icon: IcAlarm,
    title: 'Persetujuan Cepat',
    desc: 'Kami memastikan bahwa proses survey, analisis dan penentuan resiko / suku bunga dijalankan dengan efisien dan efektif.'
  },
  {
    icon: IcCheque,
    title: 'Pengajuan Mudah',
    desc: 'Kami memastikan bahwa proses pengajuan pinjaman dapat dilakukan secara online dan dapat diselesaikan dalam waktu 8 menit saja.'
  }
]
</script>

<template>
  <div class="tw-section tw-mb-[150px]">
    <TitleSection
      title="Kenapa Meminjam di Solusiku"
      desc="Anda bisa mendapatkan banyak keuntungan yang akan membantu <br /> Anda mengembangkan bisnis Anda
      secara efektif."
    />

    <div class="tw-mt-10 tw-grid tw-max-w-[980px] tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2">
      <div
        v-for="(solution, i) in data"
        :key="i"
        class="tw-relative tw-rounded-3xl tw-shadow-soft-red"
      >
        <div class="tw-flex tw-flex-col tw-gap-4 tw-px-8 tw-py-7">
          <img :src="solution.icon" :width="80" :height="80" :alt="solution.title" />
          <h1 class="tw-mt-2 tw-text-2xl tw-font-semibold">{{ solution.title }}</h1>
          <p class="description">{{ solution.desc }}</p>
        </div>

        <div
          class="tw-absolute tw-bottom-0 tw-h-3 tw-w-full tw-rounded-b-3xl tw-bg-gradient-to-l tw-from-primary-1 tw-to-primary-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TitleSection from '@/components/organisms/title/TitleSection.vue'
import MockupDaftar from '@/assets/images/mockup_daftar.png'
import MockupAjukanPinjaman from '@/assets/images/mockup_ajukan_pinjaman.png'
import MockupTungguPersetujuan from '@/assets/images/mockup_tunggu_persetujuan.png'
import MockupTerimaDana from '@/assets/images/mockup_terima_dana.png'
import MockupKembalikanPinjaman from '@/assets/images/mockup_kembalikan_pinjaman.png'

const activeProcess = ref('Daftar')

const process = [
  {
    title: 'Daftar',
    desc: 'Download dan daftar sebagai peminjam dana di aplikasi Solusiku, serta lengkapi data diri Anda.',
    img: MockupDaftar
  },
  {
    title: 'Ajukan Pinjaman',
    desc: 'Setelah akun terdaftar dan terverifikasi, Anda bisa mengajukan pinjaman di Solusiku.',
    img: MockupAjukanPinjaman
  },
  {
    title: 'Tunggu Persetujuan',
    desc: 'Tunggu persetujuan dari Solusiku setelah Anda mengajukan pinjaman.',
    img: MockupTungguPersetujuan
  },
  {
    title: 'Terima Dana',
    desc: 'Setelah pengajuan pinjaman disetujui, dana akan ditransfer ke rekening bank Anda.',
    img: MockupTerimaDana
  },
  {
    title: 'Kembalikan Pinjaman',
    desc: 'Periksa tagihan anda melalui aplikasi dan bayar tepat waktu untuk meningkatkan kredit skor dan limit pinjaman Anda.',
    img: MockupKembalikanPinjaman
  }
]
const indexActive = computed(() => process.findIndex((item) => item.title === activeProcess.value))

const handleSelectedProcess = (value: string) => {
  activeProcess.value = value
}
</script>

<template>
  <div class="tw-section tw-mb-[150px]">
    <TitleSection
      title="Proses Pinjaman di Solusiku"
      desc="Nikmati mendaftar untuk pengajuan pinjaman yang mudah dan cepat"
    />

    <div class="tw-relative tw-ml-4 tw-grid tw-grid-cols-2 tw-items-center">
      <div>
        <div
          class="tw-absolute tw-inset-0 tw-left-[10px] tw-mt-4 tw-h-[calc(100%-8rem)] tw-w-1 tw-bg-border-stroke"
        />

        <div class="tw-flex tw-flex-col tw-gap-1">
          <div v-for="(item, i) in process" :key="i" class="tw-relative tw-mb-8 tw-flex tw-gap-6">
            <div>
              <div
                class="tw-mt-4 tw-h-6 tw-w-6 tw-rounded-full tw-border-4 tw-border-white tw-bg-gradient-to-l tw-from-primary-1 tw-to-primary-light tw-shadow-xl"
              />
            </div>
            <div
              :class="[
                'tw-flex tw-cursor-pointer tw-gap-2 tw-rounded-2xl tw-bg-gradient-to-r tw-px-6 tw-py-4',
                activeProcess === item.title
                  ? 'tw-from-primary-1 tw-to-primary-2 tw-text-white'
                  : ''
              ]"
              @click="handleSelectedProcess(item.title)"
            >
              <h5 class="tw-text-2xl tw-font-semibold tw-leading-none">{{ i + 1 }}.</h5>

              <div class="tw-flex tw-flex-col tw-gap-2">
                <h5 class="tw-text-2xl tw-font-semibold tw-leading-none">{{ item.title }}</h5>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img :src="process[indexActive].img" />
      </div>
    </div>
  </div>
</template>

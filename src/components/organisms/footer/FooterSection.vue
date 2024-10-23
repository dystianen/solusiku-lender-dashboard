<script lang="ts" setup>
import IcEmail from '@/assets/icons/ic_email.svg'
import IcFacebook from '@/assets/icons/ic_facebook.svg'
import IcInstagram from '@/assets/icons/ic_instagram.svg'
import IcLinkedln from '@/assets/icons/ic_linkedin.svg'
import IcPhone from '@/assets/icons/ic_phone.svg'
import IcTiktok from '@/assets/icons/ic_tiktok.svg'
import IcYoutube from '@/assets/icons/ic_youtube.svg'
import LogoAfpiWhite from '@/assets/images/logo_afpi_white.svg'
import LogoAsosiasiFintech from '@/assets/images/logo_asosiasi_fintech.svg'
import LogoIso27001 from '@/assets/images/logo_iso_27001.svg'
import LogoSolusiku from '@/assets/images/logo_solusiku_primary_white.svg'
import { RouterLink } from 'vue-router'

const footer = [
  {
    title: 'Perusahaan',
    list: [
      { label: 'Tentang Kami', href: '/tentang-kami' },
      { label: 'Kontak Kami', href: '/kontak-kami' },
      { label: 'Bantuan', href: '/bantuan' }
    ]
  },
  {
    title: 'Produk',
    list: [
      { label: 'Pinjaman Tunai', href: '/pinjaman-tunai' },
      { label: 'Pendanaan', href: '/pendanaan' }
    ]
  },
  {
    title: 'Lainnya',
    list: [{ label: 'Hapus Akun', href: '/hapus-akun' }]
  }
]
const sosmed = [
  { icon: IcFacebook, href: '' },
  { icon: IcInstagram, href: '' },
  { icon: IcLinkedln, href: '' },
  { icon: IcYoutube, href: '' },
  { icon: IcTiktok, href: '' }
]
</script>
<template>
  <div
    class="tw-layout tw-relative -tw-mb-32 tw-mt-20 tw-flex tw-flex-col tw-items-center tw-gap-1 tw-rounded-3xl tw-bg-wood-pattern tw-bg-cover tw-py-[71px] tw-text-white"
  >
    <h5 class="tw-text-3xl tw-font-semibold">Bergabung dengan ribuan pengguna Solusiku</h5>
    <p>Raih Kesusksesan dengan mengembangkan bisnis anda bersama solusiku</p>
    <div class="tw-mt-4 tw-flex tw-gap-2">
      <el-button
        round
        style="background-color: white; border-color: white; color: #de4f3f"
        size="large"
      >
        Unduh Aplikasi
      </el-button>
      <el-button round plain size="large" style="background: none" color="white">
        Hubungi Kami
      </el-button>
    </div>
  </div>
  <div class="tw-bg-dark tw-pb-12 tw-text-white">
    <div class="tw-layout">
      <div class="tw-mt-48 tw-grid tw-grid-cols-6 tw-gap-4">
        <div class="tw-col-span-2 tw-flex tw-flex-col tw-gap-6 tw-pr-10">
          <img alt="Logo Solusiku" class="logo" :src="LogoSolusiku" width="146" height="30" />
          <div class="tw-flex tw-flex-col tw-gap-1">
            <p>PT. Anugerah Digital Indonesia</p>
            <p class="tw-text-white/80">
              Cyber 2 Tower, Lantai 7D, Jl. HR, Rasuna Said Blok X-5 Kav. 13, Kel. Kuningan Timur,
              Kec. Setiabudi, Kota Adm. Jakarta Selatan, Prov. DKI Jakarta, 12950.
            </p>
          </div>
          <p class="tw-text-white/80">Senin-Minggu • 08:30-17:30 WIB</p>
        </div>

        <div v-for="(item, i) in footer" :key="i" class="tw-flex tw-flex-col tw-gap-6">
          <p>{{ item.title }}</p>
          <div
            v-for="list in item.list"
            :key="list.label"
            class="tw-flex tw-flex-col tw-gap-1 tw-text-white/80"
          >
            <RouterLink :to="list.href">{{ list.label }}</RouterLink>
          </div>
        </div>

        <div class="tw-flex tw-flex-col tw-gap-6">
          <p>Hubungi Kami</p>
          <div class="tw-flex tw-flex-col tw-gap-1">
            <a href="tel:02150928925" class="tw-flex tw-items-center tw-gap-2 tw-text-white/80">
              <img :src="IcPhone" :width="16" :height="16" alt="Ic Phone" />
              <p>021 5092 8925</p>
            </a>
            <a
              href="mailto:cs@solusi-ku.id"
              class="tw-flex tw-items-center tw-gap-2 tw-text-white/80"
            >
              <img :src="IcEmail" :width="16" :height="16" alt="Ic Email" />
              <p>cs@solusi-ku.id</p>
            </a>
          </div>
          <p>Follow</p>
          <div class="tw-flex tw-gap-4">
            <a v-for="(item, i) in sosmed" :key="i" :href="item.href">
              <img :src="item.icon" :width="24" :height="24" alt="Icon" />
            </a>
          </div>
        </div>
      </div>

      <el-divider />

      <p>Penafian</p>
      <ol class="tw-list-decimal tw-pl-4 tw-text-xs tw-leading-6 tw-text-white/80">
        <li>
          Layanan Pinjam Meminjam Berbasis Teknologi Informasi merupakan kesepakatan perdata antara
          Pemberi Pinjaman dengan Penerima Pinjaman, sehingga segala risiko yang timbul dari
          kesepakatan tersebut ditanggung sepenuhnya oleh masing-masing pihak.
        </li>

        <li>
          Pemberi Pinjaman bertanggung jawab penuh atas segala risiko pendanaan atas keterlambatan
          atau gagal bayar yang timbul akibat penggunaan layanan. Tidak ada entitas atau otoritas
          nasional yang bertanggung jawab atas risiko tersebut atau memberikan kompensasi atas
          kerugian atau akibat lain yang timbul sehubungan dengan hal ini dalam bentuk apa pun.
        </li>

        <li>
          Penyelenggara dengan persetujuan dari masing-masing Pengguna (Pemberi Pinjaman dan/atau
          Penerima Pinjaman) mengakses, memperoleh, menyimpan, mengelola dan/atau menggunakan data
          pribadi Pengguna ("Pemanfaatan Data") pada atau di dalam benda, perangkat elektronik
          (termasuk smartphone atau telepon seluler), perangkat keras (hardware) maupun lunak
          (software), dokumen elektronik, aplikasi atau sistem elektronik milik Pengguna atau yang
          dikuasai Pengguna, dengan memberitahukan tujuan, batasan dan mekanisme Pemanfaatan Data
          tersebut kepada Pengguna yang bersangkutan sebelum memperoleh persetujuan yang dimaksud
          sesuai dengan Undang - Undang Perlindungan Data Pribadi UU NO. 27 Tahun 2022.
        </li>

        <li>
          Pemberi Pinjaman yang belum memiliki pengetahuan dan pengalaman pinjam meminjam,
          disarankan untuk tidak menggunakan layanan ini.
        </li>

        <li>
          Penerima Pinjaman harus mempertimbangkan tingkat bunga pinjaman dan biaya lainnya sesuai
          dengan kemampuan dalam melunasi pinjaman.
        </li>

        <li>
          Segala kegiatan penipuan akan terekam secara digital di dunia maya dan berpotensi
          diinformasikan kepada masyarakat melalui media sosial serta dapat dijadikan sebagai alat
          bukti yang sah sesuai dengan peraturan perundang-undangan di bidang informasi dan
          transaksi elektronik yang berlaku dalam rangka penyelesaian sengketa dan penegakan hukum.
        </li>

        <li>
          Pengguna harus membaca dan memahami informasi ini sebelum membuat keputusan menjadi
          Pemberi Pinjaman atau Penerima Pinjaman.
        </li>

        <li>
          Pemerintah yaitu dalam hal ini Otoritas Jasa Keuangan, tidak bertanggung jawab atas setiap
          pelanggaran atau ketidakpatuhan oleh Pengguna, baik Pemberi Pinjaman maupun Penerima
          Pinjaman (baik karena kesengajaan atau kelalaian Pengguna) terhadap ketentuan peraturan
          perundang-undangan maupun kesepakatan atau perikatan antara Penyelenggara dengan Pemberi
          Pinjaman dan/atau Penerima Pinjaman.
        </li>

        <li>
          Setiap transaksi dan kegiatan pinjam meminjam atau pelaksanaan kesepakatan mengenai pinjam
          meminjam antara atau yang melibatkan Penyelenggara, Pemberi Pinjaman dan/atau Penerima
          Pinjaman wajib dilakukan melalui escrow account dan virtual account sebagaimana yang
          diwajibkan berdasarkan Peraturan Otoritas Jasa Keuangan Nomor 10/POJK.05/2022 tentang
          Layanan Pendanaan Bersama Berbasis Teknologi Informasi dan pelanggaran atau ketidakpatuhan
          terhadap ketentuan tersebut merupakan bukti telah terjadinya pelanggaran hukum oleh
          Penyelenggara sehingga Penyelenggara wajib menanggung ganti rugi yang diderita oleh
          masing-masing Pengguna sebagai akibat langsung dari pelanggaran hukum tersebut di atas
          tanpa mengurangi hak Pengguna yang menderita kerugian menurut Kitab Undang-Undang Hukum
          Perdata.
        </li>
      </ol>

      <el-divider />

      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-flex tw-gap-4">
          <p>
            Solusiku Berizin dan Diawasi oleh <br />
            Otoritas Jasa Keuangan (OJK)
          </p>
          <img :src="LogoAfpiWhite" :width="90" :height="58" alt="Logo AFPI" />
          <img :src="LogoAsosiasiFintech" :width="46" :height="52" alt="Logo Asosiasi Fintech" />
          <img :src="LogoIso27001" :width="52" :height="52" alt="Logo Iso 27001" />
        </div>

        <p class="tw-text-desc-light tw-text-white/80">
          &copy; 2024 Solusiku. All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

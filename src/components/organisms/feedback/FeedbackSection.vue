<script lang="ts" setup>
import AlmaisonHaykal from '@/assets/images/almaison_haykal.png'
import EnyPurnawati from '@/assets/images/eny_purnawati.png'
import NovisaTeteh from '@/assets/images/novisa_teteh.png'
import FeedbackCard from '@/components/organisms/feedback/FeedbackCard.vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
const data = [
  {
    feedback:
      'Pengajuan cepat, 1 jam dah cair.. dapet limit 2 juta, cair 1.8. pembayaran sampai 3 bulan. Alhamdulillah ringan.. Mudah mudahan Solusiku konsisten dengan nasabah yang ...',
    img: EnyPurnawati,
    name: 'Eny Purnawati',
    position: 'Peminjam',
    rate: 5
  },
  {
    feedback:
      'Aplikasi bagus. asal data lengkap dan benar tidak ada 30 menit dana lsg cair ke rekening kita. Tenor jg panjang, potongan juga tidak besar. Mudah2an bisa bermanfaat bagi yg membutuhkan',
    img: AlmaisonHaykal,
    name: 'Almaison Haykal',
    position: 'Peminjam',
    rate: 5
  },
  {
    feedback:
      'Alhamdulillah di acc dan bener cicilan 3 bulan dari sekian aplikasi di tolak. Terimakasih Solusiku sudah membantu, smoga kedepannya makin jaya. Aamiin',
    img: NovisaTeteh,
    name: 'Novisa Teteh',
    position: 'Peminjam',
    rate: 5
  }
]
</script>

<template>
  <div class="tw-section tw-min-h-screen">
    <TitleSection
      title="Ulasan Pelanggan Kami"
      desc="Dengarkan suara mereka yang telah merasakan layanan kami dan temukan bagaimana pengalaman
      mereka membentuk perjalanan kami menuju pelayanan yang lebih baik."
    />

    <div class="tw-block tw-w-full">
      <Carousel :items-to-show="3" :wrap-around="true" :transition="500">
        <Slide v-for="(item, i) in data" :key="i">
          <FeedbackCard
            class="carousel__item"
            :feedback="item.feedback"
            :img="item.img"
            :name="item.name"
            :position="item.position"
            :rate="item.rate"
          />
        </Slide>

        <template #addons>
          <Navigation>
            <template #prev>
              <el-button
                circle
                style="background-color: #de4f3f; border-color: #de4f3f; color: white"
              >
                <v-icon name="fa-chevron-left" />
              </el-button>
            </template>
            <template #next>
              <el-button
                circle
                style="background-color: #de4f3f; border-color: #de4f3f; color: white"
              >
                <v-icon name="fa-chevron-right" />
              </el-button>
            </template>
          </Navigation>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
:deep(.carousel__viewport) {
  padding-top: 32px;
}
:deep(.carousel__slide) {
  padding: 24px;
}

:deep(.carousel__track) {
  transform-style: preserve-3d;
}

:deep(.carousel__slide--sliding) {
  transition: 0.5s;
}

:deep(.carousel__slide--active) {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

:deep(.carousel__prev) {
  left: -25px;
}

:deep(.carousel__next) {
  right: -25px;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import EventCard from '@/components/organisms/event/EventCard.vue'
import P2pLendingPangkalPinang from '@/assets/images/p2p_lending_pangkalpinang.png'
import Fineast from '@/assets/images/fineast.png'
import P2pLendingPekanBaru from '@/assets/images/p2p_lending_pekanbaru.png'

const data = [
  {
    img: P2pLendingPangkalPinang,
    title: 'Sosialisasi dan Inklusi Keuangan, Pangkal Pinang 29 Februari 2020',
    desc: 'Solusiku kembali mengadakan Sosialisasi dan Inklusi Keuangan, Fintech P2P Lending yang kali ini diadakan di Pangkal Pinang pada tanggal 29 Februari 2020.',
    date: '29 Feb 2020'
  },
  {
    img: Fineast,
    title: 'FINEAST, Kupang NTT, 27 Februari 2020.',
    desc: 'Solusiku ikut serata dan menyemarakan event sosialisasi yang diselenggarakan oleh AFPI dalam memberikan sosialisasi mengenai Fintech di Indonesia.',
    date: '27 Feb 2020'
  },
  {
    img: P2pLendingPekanBaru,
    title: 'Sosialisasi dan Inklusi Keuangan, Pekanbaru 24 Februari 2020.',
    desc: 'Solusiku kembali mengadakan Sosialisasi dengan topik "Social Investment", webinar Fintech P2P Lending kali ini diadakan online pada tanggal 24 Februari 2020.',
    date: '24 Feb 2020'
  }
]

const currentSlide = ref(1)
const itemsToShow = ref(3)
const totalSlide = data.length / itemsToShow.value

const next = () => {
  if (currentSlide.value < totalSlide) {
    currentSlide.value++
  }
}

const prev = () => {
  if (currentSlide.value > 1) {
    currentSlide.value--
  }
}
</script>

<template>
  <div class="tw-section">
    <TitleSection
      title="Acara Menarik dari Solusiku"
      desc="Bergabung dan ikuti acara menarik dari solusiku untuk komunitas <br /> & semua lapisan masyarakat"
    />

    <div class="tw-block tw-w-full">
      <Carousel
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="3"
        :wrap-around="true"
        :transition="500"
      >
        <Slide v-for="(item, i) in data" :key="i">
          <EventCard
            class="carousel__item"
            :img="item.img"
            :title="item.title"
            :desc="item.desc"
            :date="item.date"
          />
        </Slide>
      </Carousel>
    </div>

    <div class="tw-mr-8 tw-flex tw-w-full tw-items-center tw-justify-end tw-gap-4">
      <el-button circle @click="prev">
        <v-icon name="fa-chevron-left" />
      </el-button>
      <p class="tw-text-neutral-subtle">Sebelumnya</p>
      <div class="tw-flex">
        <el-button type="primary" circle>1</el-button>
      </div>
      <p class="tw-text-neutral-subtle">Setelahnya</p>
      <el-button circle @click="next">
        <v-icon name="fa-chevron-right" />
      </el-button>
    </div>
  </div>
</template>

<style scoped>
:deep(.carousel__viewport) {
  padding-top: 32px;
  padding-bottom: 32px;
}
</style>

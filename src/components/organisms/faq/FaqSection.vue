<script lang="ts" setup>
import CustomButton from '@/components/atoms/button/CustomButton.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeName = ref('Berapa bunga pinjaman di Solusiku?')
const activeButton = ref('Pinjaman')

const handleTabChange = (value: string) => {
  activeButton.value = value
}

const tab = ['Pinjaman', 'Pendanaan', 'Pengembalian', 'Aplikasi']

const data = [
  {
    title: 'Berapa bunga pinjaman di Solusiku?',
    desc: 'No Data'
  },
  {
    title: 'Berapakah jumlah limit dan tenor yang dapat saya ajukan di aplikasi Solusiku?',
    desc: 'No Data'
  },
  {
    title: 'Berapa lama proses pengajuan pinjaman pada aplikasi Solusiku?',
    desc: 'No Data'
  },
  {
    title: 'Mengapa pengajuan pinjaman saya ditolak?',
    desc: 'No Data'
  },
  {
    title: 'Berapa besar biaya admin di aplikasi Solusiku?',
    desc: 'No Data'
  }
]
</script>

<template>
  <div class="tw-section tw-pb-4">
    <TitleSection
      title="Pertanyaan yang Sering Diajukan"
      desc="Panduan produk kami yang sering kali menjadi pertanyaan pengguna."
    />

    <div class="tw-my-[50px] tw-flex tw-gap-4">
      <CustomButton
        v-for="item in tab"
        :key="item"
        :class="item === activeButton ? 'primary' : 'light'"
        class="!tw-w-[180px]"
        :label="item"
        @click="handleTabChange(item)"
      />
    </div>

    <div class="tw-rounded-3xl tw-px-8 tw-py-6 tw-shadow-soft-red">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item, i) in data" :key="i" :name="item.title">
          <template #title>
            <h5 class="tw-text-left tw-text-lg tw-font-semibold">{{ item.title }}</h5>
          </template>
          <p>{{ item.desc }}</p>
        </el-collapse-item>
      </el-collapse>

      <div class="tw-mt-4 tw-w-full tw-text-center">
        <RouterLink to="" class="tw-font-semibold tw-text-primary">Lihat lebih banyak</RouterLink>
      </div>
    </div>
  </div>
</template>

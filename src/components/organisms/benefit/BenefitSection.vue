<script lang="ts" setup>
import IcCalendar from '@/assets/icons/ic_calendar.svg'
import IcCurrentSolution from '@/assets/icons/ic_current_solution.svg'
import IcFriendSolution from '@/assets/icons/ic_friend_solution.svg'
import IcQuickSolution from '@/assets/icons/ic_quick_solution.svg'
import IcReceipt from '@/assets/icons/ic_receipt.svg'
import IcWalet from '@/assets/icons/ic_walet.svg'

const solutionData = [
  {
    icon: IcCurrentSolution,
    title: 'Solusi Kini',
    desc: 'Solusi Kini adalah produk pinjaman inovatif yang memungkinkan Anda mendapatkan dana tambahan den ...',
    list: ['Rp 600 Ribu – Rp 2 Juta', 'Mulai dari 0.07%', '60 Hari']
  },
  {
    icon: IcQuickSolution,
    title: 'Solusi Cepat',
    desc: 'Solusi Cepat adalah solusi pinjaman terpercaya dan efisien untuk memenuhi kebutuhan finansial And ...',
    list: ['Rp 600 Ribu – Rp 4 Juta', 'Mulai dari 0.07%', '90 Hari']
  },
  {
    icon: IcFriendSolution,
    title: 'Solusi Kawan',
    desc: 'Solusi Kawan adalah produk pinjaman yang dapat diandalkan dan berdaya guna, dirancang khus ...',
    list: ['Rp 100 Juta – Rp 2 Milliar', 'Mulai dari 0.07%', '120 - 365 Hari']
  }
]

const categoryData = [
  {
    icon: IcWalet,
    label: 'Limit Pinjaman'
  },
  {
    icon: IcReceipt,
    label: 'Bunga'
  },
  {
    icon: IcCalendar,
    label: 'Jangka Waktu'
  }
]
</script>

<template>
  <div class="tw-section">
    <TitleSection
      title="Dapatkan Banyak Keuntungan dari Solusiku"
      desc="Anda bisa mendapatkan banyak keuntungan dengan bergabung solusiku, yang akan membantu Anda
      mengembangkan bisnis Anda secara efektif."
    />

    <div class="tw-mt-12 tw-flex tw-w-full tw-justify-between tw-gap-8">
      <div v-for="(solution, i) in solutionData" :key="i" class="tw-rounded-3xl tw-shadow-soft-red">
        <div class="tw-px-8 tw-py-7">
          <el-image :src="solution.icon" style="width: 112px; height: 112px" />
          <h1 class="tw-text-[28px] tw-font-semibold">{{ solution.title }}</h1>
          <p class="description">{{ solution.desc }}</p>

          <el-divider />

          <div class="tw-flex tw-flex-col tw-gap-4">
            <div
              v-for="(list, i) in solution.list"
              :key="i"
              class="tw-flex tw-items-center tw-gap-4"
            >
              <div
                class="tw-flex tw-items-center tw-rounded-full tw-p-[10px] tw-shadow-subtle-gray"
              >
                <el-image :src="categoryData[i].icon" style="width: 24px; height: 24px" />
              </div>

              <div class="tw-flex tw-flex-col">
                <h1 class="tw-text-lg tw-text-primary">
                  {{ categoryData[i].label }}
                </h1>
                <p>{{ list }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tw-h-6 tw-rounded-b-3xl tw-bg-gradient-to-l tw-from-primary-1 tw-to-primary-2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LogoSolusiku from '@/assets/images/logo_solusiku.svg'
import IcCategory from '@/assets/icons/ic_category.svg'
import IcCategoryWhite from '@/assets/icons/ic_category_white.svg'
import IcChart from '@/assets/icons/ic_chart.svg'
import IcUser from '@/assets/icons/ic_user.svg'
import IcUserWhite from '@/assets/icons/ic_user_white.svg'
import IcNotif from '@/assets/icons/ic_notif.svg'
import IcNotifWhite from '@/assets/icons/ic_notif_white.svg'
import IcLogout from '@/assets/icons/ic_logout.svg'
import { removeAccessToken } from '@/cookies/accessToken'

const route = useRoute()
const router = useRouter()

const isSidebarOpen = ref(true)
const openMenuIndex = ref<number | null>(null)

const toggleSidbarMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleMenu = (index: number) => {
  if (openMenuIndex.value === index) {
    openMenuIndex.value = null // Close the menu if it's already open
  } else {
    openMenuIndex.value = index // Open the clicked menu
  }
}

const isMenuOpen = (index: number) => {
  return openMenuIndex.value === index
}

const menu = [
  {
    path: '/dashboard',
    icon: IcCategory,
    activeIcon: IcCategoryWhite,
    label: 'Dashboard'
  },
  {
    path: '',
    icon: IcChart,
    label: 'Management Pendanaan',
    children: [
      {
        path: '/funding-opportunities',
        label: 'Peluang Pendanaan'
      },
      {
        path: '/funding-history',
        label: 'Riwayat Pendanaan'
      },
      {
        path: '/payment-history',
        label: 'Riwayat Pembayaran'
      },
      {
        path: '/restructuring',
        label: 'Restrukturisasi'
      },
      {
        path: '/delete-book-wo',
        label: 'Hapus Buku (WO)'
      }
    ]
  },
  {
    path: '/account-setting',
    icon: IcUser,
    activeIcon: IcUserWhite,
    label: 'Pengaturan Akun'
  },
  {
    path: '/notification',
    icon: IcNotif,
    activeIcon: IcNotifWhite,
    label: 'Notifikasi'
  }
]

const isActiveMenu = (path: string) => {
  const currentPath = route.path
  const isActive = currentPath === path
  return isActive
}

const handleLogout = () => {
  removeAccessToken()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="tw-flex tw-h-screen tw-overflow-y-hidden tw-bg-white">
    <!-- Sidebar -->
    <aside
      class="tw-fixed tw-z-10 tw-flex tw-h-screen tw-w-[340px] tw-flex-shrink-0 tw-transform tw-flex-col tw-overflow-hidden tw-bg-white tw-p-4 tw-shadow-lg tw-transition-all lg:tw-static lg:tw-z-auto lg:tw-shadow-none"
      :class="{ '-tw-translate-x-full lg:tw-w-40 lg:tw-translate-x-0': !isSidebarOpen }"
    >
      <!-- sidebar header -->
      <div class="tw-flex tw-w-full tw-flex-shrink-0 tw-items-center tw-justify-between tw-p-2">
        <div class="tw-flex tw-items-center tw-gap-4">
          <img :src="LogoSolusiku" />
          <span :class="{ 'lg:tw-hidden': !isSidebarOpen }" class="tw-text-2xl tw-text-primary">
            SOLUSIKU
          </span>
        </div>

        <button
          class="tw-hidden tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring lg:tw-block"
          @click="toggleSidbarMenu()"
        >
          <svg
            class="tw-h-4 tw-w-4 tw-text-gray-600"
            :class="{ '-tw-rotate-180 tw-transform tw-transition-transform': isSidebarOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>

        <button class="tw-rounded-md lg:tw-hidden" @click="toggleSidbarMenu()">
          <svg
            class="tw-h-6 tw-w-6 tw-text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav class="tw-mt-6 tw-w-full tw-flex-1 tw-overflow-hidden hover:tw-overflow-y-auto">
        <ul class="tw-flex tw-w-full tw-flex-col tw-gap-6 tw-overflow-hidden tw-p-2">
          <li v-for="(item, i) in menu" :key="i" class="tw-w-full">
            <div>
              <component
                :is="item.path ? 'RouterLink' : 'div'"
                v-bind="item.path ? { to: item.path } : {}"
                class="tw-flex tw-cursor-pointer tw-items-center tw-space-x-2 tw-rounded-md tw-p-2 tw-text-neutral-desc"
                :class="[isSidebarOpen ? 'tw-w-full' : 'tw-w-max']"
                @click="toggleMenu(i)"
              >
                <img
                  v-if="item.icon"
                  :src="isActiveMenu(item.path) ? item.activeIcon : item.icon"
                  class="tw-fill-white tw-stroke-white"
                />
                <span :class="{ 'lg:tw-hidden': !isSidebarOpen }" class="tw-truncate tw-text-base">
                  {{ item.label }}
                </span>
                <span v-if="item.children" :class="{ 'lg:tw-hidden': !isSidebarOpen }">
                  <v-icon
                    :name="isMenuOpen(i) ? 'fa-chevron-up' : 'fa-chevron-down'"
                    color="grey"
                  />
                </span>
              </component>

              <!-- Children menu -->
              <ul v-if="item.children && isMenuOpen(i)" class="tw-ml-2 tw-mt-2 tw-w-full">
                <li v-for="(child, j) in item.children" :key="j">
                  <RouterLink
                    :to="child.path"
                    class="tw-flex tw-w-full tw-items-center tw-truncate tw-rounded-md tw-p-2 tw-text-base tw-text-neutral-desc"
                    :class="{ 'lg:tw-hidden': !isSidebarOpen }"
                  >
                    <span class="tw-mr-2 tw-text-2xl">•</span> {{ child.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="tw-flex tw-h-full tw-flex-1 tw-flex-col tw-overflow-hidden">
      <!-- Navbar -->
      <header class="tw-h-20 tw-flex-shrink-0 tw-p-6 lg:tw-pr-4">
        <div class="tw-hidden tw-h-full tw-items-center tw-justify-between lg:tw-flex">
          <!-- Desktop search box -->
          <div
            class="tw-hidden tw-items-center tw-pb-2 focus-within:tw-border-b focus-within:tw-border-primary md:tw-flex md:tw-gap-2"
          >
            <v-icon name="md-search" :scale="1.2" color="grey" />
            <input placeholder="Search (Ctrl+/)" class="focus:tw-outline-none" />
          </div>

          <div class="tw-hidden tw-items-center tw-gap-4 md:tw-flex">
            <button>
              <v-icon name="pr-moon" :scale="1.2" />
            </button>
            <button>
              <v-icon name="fa-regular-bell" :scale="1.2" />
            </button>
            <el-dropdown placement="bottom-end" trigger="click">
              <el-avatar
                :size="40"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">
                    <img :src="IcLogout" alt="IcLogout" class="tw-mr-2" /> Keluar
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <!-- HEADER MOBILE -->
        <div class="tw-flex tw-items-center tw-justify-between lg:tw-hidden">
          <div class="tw-flex tw-items-center tw-gap-4">
            <img :src="LogoSolusiku" />
            <span :class="{ 'lg:tw-hidden': !isSidebarOpen }" class="tw-text-2xl tw-text-primary">
              SOLUSIKU
            </span>
          </div>

          <button @click="toggleSidbarMenu()">
            <v-icon name="md-menu-round" :scale="1.5" />
          </button>
        </div>
      </header>

      <!-- Main content -->
      <main class="tw-max-h-full tw-flex-1 tw-overflow-hidden tw-overflow-y-scroll tw-p-5">
        <slot />
      </main>
    </div>
  </div>
</template>

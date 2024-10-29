<script lang="ts" setup>
import useRegistration from '@/api/queries/registration/useRegistration'
import IcCategory from '@/assets/icons/ic_category.svg'
import IcCategoryWhite from '@/assets/icons/ic_category_white.svg'
import IcChart from '@/assets/icons/ic_chart.svg'
import IcNotif from '@/assets/icons/ic_notif.svg'
import IcNotifWhite from '@/assets/icons/ic_notif_white.svg'
import IcUser from '@/assets/icons/ic_user.svg'
import IcUserWhite from '@/assets/icons/ic_user_white.svg'
import Avatar from '@/assets/images/avatar.svg'
import LogoSolusiku from '@/assets/images/logo_solusiku.svg'
import useOnlineStatus from '@/composables/useOnlineStatus'
import useScreenType from '@/composables/useScreenType'
import { removeAccessToken } from '@/cookies/accessToken'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { isDesktop } = useScreenType()
const isOpen = computed(() => isDesktop.value)
const isOnline = useOnlineStatus()

// Query
const { data: fundingCheck, refetch } = useRegistration.getFundingCheck()

const isSidebarOpen = ref(isOpen.value)
const openMenuIndex = reactive<{
  parent: number | null
  children: { [key: number]: number | null } // Allow numeric indexing for children
}>({
  parent: null,
  children: {} // Initialize as an empty object
})

const toggleSidebarMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleMenu = (parentIndex: number, path: string, hasChildren?: boolean) => {
  if (path && !isDesktop.value) {
    isSidebarOpen.value = false
  }

  if (hasChildren) {
    // Toggle hanya untuk menu yang memiliki anak
    openMenuIndex.parent = openMenuIndex.parent === parentIndex ? null : parentIndex
  }
}
const showAllMenu = computed(() => fundingCheck.value?.status === 'completed')

const menu = reactive([
  {
    path: '/dashboard',
    icon: IcCategory,
    activeIcon: IcCategoryWhite,
    label: 'Dashboard',
    isShow: true
  },
  {
    path: '',
    icon: IcChart,
    label: 'Management Pendanaan',
    isShow: showAllMenu,
    children: [
      {
        path: '/funding-management/funding-opportunities',
        label: 'Peluang Pendanaan'
      },
      {
        path: '/funding-management/funding-history',
        label: 'Riwayat Pendanaan'
      },
      {
        path: '/funding-management/payment-history',
        label: 'Riwayat Pembayaran'
      },
      {
        path: '/funding-management/restructuring',
        label: 'Restrukturisasi'
      },
      {
        path: '/funding-management/delete-book-wo',
        label: 'Hapus Buku (WO)'
      }
    ]
  },
  {
    path: '/account-setting',
    icon: IcUser,
    activeIcon: IcUserWhite,
    label: 'Pengaturan Akun',
    isShow: showAllMenu
  },
  {
    path: '/notification',
    icon: IcNotif,
    activeIcon: IcNotifWhite,
    label: 'Notifikasi',
    isShow: showAllMenu
  }
])

const isActiveMenu = (path: string) => {
  const currentPath = route.path
  const isActive = currentPath === path
  return isActive
}

const handleLogout = () => {
  removeAccessToken()
  router.push({ name: 'login' })
}

// Interval
let intervalId = ref<number | null>(null)

const startInterval = () => {
  intervalId.value = setInterval(refetch, 5000)
}

const clearRunningInterval = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

watch(
  () => fundingCheck.value?.status,
  (newStatus) => {
    if (newStatus === 'verified') {
      startInterval()
    } else {
      clearRunningInterval()
    }
  }
)

// Bersihkan interval ketika komponen di-destroy
onBeforeUnmount(() => {
  clearRunningInterval()
})

watch(isOpen, (newVal) => {
  isSidebarOpen.value = newVal
})
</script>

<template>
  <div class="tw-flex tw-h-screen tw-overflow-y-hidden tw-bg-white">
    <!-- Sidebar -->
    <aside
      class="tw-fixed tw-z-20 tw-flex tw-h-screen tw-w-full tw-mt-20 lg:tw-mt-4 md:tw-w-[340px] tw-flex-shrink-0 tw-transform tw-flex-col tw-bg-white tw-px-4 tw-shadow-lg tw-transition-all lg:tw-static lg:tw-z-auto lg:tw-shadow-none"
      :class="{ '-tw-translate-x-full lg:tw-w-40 lg:tw-translate-x-0': !isSidebarOpen }"
    >
      <!-- sidebar header -->
      <div
        v-if="isDesktop"
        class="tw-flex tw-w-full tw-flex-shrink-0 tw-items-center tw-justify-between tw-p-2 tw-z-10"
      >
        <div class="tw-flex tw-items-center tw-gap-4">
          <img :src="LogoSolusiku" />
          <span :class="{ 'lg:tw-hidden': !isSidebarOpen }" class="tw-text-2xl tw-text-primary">
            SOLUSIKU
          </span>
        </div>

        <button
          class="tw-hidden tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring lg:tw-block"
          @click="toggleSidebarMenu()"
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

        <button class="tw-rounded-md lg:tw-hidden" @click="toggleSidebarMenu()">
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
      <nav class="tw-mt-6 tw-w-full tw-flex-1">
        <div v-if="!isDesktop">
          <div class="tw-flex tw-gap-2 tw-ml-3">
            <el-badge
              is-dot
              type="primary"
              :offset="[-8, 35]"
              :color="isOnline ? '#72E128' : '#de4f3f'"
            >
              <el-avatar :size="40" :src="Avatar" />
            </el-badge>
            <div class="tw-flex-tw-flex-col">
              <h5 class="tw-text-neutral-1/[.87]">John Doe</h5>
              <p class="tw-text-neutral-1/[.38] tw-text-xs">
                {{ isOnline ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
          <el-divider style="margin: 16px 0" />
        </div>

        <ul
          class="tw-flex tw-w-full tw-flex-col tw-gap-6 tw-overflow-y-auto lg:tw-overflow-hidden tw-p-2 tw-pb-10 tw-max-h-[500px] md:tw-max-h-full"
        >
          <li v-for="(item, i) in menu" :key="i" class="tw-w-full">
            <div>
              <component
                v-if="item.isShow"
                :is="item.path ? 'RouterLink' : 'div'"
                v-bind="item.path ? { to: item.path } : {}"
                class="tw-flex tw-cursor-pointer tw-items-center tw-space-x-2 tw-rounded-md tw-p-2 tw-text-neutral-desc"
                :class="[isSidebarOpen ? 'tw-w-full' : 'tw-w-max']"
                @click="toggleMenu(i, item.path, !!item.children)"
              >
                <img
                  v-if="item.icon"
                  :src="isActiveMenu(item.path) ? item.activeIcon : item.icon"
                  class="tw-fill-white tw-stroke-white"
                />
                <span
                  :class="{ 'lg:tw-hidden': !isSidebarOpen }"
                  class="tw-truncate tw-text-sm lg:tw-text-base"
                >
                  {{ item.label }}
                </span>
                <span v-if="item.children" :class="{ 'lg:tw-hidden': !isSidebarOpen }">
                  <v-icon
                    :name="openMenuIndex.parent === i ? 'fa-chevron-up' : 'fa-chevron-down'"
                    color="grey"
                  />
                </span>
              </component>

              <!-- Menu Anak -->
              <div v-if="item.isShow">
                <ul
                  v-if="item.children && openMenuIndex.parent === i"
                  class="tw-ml-2 tw-mt-2 tw-w-full"
                >
                  <li v-for="(child, j) in item.children" :key="j">
                    <RouterLink
                      :to="child.path"
                      class="tw-flex tw-w-full tw-items-center tw-truncate tw-rounded-md tw-p-2 tw-text-sm lg:tw-text-base tw-text-neutral-desc"
                      :class="{ 'lg:tw-hidden': !isSidebarOpen }"
                      @click="toggleMenu(i, child.path)"
                    >
                      <span class="tw-mr-2 tw-text-2xl">•</span> {{ child.label }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <div v-if="!isDesktop">
            <el-divider style="margin: 0 0 24px" />
            <li
              class="tw-ml-3 tw-text-neutral-desc tw-cursor-pointer tw-flex tw-gap-1 tw-items-center"
              @click.prevent="handleLogout"
            >
              <v-icon name="md-logout" :scale="1.2" /> Keluar
            </li>
          </div>
        </ul>
      </nav>
    </aside>

    <div class="tw-flex tw-h-full tw-flex-1 tw-flex-col tw-overflow-hidden">
      <!-- Navbar -->
      <header class="tw-h-20 tw-flex-shrink-0 tw-p-6 lg:tw-pr-4 tw-border-b lg:tw-border-b-0">
        <div class="tw-hidden tw-h-full tw-items-center tw-justify-end lg:tw-flex">
          <div class="tw-hidden tw-items-center tw-gap-4 md:tw-flex">
            <div class="tw-flex-tw-flex-col tw-text-right">
              <h5 class="tw-text-neutral-1/[.87]">John Doe</h5>
              <p class="tw-text-neutral-1/[.38] tw-text-xs">
                {{ isOnline ? 'Online' : 'Offline' }}
              </p>
            </div>
            <el-dropdown placement="bottom-end" trigger="click" popper-class="tw-w-[200px]">
              <el-badge
                is-dot
                type="primary"
                :offset="[-8, 35]"
                :color="isOnline ? '#72E128' : '#de4f3f'"
              >
                <el-avatar :size="40" :src="Avatar" />
              </el-badge>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div class="tw-flex tw-gap-2">
                      <el-badge
                        is-dot
                        type="primary"
                        :offset="[-8, 35]"
                        :color="isOnline ? '#72E128' : '#de4f3f'"
                      >
                        <el-avatar :size="40" :src="Avatar" />
                      </el-badge>
                      <div class="tw-flex-tw-flex-col">
                        <h5 class="tw-text-neutral-1/[.87]">John Doe</h5>
                        <p class="tw-text-neutral-1/[.38] tw-text-xs">
                          {{ isOnline ? 'Online' : 'Offline' }}
                        </p>
                      </div>
                    </div>
                  </el-dropdown-item>

                  <el-dropdown-item @click="handleLogout">
                    <v-icon name="md-logout" class="tw-mr-[10px]" /> Keluar
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

          <button @click="toggleSidebarMenu()">
            <v-icon :name="isSidebarOpen ? 'md-close' : 'md-menu-round'" :scale="1.5" />
          </button>
        </div>
      </header>

      <!-- Main content -->
      <main class="tw-flex-1 tw-overflow-y-auto tw-flex tw-flex-col tw-justify-between tw-p-5">
        <div>
          <slot />
        </div>
        <footer class="tw-pt-6 tw-flex tw-justify-between tw-font-normal">
          <p class="tw-text-neutral-1/[.68]">
            &copy; 2024, Sistem Manajemen Pendanaan - PT. Anugerah Digital Indonesia.
          </p>

          <div class="tw-flex tw-gap-4 tw-pl-8 tw-text-primary tw-text-base">
            <router-link to="license">License</router-link>
            <router-link to="more-themes">More Themes</router-link>
            <router-link to="documentation">Documentation</router-link>
            <router-link to="support">Support</router-link>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
:deep(.ep-badge__content.is-dot) {
  width: 12px;
  height: 12px;
  border: 2px solid white;
}
</style>

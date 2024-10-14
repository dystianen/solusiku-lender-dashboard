<script lang="ts" setup>
import { computed, ref } from 'vue'
import LogoSolusiku from '@/assets/images/logo_solusiku_primary.svg'
import IcHelpCircle from '@/assets/icons/ic_help_circle.svg'
import IcFlagIDN from '@/assets/icons/ic_flag_idn.svg'
import IcFlagEng from '@/assets/icons/ic_flag_eng.svg'

const languages = [
  { icon: IcFlagIDN, label: 'Indonesia', value: 'IDN' },
  { icon: IcFlagEng, label: 'English', value: 'ENG' }
]

const drawer = ref(false)
const language = ref('IDN')
const flagIcon = computed(() => (language.value === 'IDN' ? IcFlagIDN : IcFlagEng))

const handleCommand = (command: string) => {
  language.value = command
}
</script>

<template>
  <div class="tw-layout tw-z-10 tw-flex tw-w-full tw-items-center tw-justify-between">
    <img alt="Logo Solusiku" :src="LogoSolusiku" :width="146" :height="30" />

    <nav class="tw-hidden tw-gap-5 tw-text-body-medium lg:tw-flex">
      <RouterLink to="/produk">Produk</RouterLink>
      <RouterLink to="/tentang-kami">Tentang Kami</RouterLink>
      <RouterLink to="/karir">Karir</RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/bantuan">Bantuan</RouterLink>
    </nav>

    <div class="tw-hidden tw-items-center tw-gap-4 sm:tw-flex">
      <div
        class="tw-flex tw-gap-2 tw-rounded-full tw-border-2 tw-border-solid tw-border-primary tw-px-[10px] tw-py-[5px] tw-text-primary"
      >
        TKB90: 99.00%

        <el-popover
          placement="bottom-end"
          :width="200"
          trigger="hover"
          content="Tingkat keberhasilan penyelenggara P2P Lending dalam memfasilitasi penyelesaian kewajiban pinjam meminjam dalam jangka waktu hingga 90 (sembilan puluh) hari sejak tanggal jatuh tempo."
          :show-arrow="false"
          popper-style="width: 446px; border-radius: 8px"
        >
          <template #reference>
            <button>
              <img :src="IcHelpCircle" alt="IcHelpCircle" />
            </button>
          </template>
        </el-popover>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="tw-flex tw-items-center tw-gap-1">
            <img :src="flagIcon" :width="24" :height="20" /> {{ language }}
          </div>
          <el-icon class="el-icon--right">
            <v-icon name="md-arrowdropdown-round" :scale="1.5" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(lang, i) in languages" :key="i" :command="lang.value">
              <div class="tw-flex tw-gap-2">
                <img :src="lang.icon" :width="24" :height="20" />
                {{ lang.label }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="tw-hidden lg:tw-block">
        <el-button
          type="primary"
          round
          size="large"
          style="background: linear-gradient(180deg, #ff6130 0%, #fd403a 100%)"
        >
          Masuk/Daftar
        </el-button>
      </div>
      <button class="tw-block lg:tw-hidden" @click="drawer = true">
        <v-icon name="md-menu-round" :scale="1.5" />
      </button>
    </div>

    <div class="tw-block sm:tw-hidden">
      <button @click="drawer = true">
        <v-icon name="md-menu-round" />
      </button>
    </div>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <img alt="Logo Solusiku" :src="LogoSolusiku" :width="146" :height="30" />
    </el-drawer>
  </div>
</template>

<style scoped>
:deep(.el-select .el-select__wrapper) {
  border-radius: 20px;
  color: red;
}

:deep(.el-dropdown-link) {
  display: flex;
}
</style>

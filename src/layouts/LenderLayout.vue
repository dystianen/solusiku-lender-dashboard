<script setup lang="ts">
import useScreenType from '@/composables/useScreenType'
import HeaderSection from '@/components/organisms/header/HeaderSection.vue'

const { isMobile } = useScreenType()
</script>

<template>
  <el-container>
    <el-header
      :height="isMobile ? '60px' : '90px'"
      class="tw-fixed tw-top-0 tw-z-20 tw-flex tw-items-center tw-bg-white"
      style="width: 100%; padding: 0"
    >
      <HeaderSection />
    </el-header>
    <el-main>
      <div class="tw-layout">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.ep-main {
  margin-top: 6rem;
  padding: 0;
}
</style>

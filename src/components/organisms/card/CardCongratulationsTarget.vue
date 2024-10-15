<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import Thropy from '@/assets/images/thropy.svg'
</script>

<template>
  <Card class="tw-flex tw-justify-between tw-gap-4">
    <div class="tw-flex tw-flex-col tw-justify-between tw-gap-4">
      <div>
        <h5 class="tw-text-xl tw-text-neutral-1/[.87]">
          Congratulations <span class="tw-font-bold">Norris!</span> 🎉
        </h5>
        <p class="tw-text-neutral-1/[.68]">Best seller of the month</p>
      </div>

      <div>
        <h3 class="tw-text-2xl tw-text-primary">$42.8k</h3>
        <p class="tw-text-neutral-1/[.68]">78% of target 🚀</p>
      </div>

      <el-button type="primary" style="width: max-content">View Sales</el-button>
    </div>

    <div class="tw-absolute tw-bottom-0 tw-left-[60%]">
      <img :src="Thropy" alt="Thropy" />
    </div>
  </Card>
</template>

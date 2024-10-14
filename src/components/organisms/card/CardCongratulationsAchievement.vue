<script setup lang="ts">
import Card from '@/components/atoms/card/Card.vue'
import AchievementPeople from '@/assets/images/achievement_people.svg'
</script>

<template>
  <Card class="tw-flex tw-justify-between">
    <div class="tw-flex tw-flex-col tw-justify-between tw-gap-4">
      <div>
        <h5 class="tw-text-xl tw-font-medium tw-text-neutral-1/[.87]">
          Congratulations <span class="tw-font-bold">John!</span> 🎉
        </h5>
        <p class="tw-text-neutral-1/[.68]">
          You have done 68% 😎 more sales today. <br />
          Check your new badge in your profile.
        </p>
      </div>

      <el-button
        type="primary"
        style="width: max-content"
        @click="$router.push({ name: 'profile-lender' })"
      >
        View Profile
      </el-button>
    </div>

    <div class="tw-absolute tw-bottom-0 tw-right-0">
      <img :src="AchievementPeople" alt="Achievement People" :width="250" />
    </div>
  </Card>
</template>

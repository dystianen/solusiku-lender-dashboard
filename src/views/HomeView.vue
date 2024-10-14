<script setup lang="ts">
import BenefitSection from '@/components/organisms/benefit/BenefitSection.vue'
import HeroSection from '@/components/organisms/hero/HeroSection.vue'
import ReasonSection from '@/components/organisms/reason/ReasonSection.vue'
import StatistikSection from '@/components/organisms/statistik/StatistikSection.vue'
import PartnerSection from '@/components/organisms/partner/PartnerSection.vue'
import FaqSection from '@/components/organisms/faq/FaqSection.vue'
import FeedbackSection from '@/components/organisms/feedback/FeedbackSection.vue'
</script>

<template>
  <div class="tw-layout">
    <HeroSection />
    <StatistikSection />
    <ReasonSection />
    <BenefitSection />
    <PartnerSection />
    <EventSection />
    <FaqSection />
    <FeedbackSection />
  </div>
</template>

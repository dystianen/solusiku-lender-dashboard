<script setup lang="ts">
import CTALoan from '@/components/organisms/cta/CTALoan.vue'
import FaqSection from '@/components/organisms/faq/FaqSection.vue'
import WhySection from '@/components/organisms/loan/WhySection.vue'
import SolusiCepat from '@/components/organisms/solution/SolusiCepat.vue'
import SolusiKawan from '@/components/organisms/solution/SolusiKawan.vue'
import SolusiKini from '@/components/organisms/solution/SolusiKini.vue'
import LoanProcess from '@/components/organisms/loan/LoanProcess.vue'
</script>

<template>
  <CTALoan />
  <div class="tw-layout">
    <WhySection />
    <SolusiKini />
    <SolusiCepat />
    <SolusiKawan />
    <LoanProcess />
    <FaqSection />
  </div>
</template>

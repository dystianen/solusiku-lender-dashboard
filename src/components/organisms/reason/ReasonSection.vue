<script lang="ts" setup>
import IcClock from '@/assets/icons/ic_clock.svg'
import IcEasyPayment from '@/assets/icons/ic_easy_payment.svg'
import IcLegal from '@/assets/icons/ic_legal.svg'
import IcReceipt from '@/assets/icons/ic_receipt.svg'
import IcSafety from '@/assets/icons/ic_safety.svg'
import IcThunderbolt from '@/assets/icons/ic_thunderbolt.svg'
import MockupReason from '@/assets/images/mockup_reason.png'

const reasonData = [
  {
    icon: IcThunderbolt,
    title: 'Pencairan Cepat',
    desc: 'Proses pencairan tidak melebihi dari 48 jam.'
  },
  {
    icon: IcLegal,
    title: 'Legal',
    desc: 'Berizin dan diawasi oleh OJK, AFPI dan terdaftar di Kominfo.'
  },
  {
    icon: IcReceipt,
    title: 'Bunga Rendah',
    desc: 'Dapatkan penawaran bunga terendah di sini.'
  },
  {
    icon: IcEasyPayment,
    title: 'Pembayaran Mudah',
    desc: 'Tersedia berbagai jenis metode pembayaran.'
  },
  {
    icon: IcSafety,
    title: 'Aman',
    desc: 'Bersertifikasi ISO 27001: 2013.'
  },
  {
    icon: IcClock,
    title: 'Beragam Durasi Pinjaman',
    desc: 'Dapatkan tenor pinjaman hingga 365 hari.'
  }
]
</script>

<template>
  <div class="tw-mt-[150px]">
    <el-row>
      <el-col :span="9">
        <img :src="MockupReason" :width="402" :height="530" alt="Mockup Reason" />
      </el-col>
      <el-col :span="15">
        <div class="tw-flex tw-flex-col">
          <h1 class="tw-mb-10 tw-text-display">
            Alasan Kenapa Anda Harus Memilih <span class="tw-text-primary">SOLUSIKU?</span>
          </h1>

          <el-row :gutter="32">
            <el-col v-for="(reason, i) in reasonData" :key="i" :span="12">
              <div class="tw-mb-8 tw-flex tw-gap-5">
                <div>
                  <div
                    class="tw-flex tw-items-center tw-rounded-full tw-p-[10px] tw-shadow-medium-orange"
                  >
                    <el-image :src="reason.icon" style="width: 39px; height: 39px" />
                  </div>
                </div>

                <div class="tw-flex tw-flex-col tw-gap-3">
                  <h5 class="tw-text-2xl tw-font-semibold tw-text-primary">{{ reason.title }}</h5>
                  <p class="tw-text-body-medium tw-text-neutral-desc">{{ reason.desc }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

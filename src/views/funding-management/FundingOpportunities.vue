<script setup lang="ts">
import useOffering from '@/api/queries/offering/useOffering'
import IcSuccessfull from '@/assets/icons/ic_successful.svg'
import InputField from '@/components/atoms/input/InputField.vue'
import SelectField from '@/components/atoms/select/SelectField.vue'
import useScreenType from '@/composables/useScreenType'
import filters from '@/helpers/filters'
import { useDebounce } from '@vueuse/core'
import { dayjs, ElMessage, ElTable } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
const { isMobile } = useScreenType()
const widthDialog = computed(() => (isMobile.value ? 360 : 550))

const offering = ref({
  data: [],
  totalCount: 0
})
const dialogFundingConfirm = ref(false)
const dialogOTP = ref(false)
const dialogFundingAgreement = ref(false)
const dialogFundingSuccessful = ref(false)
const isLoadingCheckOffering = ref(false)
const isLoadingCheckOfferingInsurance = ref(false)
const approvalId = ref('')
const transactionId = ref('')
const otpCode = ref('')
const agreementType = ref<'PERJANJIAN PENDANAAN' | 'PERJANJIAN LAYANAN PENDANAAN'>(
  'PERJANJIAN PENDANAAN'
)

const optionsAgreement = [
  { id: 'PERJANJIAN PENDANAAN', name: 'PERJANJIAN PENDANAAN' },
  { id: 'PERJANJIAN LAYANAN PENDANAAN', name: 'PERJANJIAN LAYANAN PENDANAAN' }
]
const isAgree = ref(false)

// Queries
const { mutate: mutateOffering } = useOffering.getOffering()
const { mutate: submitOffering, isPending: isLoadingOffering } = useOffering.postOfferingApproval()
const { mutate: submitOfferingInsurance, isPending: isLoadingOfferingInsurance } =
  useOffering.postOfferingApprovalInsurance()
const { mutate: cancelOffering } = useOffering.postCancelOfferingApproval()
const { mutate: checkOffering } = useOffering.getOfferringCheck()
const { mutate: OTPRequest, isPending: IsLoadingOTPRequest } = useOffering.postSigningOTPRequest()
const { mutate: OTPValidate, isPending: IsLoadingOTPValidate } =
  useOffering.postSigningOTPValidate()
const { mutate: serviceAgreement } = useOffering.getDocumentServiceAgreement()
const { mutate: loanAgreement } = useOffering.getDocumentLoanAgreement()

const params = reactive({
  search: '',
  length: 10,
  start: 1
})

const search = computed(() => params.search)
const debouncedSearch = useDebounce(search, 300)

const sourceAgreementPDF = ref([])
const sourceLoanPDF = ref([])
const totalDocs = ref(0)
const currentDoc = ref(1)
const sourcePdf = ref('')

const setSourcePdf = () => {
  const docs =
    agreementType.value === 'PERJANJIAN PENDANAAN' ? sourceAgreementPDF.value : sourceLoanPDF.value
  sourcePdf.value = docs[currentDoc.value - 1] || ''
}

const goToPrevFile = () => {
  if (currentDoc.value > 1) {
    currentDoc.value -= 1
    setSourcePdf()
  }
}

const goToNextFile = () => {
  if (currentDoc.value < totalDocs.value) {
    currentDoc.value += 1
    setSourcePdf()
  }
}

const handleLoanAgreement = () => {
  loanAgreement(approvalId.value, {
    onSuccess: (res) => {
      sourceAgreementPDF.value = res.docs
      totalDocs.value = res.docs.length
      currentDoc.value = 1
      setSourcePdf()
    },
    onError: (res: any) => {
      ElMessage.error(res.data.error)
    }
  })
}

watch(agreementType, (newValue) => {
  if (newValue === 'PERJANJIAN PENDANAAN') {
    handleLoanAgreement()
  } else {
    serviceAgreement(approvalId.value, {
      onSuccess: (res) => {
        sourceLoanPDF.value = res.docs
        totalDocs.value = res.docs.length
        currentDoc.value = 1
        setSourcePdf()
      }
    })
  }
})

watch(
  () => ({ length: params.length, start: params.start, search: debouncedSearch }), // Spread the params object to track changes
  (newParams) => {
    mutateOffering(
      {
        ...newParams,
        search: debouncedSearch.value // Use debounced search value
      },
      {
        onSuccess: (res) => {
          offering.value = res
        }
      }
    )
  },
  { deep: true } // Deep watch to track changes to nested properties
)

watch(debouncedSearch, () => {
  params.start = 1
})

onMounted(() => {
  mutateOffering(params, {
    onSuccess: (res) => {
      offering.value = res
    }
  })
})

onMounted(() => {
  checkOffering(undefined, {
    onSuccess: (res) => {
      if (res.isReady) {
        dialogFundingConfirm.value = true
        approvalId.value = res.approvalId
      }
    }
  })
})

const handleChangePage = (value: number) => {
  params.start = value
}

const handleChangeLimit = (value: number) => {
  params.length = value
  params.start = 1
}

const offeringIds = ref<string[]>([])
const handleSelection = (newSelection: any[]) => {
  offeringIds.value = newSelection.map((it) => it.id)
}

const handleSuccessFunding = () => {
  checkOffering()
  // Start interval to check the offering status
  const intervalId = setInterval(() => {
    checkOffering(undefined, {
      onSuccess: (res) => {
        if (res.isReady) {
          dialogFundingConfirm.value = true
          isLoadingCheckOffering.value = false
          isLoadingCheckOfferingInsurance.value = false
          approvalId.value = res.approvalId
          mutateOffering(params)
          clearInterval(intervalId)
        }
      }
    })
  }, 5000)
}

const handleClickFunding = (type: 'default' | 'insurance') => {
  if (type === 'default') {
    isLoadingCheckOffering.value = true
    submitOffering(
      { offeringIds: offeringIds.value },
      {
        onSuccess: handleSuccessFunding,
        onError: (res: any) => {
          ElMessage.error(res.data.error)
          isLoadingCheckOffering.value = false
        }
      }
    )
  } else {
    isLoadingCheckOfferingInsurance.value = true
    submitOfferingInsurance(
      { offeringIds: offeringIds.value },
      {
        onSuccess: handleSuccessFunding,
        onError: () => {
          isLoadingCheckOfferingInsurance.value = false
        }
      }
    )
  }
}

const handleFundNow = () => {
  dialogFundingConfirm.value = false
  dialogFundingAgreement.value = true
  handleLoanAgreement()
}

const handleSubmitAgreement = () => {
  const payload = {
    isAgree: isAgree.value,
    approvalId: approvalId.value
  }
  OTPRequest(payload, {
    onSuccess: (res) => {
      dialogFundingAgreement.value = false
      dialogOTP.value = true
      transactionId.value = res.transactionId
    },
    onError: (res: any) => {
      ElMessage.error(res.data.error)
    }
  })
}

const handleSubmitOTP = () => {
  const payload = {
    transactionId: transactionId.value,
    otpCode: otpCode.value
  }
  OTPValidate(payload, {
    onSuccess: () => {
      dialogOTP.value = false
      dialogFundingSuccessful.value = true
    },
    onError: (res: any) => {
      ElMessage.error(res.data.error)
    }
  })
}

const handleOpenPDF = () => {
  window.open(sourcePdf.value)
}

const handleCancelOffering = () => {
  dialogFundingConfirm.value = false
  dialogFundingAgreement.value = false
  dialogOTP.value = false
  cancelOffering(undefined, {
    onSuccess: () => mutateOffering(params),
    onError: (res: any) => {
      ElMessage.error(res.data.error)
    }
  })
}

const handleClosePopup = () => {
  dialogFundingSuccessful.value = false
  mutateOffering(params)
}

const tableRowClassName = ({ row }: { row: any }) => {
  if (offeringIds.value.includes(row.id)) {
    return 'selected-row'
  }
  return ''
}
</script>

<template>
  <Card>
    <div
      class="tw-mb-6 tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row"
    >
      <el-button size="large" class="tw-w-full md:tw-w-max" v-show="!isMobile">
        <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
      </el-button>
      <InputField clearable v-model="params.search" placeholder="Cari Peminjam" v-show="isMobile" />

      <div
        class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-4 md:tw-w-max md:tw-flex-row"
      >
        <InputField
          clearable
          v-model="params.search"
          placeholder="Cari Peminjam"
          v-show="!isMobile"
        />
        <el-button size="large" class="tw-w-full md:tw-w-max" v-show="isMobile">
          <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
        </el-button>
        <el-button
          type="primary"
          size="large"
          class="tw-w-full md:tw-w-max"
          :loading="isLoadingCheckOffering"
          :disabled="isLoadingOfferingInsurance"
          @click="handleClickFunding('default')"
        >
          PENDANAAN
        </el-button>
        <el-button
          type="success"
          size="large"
          class="tw-w-full md:tw-w-max"
          :loading="isLoadingCheckOfferingInsurance"
          :disabled="isLoadingOffering"
          @click="handleClickFunding('insurance')"
        >
          PENDANAAN (ASURANSI)
        </el-button>
      </div>
    </div>

    <el-table
      :data="offering.data"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelection"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="AKSI" :width="98">
        <template #default>
          <el-button size="small" type="primary" round> Detail </el-button>
        </template>
      </el-table-column>
      <el-table-column property="productName" label="NAMA PRODUK" :width="175" />
      <el-table-column label="ID PEMINJAM" :width="190">
        <template #default="scope">
          <p class="tw-text-primary">{{ scope.row.borrowerId }}</p>
        </template>
      </el-table-column>
      <el-table-column label="TANGGAL TRANSAKSI" :width="175">
        <template #default="scope">
          <p>{{ dayjs(scope.row.createdOn).format('DD MMMM YYYY') }}</p>
        </template>
      </el-table-column>
      <el-table-column property="applicationId" label="NO. PENGAJUAN" :width="190" />
      <el-table-column property="riskLevel" label="TINGKAT RESIKO" :width="175" />
      <el-table-column label="NILAI PINJAMAN" :width="175">
        <template #default="scope">
          <p>{{ filters.currency(Number(scope.row.amountRequested)) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="PERIODE PINJAMAN" :width="175">
        <template #default="scope">
          <p>{{ scope.row.loanPeriod }} Periode</p>
        </template>
      </el-table-column>
      <el-table-column label="TENOR PINJAMAN" :width="175">
        <template #default="scope">
          <p>{{ scope.row.loanTenor }} Bulan</p>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :totalData="Number(offering.totalCount)"
      :current-page="params.start"
      @update:rowsPerPage="handleChangeLimit"
      @update:currentPage="handleChangePage"
    />
  </Card>

  <!-- POPUP CONFIRMATION -->
  <el-dialog
    v-model="dialogFundingConfirm"
    :width="widthDialog"
    class="tw-text-center"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <h5 class="tw-text-2xl tw-text-neutral-1/[.87]">Konfirmasi Pendanaan</h5>
    <p class="tw-text-neutral-1/[.68]">
      Pastikan Anda telah memeriksa detail pendanaan sebelum melanjutkan. Apakah Anda yakin ingin
      melanjutkan proses ini?
    </p>
    <template #footer>
      <div class="tw-dialog-footer">
        <el-button
          size="large"
          type="primary"
          :loading="IsLoadingOTPRequest"
          @click="handleFundNow"
        >
          DANAI SEKARANG
        </el-button>
        <el-button size="large" @click="handleCancelOffering">BATAL</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- POPUP AGREEMENT -->
  <el-dialog
    v-model="dialogFundingAgreement"
    :width="isMobile ? 375 : 700"
    class="tw-text-center"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="tw-text-center tw-flex tw-flex-col tw-items-center tw-gap-6">
      <div>
        <h5 class="tw-text-2xl tw-text-neutral-1/[.87]">Perjanjian Pendanaan</h5>
        <p class="tw-text-neutral-1/[.68] tw-mt-2">
          Pastikan Anda memahami dan menyetujui semua syarat <br v-if="!isMobile" />
          dan ketentuan sebelum melanjutkan
        </p>
      </div>

      <el-radio-group v-model="agreementType" v-if="!isMobile" class="radio-group-full-width">
        <el-radio-button
          label="PERJANJIAN PENDANAAN"
          value="PERJANJIAN PENDANAAN"
          class="full-width-button"
        />
        <el-radio-button
          label="PERJANJIAN LAYANAN PENDANAAN"
          value="PERJANJIAN LAYANAN PENDANAAN"
          class="full-width-button"
        />
      </el-radio-group>
      <SelectField
        v-else
        v-model="agreementType"
        :options="optionsAgreement"
        size="default"
        style="width: 260px"
        placement="bottom"
      />

      <el-scrollbar :height="isMobile ? 200 : 300" always style="width: 100%">
        <div @click="handleOpenPDF" class="tw-cursor-pointer">
          <VuePdfEmbed :source="sourcePdf" />
        </div>
      </el-scrollbar>

      <div class="tw-text-left tw-w-full">
        <el-checkbox
          class="checkbox-agreement"
          v-model="isAgree"
          size="large"
          type="success"
          style="align-items: start"
        >
          <template #default>
            <p class="tw-leading-normal tw-text-neutral-desc tw-text-wrap tw-text-left">
              Saya mengerti dan menyetujui seluruh isi dari perjanjian pinjaman diatas.
            </p>
          </template>
        </el-checkbox>
      </div>
    </div>
    <template #footer>
      <div
        class="tw-flex tw-flex-col-reverse md:tw-flex-row tw-items-center tw-w-full md:tw-justify-between tw-mt-6 md:tw-mt-0 tw-gap-4"
      >
        <div class="tw-flex tw-w-full tw-flex-col md:tw-flex-row tw-justify-start tw-gap-4">
          <el-button
            size="large"
            type="primary"
            :loading="IsLoadingOTPRequest"
            :disabled="!isAgree"
            @click="handleSubmitAgreement"
          >
            TANDATANGANI KONTRAK
          </el-button>
          <el-button size="large" @click="handleCancelOffering">BATAL</el-button>
        </div>

        <div class="tw-flex tw-gap-2 tw-items-center tw-text-neutral-1/[.87]">
          <el-button link plain :disabled="currentDoc === 1" @click="goToPrevFile">
            <v-icon name="fa-chevron-left" />
          </el-button>
          <p class="tw-truncate">{{ currentDoc }} dari {{ totalDocs }}</p>
          <el-button link plain :disabled="currentDoc >= totalDocs" @click="goToNextFile">
            <v-icon name="fa-chevron-right" />
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>

  <!-- POPUP INPUT OTP -->
  <el-dialog
    v-model="dialogOTP"
    :width="widthDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="tw-text-center tw-flex tw-flex-col tw-gap-8">
      <div>
        <h5 class="tw-text-2xl tw-text-neutral-1/[.87]">Masukan Kode OTP</h5>
        <p class="tw-text-neutral-1/[.68]">
          Untuk memulai pendanaan, mohon masukan Kode OTP yang dikirim melalui pesan SMS di nomor
          ponsel yang terdaftar.
        </p>
      </div>
      <InputField v-model="otpCode" label="Kode OTP" placeholder="Masukan Kode OTP" />
    </div>
    <template #footer>
      <div class="tw-dialog-footer">
        <el-button
          size="large"
          type="primary"
          :loading="IsLoadingOTPValidate"
          :disabled="!otpCode"
          @click="handleSubmitOTP"
        >
          Selanjutnya
        </el-button>
        <el-button size="large" @click="handleCancelOffering">BATAL</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- POPUP FUNDING SUCCESSFUL -->
  <el-dialog
    v-model="dialogFundingSuccessful"
    :width="widthDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="tw-text-center tw-flex tw-flex-col tw-items-center tw-gap-8">
      <img :src="IcSuccessfull" :width="isMobile ? 122 : 172" :height="isMobile ? 122 : 172" />
      <div>
        <h5 class="tw-text-2xl tw-text-neutral-1/[.87]">
          Selamat! <br v-if="isMobile" />
          Pendanaan Berhasil
        </h5>
        <p class="tw-text-neutral-1/[.68] tw-mt-2">
          Selamat Anda telah berhasil melakukan pendanaan!
        </p>
      </div>
    </div>
    <template #footer>
      <div class="tw-dialog-footer">
        <el-button size="large" type="primary" @click="handleClosePopup"> TUTUP </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.ep-select__wrapper) {
  background: rgba(222, 79, 63, 0.15);
  border: 1px solid rgba(222, 79, 63, 0.5);
}
:deep(.ep-select__placeholder) {
  color: #de4f3f;
  font-size: 12px;
}

:deep(.ep-select__caret) {
  color: #de4f3f;
  font-size: 20px;
}

:deep(.checkbox-agreement .ep-checkbox__input.is-checked .ep-checkbox__inner) {
  background: #03ab6f;
  border-color: #03ab6f;
  border-radius: 5px;
}

:deep(.ep-radio-button__inner) {
  width: 100%;
}

:deep(.ep-radio-button__inner) {
  border: 1px solid rgba(222, 79, 63, 0.5) !important;
  color: #de4f3f;
}

:deep(.selected-row) {
  background-color: rgba(222, 79, 63, 0.15) !important;
}

.radio-group-full-width {
  display: flex;
  width: 90%;
}

.full-width-button {
  flex: 1; /* Makes each button take up an equal share of available space */
  text-align: center;
}
</style>

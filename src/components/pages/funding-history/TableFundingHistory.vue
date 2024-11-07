<script lang="ts" setup>
import useFunding from '@/api/queries/funding/useFunding'
import useScreenType from '@/composables/useScreenType'
import filters from '@/helpers/filters'
import type { TFundingHistory } from '@/types/funding'
import { useDebounce } from '@vueuse/core'
import { dayjs } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const { isMobile } = useScreenType()

defineProps({
  withTitle: {
    type: Boolean,
    default: false
  }
})

const params = reactive({
  search: '',
  length: 10,
  start: 1
})
const search = computed(() => params.search)
const debouncedSearch = useDebounce(search, 300)

const { mutate: mutateFundingHistory, isPending: isLoadingFundingHistory } =
  useFunding.getFundingHistory()
const fundingHistory = ref<{ data: TFundingHistory[]; totalCount: number }>({
  data: [],
  totalCount: 0
})

const handleFetchFundingHistory = () => {
  mutateFundingHistory(params, {
    onSuccess: (res) => {
      fundingHistory.value = res
    }
  })
}

watch(
  () => ({ length: params.length, start: params.start, search: debouncedSearch }),
  (newParams) => {
    mutateFundingHistory(
      {
        ...newParams,
        search: debouncedSearch.value
      },
      {
        onSuccess: (res) => {
          fundingHistory.value = res
        }
      }
    )
  },
  { deep: true }
)

onMounted(handleFetchFundingHistory)

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

const tableRowClassName = ({ row }: { row: any }) => {
  if (offeringIds.value.includes(row.id)) {
    return 'selected-row'
  }
  return ''
}

const renderColorTag = (status: string) => {
  let styles = {
    background: '',
    color: ''
  }

  if (status === 'Active') {
    styles = {
      background: '#FFF6E5',
      color: '#FDB528'
    }
  } else if (status === 'Overdue') {
    styles = {
      background: '#FFE4E4',
      color: '#FF4D49'
    }
  } else if (status === 'Closed (Write-Off)') {
    styles = {
      background: 'rgba(222, 79, 63, 0.15)',
      color: '#DE4F3F'
    }
  } else if (status === 'Closed (Restructured)') {
    styles = {
      background: '#E5F8FE',
      color: '#26C6F9'
    }
  } else if (status === 'Closed') {
    styles = {
      background: '#D9F2E9',
      color: '#03AB6F'
    }
  } else {
    styles = {
      background: '#FFF6E5',
      color: '#FDB528'
    }
  }

  return styles
}
</script>

<template>
  <Card>
    <h3 v-if="withTitle" class="tw-text-xl tw-text-neutral-1/[.87]">Riwayat Pendanaan</h3>
    <div
      :class="`tw-mb-6 ${withTitle ? 'tw-mt-6' : ''} tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row`"
    >
      <div class="tw-flex tw-gap-4 tw-w-full md:tw-w-max">
        <el-button size="large" class="tw-w-full md:tw-w-max" v-show="!isMobile">
          <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
        </el-button>
        <el-button
          size="large"
          class="tw-w-full md:tw-w-max"
          v-show="!isMobile"
          @click="handleFetchFundingHistory"
        >
          <v-icon
            name="md-refresh-sharp"
            class="tw-mr-2 tw-transition-transform"
            :class="{ 'tw-animate-spin': isLoadingFundingHistory }"
          />MUAT ULANG
        </el-button>
        <InputField
          clearable
          v-model="params.search"
          placeholder="Cari produk, status"
          v-show="isMobile"
        />
      </div>

      <div
        class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-4 md:tw-w-max md:tw-flex-row"
      >
        <InputField
          clearable
          v-model="params.search"
          placeholder="Cari produk, status"
          v-show="!isMobile"
        />
        <el-button size="large" class="tw-w-full md:tw-w-max" v-show="isMobile">
          <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
        </el-button>
        <el-button
          size="large"
          class="tw-w-full md:tw-w-max"
          v-show="isMobile"
          @click="handleFetchFundingHistory"
        >
          <v-icon
            name="md-refresh-sharp"
            class="tw-mr-2 tw-transition-transform"
            :class="{ 'tw-animate-spin': isLoadingFundingHistory }"
          />MUAT ULANG
        </el-button>
        <el-button type="primary" class="tw-w-full md:tw-w-max" size="large">
          HAPUS BUKU (WO)
        </el-button>
        <el-button type="success" class="tw-w-full md:tw-w-max" size="large">
          RESTRUKTURISASI
        </el-button>
      </div>
    </div>

    <el-table
      :data="fundingHistory.data"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelection"
      v-loading="isLoadingFundingHistory"
    >
      <el-table-column type="selection" :width="55" />
      <el-table-column property="productName" label="NAMA PRODUK" :min-width="160" />
      <el-table-column label="ID PEMINJAM" :min-width="150">
        <template #default="scope">
          <p class="tw-text-primary">{{ scope.row.borrowerIdSeq }}</p>
        </template>
      </el-table-column>
      <el-table-column label="TANGGAL TRANSAKSI" :min-width="175">
        <template #default="scope">
          {{ dayjs(scope.row.startOn).format('DD MMMM YYYY') }}
        </template>
      </el-table-column>
      <el-table-column label="NILAI PINJAMAN" :min-width="175" align="right">
        <template #default="scope">
          {{ filters.currency(Number(scope.row.amountPrinciple)) }}
        </template>
      </el-table-column>
      <el-table-column label="PERIODE PINJAMAN" :min-width="175">
        <template #default="scope"> {{ scope.row.termPeriod }} Periode </template>
      </el-table-column>
      <el-table-column label="JUMLAH PENGEMBALIAN" :min-width="200" align="right">
        <template #default="scope">
          {{ filters.currency(Number(scope.row.ownerLenderAmount)) }}
        </template>
      </el-table-column>
      <el-table-column label="STATUS" :min-width="210">
        <template #default="scope">
          <div
            class="tw-rounded-full tw-px-3 tw-py-1 tw-w-max"
            :style="renderColorTag(scope.row.loanStatusName)"
          >
            <p class="tw-text-xs">
              {{ scope.row.loanStatusName }}
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-if="Number(fundingHistory.totalCount) > 0"
      :totalData="Number(fundingHistory.totalCount)"
      :current-page="params.start"
      @update:rowsPerPage="handleChangeLimit"
      @update:currentPage="handleChangePage"
    />
  </Card>
</template>

<script lang="ts" setup>
import IcBarChart from '@/assets/icons/ic_bar_chart.svg'
import IcDolar from '@/assets/icons/ic_dolar.svg'
import IcDownChart from '@/assets/icons/ic_down_chart.svg'
import IcPendanaan from '@/assets/icons/ic_pendanaan.svg'
import useScreenType from '@/composables/useScreenType'
import filters from '@/helpers/filters'
import type { TFundingHistory } from '@/types/funding'
import { useDebounce } from '@vueuse/core'
import { dayjs } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const { isMobile } = useScreenType()

const params = reactive({
  search: '',
  length: 10,
  start: 1
})
const search = computed(() => params.search)
const debouncedSearch = useDebounce(search, 300)

const fundingHistory = ref<{ data: TFundingHistory[]; totalCount: number }>({
  data: [],
  totalCount: 0
})

const handleFetchFundingHistory = () => {}

watch(
  () => ({ length: params.length, start: params.start, search: debouncedSearch }),
  (newParams) => {},
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

const summary = computed(() => [
  {
    icon: IcPendanaan,
    title: 'Total Nilai Write-Off',
    total: 0
  },
  {
    icon: IcDolar,
    title: 'Jumlah Sisa Pembayaran',
    total: 0
  },
  {
    icon: IcBarChart,
    title: 'Total Pinjaman yang Ditutup',
    total: 0
  },
  {
    icon: IcDownChart,
    title: 'Total Persentase Gagal Bayar',
    total: 0,
    type: 'percentage'
  }
])
</script>

<template>
  <div class="tw-grid tw-grid-cols-2 tw-gap-4 lg:tw-grid-cols-4 tw-mb-4">
    <CardSummary
      v-for="(item, i) in summary"
      :key="i"
      :type="item.type"
      :icon="item.icon"
      :title="item.title"
      :total="item.total"
    />
  </div>
  <Card>
    <div
      class="tw-mb-6 tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row"
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
          <v-icon name="md-refresh-sharp" class="tw-mr-2 tw-transition-transform" />MUAT ULANG
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
          <v-icon name="md-refresh-sharp" class="tw-mr-2 tw-transition-transform" />MUAT ULANG
        </el-button>
      </div>
    </div>

    <el-table
      :data="fundingHistory.data"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelection"
    >
      <el-table-column type="selection" :width="55" />
      <el-table-column label="ID PEMINJAM" :min-width="120">
        <template #default="scope">
          <p class="tw-text-primary">{{ scope.row.borrowerIdSeq }}</p>
        </template>
      </el-table-column>
      <el-table-column label="NILAI PEMINJAM" :min-width="160">
        <template #default="scope">
          {{ filters.currency(Number(scope.row.amountPrinciple)) }}
        </template>
      </el-table-column>
      <el-table-column label="SISA PEMBAYARAN" :min-width="160">
        <template #default="scope">
          {{ filters.currency(Number(scope.row.amountPrinciple)) }}
        </template>
      </el-table-column>
      <el-table-column label="TANGGAL PENGAJUAN" :min-width="175">
        <template #default="scope">
          {{ dayjs(scope.row.startOn).format('DD MMMM YYYY') }}
        </template>
      </el-table-column>
      <el-table-column label="TANGGAL TERAKHIR PEMBAYARAN" :min-width="175">
        <template #default="scope">
          {{ dayjs(scope.row.startOn).format('DD MMMM YYYY') }}
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

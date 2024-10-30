<script lang="ts" setup>
import useScreenType from '@/composables/useScreenType'
import filters from '@/helpers/filters'
import { useDebounce } from '@vueuse/core'
import { dayjs } from 'element-plus'
import { computed, reactive, ref } from 'vue'

// Hooks
const { isMobile } = useScreenType()

const params = reactive({
  search: '',
  length: 5,
  start: 1
})

const search = computed(() => params.search)
const debouncedSearch = useDebounce(search, 300)

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
</script>

<template>
  <Card>
    <div
      class="tw-mb-6 tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row"
    >
      <el-button size="large" class="tw-w-full md:tw-w-max" v-show="!isMobile">
        <v-icon name="md-fileupload-outlined" class="tw-mr-2" />Export
      </el-button>
      <InputField
        clearable
        v-model="params.search"
        placeholder="Cari produk, status"
        v-show="isMobile"
      />

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
      </div>
    </div>

    <el-table :data="[]" :row-class-name="tableRowClassName" @selection-change="handleSelection">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID PEMINJAM" :width="190">
        <template #default="scope">
          <p class="tw-text-primary">{{ scope.row.borrowerId }}</p>
        </template>
      </el-table-column>
      <el-table-column label="TANGGAL PERMOHONAN" :width="200">
        <template #default="scope">
          <p>{{ dayjs(scope.row.createdOn).format('DD MMMM YYYY') }}</p>
        </template>
      </el-table-column>
      <el-table-column label="NILAI PINJAMAN" :width="200">
        <template #default="scope">
          <p>{{ filters.currency(Number(scope.row.amountRequested)) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="ALASAN RESTRUKTURISASI" :width="250" />
      <el-table-column label="TANGGAL KEPUTUSAN" :width="200">
        <template #default="scope">
          <p>{{ dayjs(scope.row.createdOn).format('DD MMMM YYYY') }}</p>
        </template>
      </el-table-column>
      <el-table-column label="STATUS" :width="200" />
    </el-table>

    <Pagination
      :totalData="0"
      :current-page="params.start"
      @update:rowsPerPage="handleChangeLimit"
      @update:currentPage="handleChangePage"
    />
  </Card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  totalData: {
    type: Number,
    default: 0
  },
  initialRowsPerPage: {
    type: Number,
    default: 10
  },
  rowsPerPageOptions: {
    type: Array<number>,
    default: () => [5, 10, 20, 50, 100]
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:rowsPerPage', 'update:currentPage'])

const rowsPerPage = ref(props.initialRowsPerPage)

// Watch the props to ensure the component updates when props change
watch(
  () => props.initialRowsPerPage,
  (newVal) => {
    rowsPerPage.value = newVal
  }
)

// Computed for total pages, startRow, and endRow
const totalPages = computed(() => Math.ceil(props.totalData / rowsPerPage.value))
const startRow = computed(() => (props.currentPage - 1) * rowsPerPage.value + 1)
const endRow = computed(() => Math.min(props.currentPage * rowsPerPage.value, props.totalData))

// Function to update rows per page
const setRowsPerPage = (value: number) => {
  rowsPerPage.value = value
  emit('update:rowsPerPage', value)
}

// Pagination functions
const goToPrevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<template>
  <div
    class="tw-mt-4 tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-items-center tw-justify-end tw-gap-6 tw-text-neutral-1/[.68]"
  >
    <!-- Rows Per Page Dropdown -->
    <div class="tw-flex tw-items-center tw-gap-4">
      <p class="tw-mb-1">Rows per page:</p>
      <el-dropdown placement="bottom" trigger="click">
        <div class="tw-flex tw-items-center tw-gap-2">
          <p>{{ rowsPerPage }}</p>
          <v-icon name="io-caret-down-sharp" color="lightgray" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(option, i) in props.rowsPerPageOptions"
              :key="i"
              @click="setRowsPerPage(option)"
            >
              {{ option }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="tw-flex tw-items-center tw-gap-6">
      <!-- Page Info -->
      <div>
        <p>{{ startRow }}-{{ endRow }} dari {{ totalData }}</p>
      </div>

      <!-- Pagination Controls -->
      <div class="tw-flex tw-gap-6">
        <el-button link plain :disabled="currentPage === 1" @click="goToPrevPage">
          <v-icon name="fa-chevron-left" />
        </el-button>
        <el-button link plain :disabled="currentPage >= totalPages" @click="goToNextPage">
          <v-icon name="fa-chevron-right" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ep-button.is-link:hover {
  color: grey !important;
}
</style>

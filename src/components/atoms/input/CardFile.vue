<script lang="ts" setup>
import type { TDocument } from '@/types/master'
import IcFile from '@/assets/icons/ic_file.svg'
import IcDelete from '@/assets/icons/ic_delete.svg'
import useRegistration from '@/api/queries/registration/useRegistration'
import { useQueryClient } from '@tanstack/vue-query'
const queryClient = useQueryClient()

defineProps({
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  fileSize: {
    type: String,
    default: ''
  },
  data: {
    type: Array<TDocument>,
    default: []
  }
})

// Query
const { mutate: deleteDocument, isPending: isLoadingDeleteDoc } = useRegistration.deleteDocument()

const handleDelete = (id: string) => {
  deleteDocument(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['DOCUMENT'] })
    }
  })
}
</script>

<template>
  <div class="tw-flex tw-justify-between tw-rounded-lg tw-border tw-border-neutral-3 tw-p-3">
    <div class="tw-flex tw-gap-4">
      <img :src="IcFile" alt="IcFile" />

      <div class="tw-flex tw-flex-col tw-gap-2">
        <h5 class="tw-leading-none">{{ name }}</h5>
        <p class="tw-leading-none tw-text-neutral-desc">{{ fileSize }}</p>
      </div>
    </div>

    <el-button link @click="handleDelete(id)" :loading="isLoadingDeleteDoc">
      <img :src="IcDelete" alt="IcDelete" />
    </el-button>
  </div>
</template>

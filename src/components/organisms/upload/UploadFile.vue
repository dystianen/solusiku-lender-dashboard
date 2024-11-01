<script lang="ts" setup>
import useRegistration from '@/api/queries/registration/useRegistration'
import IcFileSaved from '@/assets/icons/ic_file_saved.svg'
import filters from '@/helpers/filters'
import type { FileType } from '@/types/general'
import type { TDocument, TReqUploadDocument } from '@/types/master'
import generateRandomNumbers from '@/utils/random-number'
import { useQueryClient } from '@tanstack/vue-query'
import { ElMessage, ElNotification } from 'element-plus'
import { computed, h, ref, watch, watchEffect, type PropType } from 'vue'
import { useDropzone, type FileRejectReason } from 'vue3-dropzone'
const queryClient = useQueryClient()

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  field: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pilih File'
  },
  fileType: {
    type: String as PropType<FileType>,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const dialogVisible = ref(false)

// Query
const { data: document } = useRegistration.getDocument(props.fileType)
const totalDocument = computed(() => document.value?.length || 0)

const { mutate: uploadDocument, isPending: isLoadingUploadDocs } =
  useRegistration.postUploadDocument()
const { mutate: deleteDocument, isPending: isLoadingDeleteDocs } = useRegistration.deleteDocument()

interface TResFile {
  id: string
  name: string
  size: string
}

const documentList = ref<TResFile[]>([])
const files = ref<File[]>([])
const deleteIds = ref<string[]>([])

function onDrop(acceptFiles: File[], rejectReasons: FileRejectReason[]) {
  rejectReasons.map((it) => {
    ElNotification({
      title: 'Errors: ',
      type: 'error',
      message: h(
        'ul',
        it.errors.map((error) => {
          // @ts-expect-error
          return h('li', { class: 'tw-text-danger' }, `• ${error.message}`)
        })
      )
    })
  })

  files.value = [...acceptFiles, ...files.value]

  const mappedFiles: TResFile[] = acceptFiles.map((it) => ({
    id: generateRandomNumbers(),
    name: it.name,
    size: filters.formatFileSize(it.size)
  }))
  documentList.value = [...documentList.value, ...mappedFiles]
}

const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  maxSize: 16000000,
  accept: ['.zip', '.pdf', 'image/jpeg', 'image/png'],
  disabled: isLoadingUploadDocs.value,
  multiple: props.multiple
})

const deleteFile = (id: string) => {
  const index = (document.value || []).findIndex((it) => it.id === id)
  if (index !== -1 && index !== undefined) {
    const isUploaded = documentList.value[index]

    if (isUploaded) {
      deleteIds.value = [...deleteIds.value, id]
      documentList.value.splice(index, 1)
    }
  } else {
    files.value.splice(index, 1)
    documentList.value.splice(index, 1)
  }
}

const saveFiles = (files: File[]): FormData => {
  const formData = new FormData()
  const fileArray = Array.from(files)
  fileArray.forEach((file) => {
    formData.append('file[]', file)
  })

  return formData
}

const invalidateQueriesOnce = () => {
  queryClient.invalidateQueries({ queryKey: ['DOCUMENT'] })
  queryClient.invalidateQueries({ queryKey: ['DOCUMENT_TYPE', { fileType: props.fileType }] })
}

const handleDelete = () => {
  deleteDocument(deleteIds.value, {
    onSuccess: () => {
      deleteIds.value = []
      dialogVisible.value = false
      invalidateQueriesOnce()
    },
    onError: (res: any) => {
      ElMessage.error(res.data.error)
    }
  })
}

const onSave = () => {
  if (deleteIds.value.length > 0) {
    handleDelete()
  }

  if (files.value.length > 0) {
    const formData = saveFiles(files.value)
    const payload: TReqUploadDocument = {
      fileType: props.fileType,
      formData
    }
    uploadDocument(payload, {
      onSuccess: () => {
        dialogVisible.value = false
        files.value = []
        invalidateQueriesOnce()
      },
      onError: (res: any) => {
        ElMessage.error(res.data.error)
      }
    })
  }
}

const handleSetDocumentList = (document: TDocument[]) => {
  const files: TResFile[] = document.map((it) => ({
    id: it.id,
    name: it.name,
    size: it.fileSize
  }))
  documentList.value = files
}

const onCancel = () => {
  dialogVisible.value = false
  files.value = []
  deleteIds.value = []
}

watch([dialogVisible, document], ([value, document]) => {
  if (value && document) {
    handleSetDocumentList(document)
  }
})

watchEffect(() => {
  if (document.value) {
    handleSetDocumentList(document.value)
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="label" class="input-label tw-max-w-48 tw-truncate md:tw-max-w-full">
      {{ label }} <span v-if="status" class="tw-text-neutral-subtle">({{ status }})</span>
    </label>
    <div
      class="tw-flex tw-h-[42px] tw-justify-between tw-rounded-lg tw-border tw-border-gray-200 tw-px-4 tw-py-1"
    >
      <span class="tw-text-neutral-4" v-if="totalDocument === 0">Pilih File</span>

      <div id="file" class="tw-flex tw-items-center tw-gap-2" v-else>
        <img :src="IcFileSaved" alt="IcFileSaved" :width="22" :height="18" />
        <span>{{ totalDocument }} File Telah di Simpan</span>
      </div>

      <el-button
        v-if="totalDocument === 0"
        type="primary"
        round
        style="padding: 8px 20px"
        @click="dialogVisible = true"
      >
        Upload
      </el-button>
      <el-button v-else type="primary" link @click="dialogVisible = true"> Ubah File </el-button>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" class="!tw-w-[590px] !tw-rounded-2xl">
    <template #header>
      <h3 class="tw-text-xl tw-font-semibold tw-text-primary">{{ props.label }}</h3>
    </template>
    <template v-if="multiple || (!multiple && documentList.length === 0)">
      <span>Unggah File</span>
      <div
        v-bind="getRootProps()"
        class="tw-grid tw-w-full tw-gap-3 tw-rounded-2xl tw-border tw-border-dashed tw-border-gray-300 tw-py-9 hover:tw-cursor-pointer hover:tw-bg-slate-50 tw-mb-4"
      >
        <input v-bind="getInputProps()" />
        <div class="tw-flex tw-flex-col tw-justify-center tw-gap-1 tw-text-center">
          <h5 class="tw-text-black">
            Letakkan file disini atau <span class="tw-text-info tw-underline">klik Telusuri</span>
          </h5>
          <p class="tw-text-[13px] tw-text-neutral-desc">
            Format yang disarankan zip, pdf, jpg dan png. <br />
            (Maks.2mb)
          </p>
        </div>
      </div>
    </template>

    <template v-if="documentList.length > 0">
      <p>File di Unggah</p>
      <div class="tw-flex tw-flex-col tw-gap-2">
        <div v-for="(item, i) in documentList" :key="i">
          <CardFile
            :name="item.name"
            :file-size="item.size"
            :file-type="fileType"
            @onDelete="deleteFile(item.id)"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="tw-flex tw-justify-center tw-gap-4">
        <el-button
          type="primary"
          size="large"
          :loading="isLoadingUploadDocs || isLoadingDeleteDocs"
          :disabled="documentList.length === 0"
          @click="onSave"
        >
          Simpan
        </el-button>
        <el-button size="large" @click="onCancel"> Batalkan </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.ep-input__prefix-inner > :last-child) {
  margin-right: 0;
}
:deep(.ep-input.is-disabled .ep-input__wrapper) {
  background-color: white;
}
:deep(.ep-input.is-disabled .ep-input__inner) {
  cursor: default;
}
</style>

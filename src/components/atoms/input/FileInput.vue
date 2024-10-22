<script lang="ts" setup>
import { ref, type PropType, computed, watch, onMounted, nextTick } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import useRegistration from '@/api/queries/registration/useRegistration'
import IcFileSaved from '@/assets/icons/ic_file_saved.svg'
import type { FileType } from '@/types/general'
import type { TReqUploadDocument } from '@/types/master'

import { useQueryClient } from '@tanstack/vue-query'
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
    default: 'large'
  }
})

const dialogVisible = ref(false)

const { data: document } = useRegistration.getDocument(props.fileType)
const totalDocument = computed(() => document.value?.length || 0)

const { mutate: uploadDocument, isPending: isLoadingUploadDocs } =
  useRegistration.postUploadDocument()

const saveFiles = (files: File[]): FormData => {
  const formData = new FormData()
  const fileArray = Array.from(files)
  fileArray.forEach((file) => {
    formData.append('file[]', file)
  })

  return formData
}

function onDrop(acceptFiles: File[]) {
  const formData = saveFiles(acceptFiles)
  const payload: TReqUploadDocument = {
    fileType: props.fileType,
    formData
  }
  uploadDocument(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['DOCUMENT'] })
    }
  })
}

const { getRootProps, getInputProps } = useDropzone({ onDrop })

const handleSetEmit = (field: string) => {
  console.log('🚀 ~ handleSetEmit ~ field:', field)
  const value = totalDocument.value !== 0 ? `${totalDocument.value} File Telah di Simpan` : ''
  emit('update:modelValue', { value, field })
}

const handleSubmit = () => {
  handleSetEmit(props.field)
  dialogVisible.value = false
}

const hiddenButton = ref<HTMLButtonElement | null>(null)

onMounted(async () => {
  await nextTick() // Ensure DOM is rendered
  hiddenButton.value?.click()
})
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <div
      class="tw-flex tw-h-[42px] tw-justify-between tw-rounded-lg tw-border tw-border-gray-200 tw-px-4 tw-py-1"
    >
      <span class="tw-text-neutral-4" v-if="totalDocument === 0">Pilih File</span>

      <div id="file" class="tw-flex tw-items-center tw-gap-2" v-else>
        <img :src="IcFileSaved" alt="IcFileSaved" :width="22" :height="18" />
        <span>{{ totalDocument }} File Telah di Simpan</span>
      </div>

      <el-button type="primary" round style="padding: 8px 20px" @click="dialogVisible = true">
        Upload
      </el-button>
    </div>
  </div>

  <!-- <button ref="hiddenButton" @click.prevent="handleSetEmit(props.field)">sdffdf</button> -->

  <el-dialog v-model="dialogVisible" class="!tw-w-[590px] !tw-rounded-2xl">
    <template #title>
      <h3 class="tw-text-xl tw-font-semibold tw-text-primary">Unggah {{ props.label }}</h3>
    </template>
    <span>Unggah File</span>
    <div
      v-bind="getRootProps()"
      class="tw-grid tw-w-full tw-gap-3 tw-rounded-2xl tw-border tw-border-dashed tw-border-gray-300 tw-py-9 hover:tw-cursor-pointer hover:tw-bg-slate-50"
      v-loading="isLoadingUploadDocs"
    >
      <input v-bind="getInputProps()" />
      <div class="tw-flex tw-flex-col tw-justify-center tw-gap-1 tw-text-center">
        <h5 class="tw-text-black">
          Letakkan file disini atau <span class="tw-text-info tw-underline">klik Telusuri</span>
        </h5>
        <p class="tw-text-[13px] tw-text-neutral-desc">
          Format yang disarankan zip, pdf, jpg dan png. <br />
          (Maks.20mb)
        </p>
      </div>
    </div>

    <template v-if="document && document.length > 0">
      <p class="tw-mt-4">File di Unggah</p>
      <div class="tw-flex tw-flex-col tw-gap-2">
        <div v-for="(item, i) in document" :key="i">
          <CardFile :id="item.id" :name="item.name" :file-size="item.fileSize" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="tw-flex tw-gap-4">
        <el-button round size="large" style="width: 100%" @click="dialogVisible = false">
          Batalkan
        </el-button>
        <el-button round type="primary" size="large" style="width: 100%" @click="handleSubmit">
          Simpan
        </el-button>
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

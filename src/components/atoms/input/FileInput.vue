<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import IcFile from '@/assets/icons/ic_file.svg'
import IcDelete from '@/assets/icons/ic_delete.svg'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pilih File'
  }
})

const attrs = useAttrs()

const dialogVisible = ref(false)
</script>

<template>
  <div class="input-container">
    <label :for="props.label" class="input-label">{{ props.label }}</label>
    <el-input
      v-bind="attrs"
      :placeholder="props.placeholder"
      size="large"
      style="border-radius: 15px"
      disabled
    >
      <template #suffix>
        <el-button type="primary" round style="padding: 8px 20px" @click="dialogVisible = true">
          Upload
        </el-button>
      </template>
    </el-input>
  </div>

  <el-dialog v-model="dialogVisible" class="!tw-w-[590px] !tw-rounded-2xl">
    <template #title>
      <h3 class="tw-text-xl tw-font-semibold tw-text-primary">Unggah akta perubahan</h3>
    </template>
    <span>Unggah File</span>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      :show-file-list="false"
    >
      <h5 class="tw-text-black">
        Letakkan file disini atau <span class="tw-text-info tw-underline">klik Telusuri</span>
      </h5>
      <p class="tw-text-[13px] tw-text-neutral-desc">
        Format yang disarankan zip, pdf, jpg dan png. <br />
        (Maks.20mb)
      </p>
    </el-upload>

    <p class="tw-mt-4">File di Unggah</p>
    <div class="tw-flex tw-flex-col tw-gap-2">
      <div
        v-for="item in 2"
        :key="item"
        class="tw-flex tw-justify-between tw-rounded-lg tw-border tw-border-neutral-3 tw-p-3"
      >
        <div class="tw-flex tw-gap-4">
          <img :src="IcFile" alt="IcFile" />

          <div class="tw-flex tw-flex-col tw-gap-2">
            <h5 class="tw-leading-none">Akta Perubahan 2023</h5>
            <p class="tw-leading-none tw-text-neutral-desc">1.3.MB</p>
          </div>
        </div>

        <el-button link>
          <img :src="IcDelete" alt="IcDelete" />
        </el-button>
      </div>
    </div>

    <template #footer>
      <div class="tw-flex tw-gap-4">
        <el-button round size="large" style="width: 100%" @click="dialogVisible = false">
          Batalkan
        </el-button>
        <el-button
          round
          type="primary"
          size="large"
          style="width: 100%"
          @click="dialogVisible = false"
        >
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

<script setup lang="ts">
import InputField from '@/components/atoms/input/InputField.vue'
</script>

<template>
  <div class="tw-relative tw-m-2 tw-rounded-3xl tw-shadow-highlight">
    <div class="tw-rounded-t-3xl tw-bg-primary tw-px-5 tw-py-4">
      <h1 class="tw-text-2xl tw-font-semibold tw-text-white">Registrasi Pendanaan - Perusahaan</h1>
    </div>

    <div class="tw-flex tw-flex-col tw-gap-5 tw-p-5">
      <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Informasi Dasar</h5>

      <div class="tw-grid tw-grid-cols-2 tw-gap-6 tw-pt-2 md:tw-grid-cols-4">
        <InputField
          input-type="number"
          label="Nomor KTP"
          placeholder="Cth: 3674 0412 3456 7890"
          class="tw-col-span-2"
        />
        <InputField
          input-type="number"
          label="No. NPWP"
          placeholder="Cth: 2941XXXXX"
          class="tw-col-span-2"
        />
        <InputField label="Tempat Lahir" placeholder="Cth: Jakarta" class="tw-col-span-1" />
        <InputField
          input-type="date"
          label="Tanggal Lahir"
          placeholder="Cth: Jakarta"
          class="tw-col-span-1"
        />
        <InputField
          label="Jenis Kelamin"
          placeholder="Pilih Bentuk Badan Hukum "
          class="tw-col-span-2"
        />
        <InputField label="Provinsi" placeholder="Pilih Provinsi" class="tw-col-span-2" />
        <InputField label="Kota" placeholder="Pilih Kota" class="tw-col-span-2" />
        <InputField
          label="Alamat Lengkap"
          placeholder="Cth: Jl. Pasti Beruntung"
          class="md:tw-col-span-4"
        />
      </div>
    </div>

    <div class="tw-p-5">
      <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Unggah Dokumen</h5>
      <p class="tw-text-neutral-desc">
        Format yang disarankan zip, pdf, jpg, jpeg dan png. (Maks.20mb)
      </p>

      <div class="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-6 tw-pt-2 md:tw-grid-cols-2">
        <InputField
          input-type="file"
          label="Unggah KTP Bagian Depan"
          placeholder="Cth: 3674 0412 3456 7890"
        />
        <InputField input-type="file" label="Unggah Foto Wajah" placeholder="Cth: 2941XXXXX" />
        <InputField input-type="file" label="Unggah NPWP" placeholder="Cth: Jakarta" />
        <InputField
          input-type="file"
          label="Unggah Bukti Penghasilan"
          placeholder="Pilih Bentuk Badan Hukum "
        />
      </div>

      <div class="tw-mt-6 tw-flex tw-justify-center">
        <el-button round type="primary" size="large"> Simpan dan Lanjutkan </el-button>
      </div>
    </div>
  </div>
</template>

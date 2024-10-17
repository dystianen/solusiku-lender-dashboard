<script setup lang="ts">
import { reactive, ref } from 'vue'
import DatePicker from '@/components/atoms/datepicker/DatePicker.vue'
import InputField from '@/components/atoms/input/InputField.vue'
import type { FormInstance, FormRules } from 'element-plus'
import SelectField from '@/components/atoms/select/SelectField.vue'
import useMaster from '@/api/queries/master/useMaster'

// Queries
const { data: gender } = useMaster.getGender()
const { data: province } = useMaster.getProvince()
const { mutate: city } = useMaster.getCity()

interface RuleForm {
  userTypeId: number
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  isAgree: boolean
}

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  userTypeId: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  isAgree: false
})

const rules = reactive<FormRules<RuleForm>>({
  fullName: [
    {
      required: true,
      message: 'Nama Lengkap Sesuai KTP harus diisi',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: 'Email harus diisi',
      trigger: 'change'
    },
    {
      type: 'email',
      message: 'Harap masukkan alamat email yang benar',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: 'No. Hp/Telepon harus diisi',
      trigger: 'change'
    }
  ]
})
</script>

<template>
  <div class="tw-relative tw-m-2 tw-rounded-3xl tw-shadow-highlight">
    <div class="tw-rounded-t-3xl tw-bg-primary tw-px-5 tw-py-4">
      <h1 class="tw-text-2xl tw-font-semibold tw-text-white">Registrasi Pendanaan - Pribadi</h1>
    </div>

    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-flex-col tw-gap-0"
      status-icon
      :model="form"
      :rules="rules"
    >
      <div class="tw-flex tw-flex-col tw-gap-5 tw-p-5">
        <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Informasi Dasar</h5>

        <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-4">
          <el-form-item prop="idCardNumber" class="tw-col-span-2">
            <InputField type="number" label="Nomor KTP" placeholder="Cth: 3674 0412 3456 7890" />
          </el-form-item>
          <el-form-item prop="taxNumber " class="tw-col-span-2">
            <InputField type="number" label="No. NPWP" placeholder="Cth: 2941XXXXX" />
          </el-form-item>
          <el-form-item prop="birthPlace">
            <InputField label="Tempat Lahir" placeholder="Cth: Jakarta" />
          </el-form-item>
          <el-form-item prop="birthDate">
            <DatePicker label="Tanggal Lahir" placeholder="11/11/2024" />
          </el-form-item>
          <el-form-item prop="genderId" class="tw-col-span-2">
            <SelectField
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              :options="gender"
            />
          </el-form-item>
          <el-form-item prop="religionId" class="tw-col-span-2">
            <SelectField label="Agama" placeholder="Pilih Agama" :options="gender" />
          </el-form-item>
          <el-form-item prop="maritalStatusId" class="tw-col-span-2">
            <SelectField
              label="Status Pernikahan"
              placeholder="Pilih Status Pernikahan"
              :options="gender"
            />
          </el-form-item>
          <el-form-item prop="motherMaidenName" class="tw-col-span-2">
            <InputField label="Nama Ibu Kandung" placeholder="Masukan Nama Ibu Kandung" />
          </el-form-item>
          <el-form-item prop="jobId" class="tw-col-span-2">
            <SelectField
              label="Jenis Pekerjaan"
              placeholder="Pilih Jenis Pekerjaan"
              :options="province"
            />
          </el-form-item>
          <el-form-item prop="educationId" class="tw-col-span-2">
            <SelectField
              label="Pendidikan Terakhir"
              placeholder="Pilih Pendidikan Terakhir"
              :options="province"
            />
          </el-form-item>
          <el-form-item prop="educationId" class="tw-col-span-2">
            <SelectField
              label="Tempat Penerbitan KTP"
              placeholder="Masukan Tempat Penerbitan KTP"
              :options="province"
            />
          </el-form-item>
          <el-form-item prop="provinsi" class="tw-col-span-2">
            <SelectField label="Provinsi" placeholder="Pilih Provinsi" :options="province" />
          </el-form-item>
          <el-form-item prop="kota" class="tw-col-span-2">
            <SelectField label="Kota" placeholder="Pilih Kota" />
          </el-form-item>
          <el-form-item prop="Kecamatan" class="tw-col-span-2">
            <SelectField label="Kecamatan" placeholder="Pilih Kecamatan" :options="province" />
          </el-form-item>
          <el-form-item prop="Kelurahan" class="tw-col-span-2">
            <SelectField label="Kelurahan" placeholder="Pilih Kelurahan" :options="province" />
          </el-form-item>
          <el-form-item prop="RT/RW" class="tw-col-span-2">
            <InputField label="RT/RW" placeholder="Cth: 001 / 007" />
          </el-form-item>
          <el-form-item prop="Kode POS" class="tw-col-span-2">
            <SelectField label="Kode POS" placeholder="Pilih Kode POS" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="md:tw-col-span-4">
            <InputField label="Alamat Lengkap" placeholder="Cth: Jl. Pasti Beruntung" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-2">
            <InputField label="Sumber Dana" placeholder="Cth: Uang Pribadi" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-2">
            <SelectField label="Penghasilan Perbulan" placeholder="Pilih Penghasilan Perbulan" />
          </el-form-item>
          <el-form-item prop="rekening_bank" class="tw-col-span-2">
            <SelectField label="Nama Rekening Bank" placeholder="Pilih Nama Bank" />
          </el-form-item>
          <el-form-item prop="no_rekening" class="tw-col-span-2">
            <InputField label="No. Rekening Perusahaan" placeholder="Masukan Nomor Rekening" />
          </el-form-item>
        </div>
      </div>

      <div class="tw-p-5 tw-pt-0">
        <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Unggah Dokumen</h5>
        <p class="tw-text-neutral-desc">
          Format yang disarankan zip, pdf, jpg, jpeg dan png. (Maks.20mb)
        </p>

        <div class="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-2">
          <el-form-item prop="file_ktp">
            <FileInput label="Unggah KTP Bagian Depan" />
          </el-form-item>
          <el-form-item prop="file_ktp">
            <FileInput label="Unggah Foto Wajah" />
          </el-form-item>
          <el-form-item prop="file_npwp">
            <FileInput label="Unggah NPWP" />
          </el-form-item>
          <el-form-item prop="file_income">
            <FileInput label="Unggah Bukti Penghasilan" />
          </el-form-item>
        </div>

        <div class="tw-mt-6 tw-flex tw-justify-center">
          <el-button round type="primary" size="large"> Simpan dan Lanjutkan </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

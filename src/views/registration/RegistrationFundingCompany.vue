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
  companyName: string
  legalEntityId: number
  businessFieldId: number
  businessLicenseId: number
  businessLicenseNumber: string
  deedNumber: string
  idCardNumber: string
  taxNumber: string
  birthPlace: string
  birthDate: Date
  sourceOfFoundId: number
  monthlyIncomeId: number
  bankId: number
  bankAccountNumber: string
  provinceId: number
  cityId: number
  districtId: number
  subDistrictId: number
  address: string
  postalCode: string
}

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  companyName: '',
  legalEntityId: 0,
  businessFieldId: 0,
  businessLicenseId: 0,
  businessLicenseNumber: '',
  deedNumber: '',
  idCardNumber: '',
  taxNumber: '',
  birthPlace: '',
  birthDate: '',
  sourceOfFoundId: 0,
  monthlyIncomeId: 0,
  bankId: 0,
  bankAccountNumber: '',
  provinceId: 0,
  cityId: 0,
  districtId: 0,
  subDistrictId: 0,
  address: '',
  postalCode: ''
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

const fieldFile = [
  {
    key: 'akta-pendirian',
    label: 'Unggah Akta Pendirian'
  },
  {
    key: 'akta-perubahan',
    label: 'Unggah Akta Perubahan'
  },
  {
    key: 'sk-kemenkumham-akta-pendirian',
    label: 'Unggah SK Kemenkumham Akta Pendirian'
  },
  {
    key: 'sk-kemenkumham-akta-perubahan',
    label: 'Unggah SK Kemenkumham Akta Perubahan'
  },
  {
    key: 'id-card',
    label: 'Unggah KTP Bagian Depan'
  },
  {
    key: 'selfie-photo',
    label: 'Unggah Foto Wajah'
  },
  {
    key: 'nib',
    label: 'Unggah NIB'
  },
  {
    key: 'rekening-koran',
    label: 'Unggah Rekening Koran (Min.3 bulan terkahir)'
  },
  {
    key: 'keuangan-perusahaan-inhouse',
    label: 'Laporan Keuangan Perusahaan InHouse'
  },
  {
    key: 'bukti-penghasilan',
    label: 'Unggah Bukti Penghasilan'
  },
  {
    key: 'siup',
    label: 'Unggah SIUP (Opsional)'
  },
  {
    key: 'tdp',
    label: 'Unggah TDP (Opsional)'
  },
  {
    key: 'tax-card',
    label: 'Unggah NPWP Perusahaan (Opsional)'
  },
  {
    key: 'keuangan-perusahaan-audited',
    label: 'Laporan Keuangan Perusahaan Audited (Opsional)'
  }
]
</script>

<template>
  <div class="tw-relative tw-m-2 tw-rounded-3xl tw-shadow-highlight">
    <div class="tw-rounded-t-3xl tw-bg-primary tw-px-5 tw-py-4">
      <h1 class="tw-text-2xl tw-font-semibold tw-text-white">Registrasi Pendanaan - Perusahaan</h1>
    </div>

    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-flex-col tw-gap-4"
      status-icon
      :model="form"
      :rules="rules"
    >
      <div class="tw-flex tw-flex-col tw-gap-5 tw-p-5">
        <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Informasi Perusahaan</h5>

        <div class="tw-grid tw-grid-cols-6 tw-gap-4 tw-pt-2 md:tw-grid-cols-12">
          <el-form-item prop="companyName" class="tw-col-span-6">
            <InputField
              v-model="form.companyName"
              label="Nama Perusahaan"
              placeholder="Cth: PT. Solusiku"
            />
          </el-form-item>
          <el-form-item prop="legalEntityId" class="tw-col-span-6">
            <SelectField
              v-model="form.legalEntityId"
              label="Bentuk Badan Hukum"
              placeholder="Pilih Bentuk Badan Hukum"
              :options="gender"
            />
          </el-form-item>
          <el-form-item prop="businessFieldId" class="tw-col-span-6">
            <SelectField
              v-model="form.businessFieldId"
              label="Bidang Usaha"
              placeholder="Pilih Bentuk Bidang Usaha"
              :options="gender"
            />
          </el-form-item>
          <el-form-item prop="businessLicenseNumber" class="tw-col-span-6">
            <InputField
              v-model="form.businessLicenseNumber"
              label="No. Akta Pendirian"
              placeholder="Cth: 2941XXXXX"
              type="number"
            />
          </el-form-item>
          <el-form-item prop="izin_usaha" class="tw-col-span-2">
            <SelectField label="Izin Usaha" placeholder="Pilih Izin Usaha" :options="gender" />
          </el-form-item>
          <el-form-item prop="tanggal_lahir" class="tw-col-span-4">
            <InputField label="No. Siup" placeholder="Cth: 124XXXX" type="number" />
          </el-form-item>
          <el-form-item prop="no_npwp" class="tw-col-span-6">
            <InputField label="No. NPWP Perusahaan" placeholder="Cth: 2941XXXXX" type="number" />
          </el-form-item>
          <el-form-item prop="provinsi" class="tw-col-span-6">
            <SelectField label="Provinsi" placeholder="Pilih Provinsi" :options="province" />
          </el-form-item>
          <el-form-item prop="kota" class="tw-col-span-6">
            <SelectField label="Kota" placeholder="Pilih Kota" />
          </el-form-item>
          <el-form-item prop="districtId" class="tw-col-span-6">
            <SelectField
              v-model="form.districtId"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              :options="optionsDistrict"
            />
          </el-form-item>
          <el-form-item prop="subDistrictId" class="tw-col-span-6">
            <SelectField
              v-model="form.subDistrictId"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              :options="optionsSubDistrict"
            />
          </el-form-item>
          <el-form-item prop="postalCode" class="tw-col-span-6">
            <InputField
              v-model="form.postalCode"
              label="Kode POS"
              placeholder="Kode POS"
              disabled
            />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="Alamat Perusahaan" placeholder="Cth: Jl. Sukses Bersama" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-12">
            <InputField label="Alamat Koresponden" placeholder="Cth: Jl. Sukses Bersama" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="Sumber Dana" placeholder="Cth: Uang Pribadi" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <SelectField label="Penghasilan Perbulan" placeholder="Pilih Penghasilan Perbulan" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="Nama Rekening Bank" placeholder="Masukan nama bank" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="No. Rekening Perusahaan" placeholder="Masukan Nomor Rekening" />
          </el-form-item>
        </div>
      </div>

      <div class="tw-p-5">
        <h5 class="tw-text-xl tw-font-semibold tw-text-primary">Unggah Dokumen</h5>
        <p class="tw-text-neutral-desc">
          Format yang disarankan zip, pdf, jpg, jpeg dan png. (Maks.20mb)
        </p>

        <div class="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-6 tw-pt-2 md:tw-grid-cols-2">
          <el-form-item v-for="(item, i) in fieldFile" :key="i" :prop="item.key">
            <FileInput :label="item.label" />
          </el-form-item>
        </div>

        <div class="tw-mt-6 tw-flex tw-justify-center">
          <el-button round type="primary" size="large"> Simpan dan Lanjutkan </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

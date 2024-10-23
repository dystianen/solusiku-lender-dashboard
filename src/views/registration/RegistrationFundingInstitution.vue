<script setup lang="ts">
import useMaster from '@/api/queries/master/useMaster'
import useRegistration from '@/api/queries/registration/useRegistration'
import InputField from '@/components/atoms/input/InputField.vue'
import SelectField from '@/components/atoms/select/SelectField.vue'
import useScreenType from '@/composables/useScreenType'
import type { FileType, Option } from '@/types/general'
import type { TReqRegisterInstitution } from '@/types/registration'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// Hooks
const router = useRouter()
const { isMobile } = useScreenType()

// Queries
const { data: sourceOfFound } = useMaster.getSourceOfFound()
const { data: monthlyIncome } = useMaster.getMonthlyIncome()
const { data: bank } = useMaster.getBank()
const { data: province } = useMaster.getProvince()
const { data: legalEntity } = useMaster.getLegalEntity()
const { data: businessLicense } = useMaster.getBusinessLicense()
const { data: businessField } = useMaster.getBusinessLicense()
const { mutate: city } = useMaster.getCity()
const { mutate: district } = useMaster.getDistrict()
const { mutate: subDistrict } = useMaster.getSubDistrict()
const { mutate: registerIndividual } = useRegistration.patchRegisterIndividual()

const optionsCity = ref<Option[]>([])
const optionsDistrict = ref<Option[]>([])
const optionsSubDistrict = ref<Option[]>([])

const ruleFormRef = ref<FormInstance>()
const form = reactive<TReqRegisterInstitution>({
  companyName: '',
  legalEntityId: '',
  businessFieldId: '',
  businessLicenseId: '',
  businessLicenseNumber: '',
  deedNumber: '',
  idCardNumber: '',
  taxNumber: '',
  birthPlace: '',
  birthDate: '',
  sourceOfFoundId: '',
  monthlyIncomeId: '',
  bankId: '',
  bankAccountNumber: '',
  provinceId: '',
  cityId: '',
  districtId: '',
  subDistrictId: '',
  address: '',
  postalCode: ''
})

const rules = reactive<FormRules<TReqRegisterInstitution>>({
  companyName: [
    {
      required: true,
      message: 'Nama Lengkap Sesuai KTP harus diisi',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const payload: TReqRegisterInstitution = {
        ...form,
        idCardNumber: form.idCardNumber.replace(/\s/g, '')
      }

      // Deleting unwanted keys from the cloned object
      delete payload.idCardNumberFile
      delete payload.selfiePhotoFile
      delete payload.taxNumberFile
      delete payload.proofOfIncomeFile
      registerIndividual(payload, {
        onSuccess: () => {
          router.push({ name: 'waiting-approval' })
        }
      })
    }
  })
}

const fieldFile: { key: FileType; label: string }[] = [
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

watch(
  () => form.provinceId,
  (value) => {
    if (value) {
      city(
        { id: value },
        {
          onSuccess: (res) => {
            optionsCity.value = res
          }
        }
      )
    }
  }
)
watch(
  () => form.cityId,
  (value) => {
    if (value) {
      district(
        { id: value },
        {
          onSuccess: (res) => {
            optionsDistrict.value = res
          }
        }
      )
    }
  }
)
watch(
  () => form.districtId,
  (value) => {
    if (value) {
      subDistrict(
        { id: value },
        {
          onSuccess: (res) => {
            optionsSubDistrict.value = res
          }
        }
      )
    }
  }
)
watch(
  () => form.subDistrictId,
  (value) => {
    if (value) {
      const data = optionsSubDistrict.value.find((it) => it.id === value)
      // @ts-ignore
      form.postalCode = data.postalCode
    }
  }
)
</script>

<template>
  <div class="tw-relative tw-m-2 tw-rounded-3xl tw-shadow-highlight">
    <div class="tw-rounded-t-3xl tw-bg-primary tw-px-5 tw-py-4">
      <h1 class="tw-text-xl tw-font-semibold tw-text-white md:tw-text-2xl">
        Registrasi Pendanaan - Perusahaan
      </h1>
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
        <h5 class="tw-text-lg tw-font-semibold tw-text-primary md:tw-text-xl">
          Informasi Perusahaan
        </h5>

        <div class="tw-grid tw-grid-cols-6 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-12">
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
              :options="legalEntity"
            />
          </el-form-item>
          <el-form-item prop="businessFieldId" class="tw-col-span-6">
            <SelectField
              v-model="form.businessFieldId"
              label="Bidang Usaha"
              placeholder="Pilih Bentuk Bidang Usaha"
              :options="businessField"
            />
          </el-form-item>
          <el-form-item prop="deedNumber" class="tw-col-span-6">
            <InputField
              v-model="form.deedNumber"
              label="No. Akta Pendirian"
              placeholder="Cth: 2941XXXXX"
              type="number"
            />
          </el-form-item>
          <el-form-item prop="businessLicenseId" class="tw-col-span-2">
            <SelectField
              v-model="form.businessLicenseId"
              label="Izin Usaha"
              placeholder="Pilih Izin Usaha"
              :options="businessLicense"
            />
          </el-form-item>
          <el-form-item prop="businessLicenseNumber" class="tw-col-span-4">
            <InputField
              v-model="form.businessLicenseNumber"
              label="No. Siup"
              placeholder="Cth: 124XXXX"
              type="number"
            />
          </el-form-item>
          <el-form-item prop="taxNumber" class="tw-col-span-6">
            <InputField
              v-model="form.taxNumber"
              label="No. NPWP Perusahaan"
              placeholder="Cth: 2941XXXXX"
              type="number"
            />
          </el-form-item>
          <el-form-item prop="provinceId" class="tw-col-span-6">
            <SelectField
              v-model="form.provinceId"
              label="Provinsi"
              placeholder="Pilih Provinsi"
              :options="province"
            />
          </el-form-item>
          <el-form-item prop="cityId" class="tw-col-span-6">
            <SelectField
              v-model="form.cityId"
              label="Kota"
              placeholder="Pilih Kota"
              :options="optionsCity"
            />
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
          <el-form-item prop="idCardNumber" class="tw-col-span-6">
            <InputField
              v-model="form.idCardNumber"
              v-maska="'#### #### #### ####'"
              label="No. KTP Koresponden"
              placeholder="Cth: 3674 0412 3456 7890"
            />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="Alamat Perusahaan" placeholder="Cth: Jl. Sukses Bersama" />
          </el-form-item>
          <el-form-item prop="alamat_lengkap" class="tw-col-span-6">
            <InputField label="Alamat Koresponden" placeholder="Cth: Jl. Sukses Bersama" />
          </el-form-item>
          <el-form-item prop="sourceOfFoundId" class="tw-col-span-6">
            <SelectField
              v-model="form.sourceOfFoundId"
              label="Sumber Dana"
              placeholder="Cth: Uang Pribadi"
              :options="sourceOfFound"
            />
          </el-form-item>
          <el-form-item prop="monthlyIncomeId" class="tw-col-span-6">
            <SelectField
              v-model="form.monthlyIncomeId"
              label="Penghasilan Perbulan"
              placeholder="Pilih Penghasilan Perbulan"
              :options="monthlyIncome"
            />
          </el-form-item>
          <el-form-item prop="bankId" class="tw-col-span-6">
            <SelectField
              v-model="form.bankId"
              label="Nama Rekening Bank"
              placeholder="Pilih Nama Bank"
              :options="bank"
            />
          </el-form-item>
          <el-form-item prop="bankAccountNumber" class="tw-col-span-6">
            <InputField
              v-model="form.bankAccountNumber"
              type="number"
              label="No. Rekening"
              placeholder="Masukan Nomor Rekening"
            />
          </el-form-item>
        </div>
      </div>

      <div class="tw-p-5">
        <h5 class="tw-text-lg tw-font-semibold tw-text-primary md:tw-text-xl">Unggah Dokumen</h5>
        <p class="tw-text-neutral-desc">
          Format yang disarankan zip, pdf, jpg, jpeg dan png. (Maks.2mb)
        </p>

        <div class="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-2">
          <el-form-item v-for="(item, i) in fieldFile" :key="i" :prop="item.key">
            <FileInput :file-type="item.key" :label="item.label" />
          </el-form-item>
        </div>

        <div class="tw-mt-6 tw-flex tw-justify-center">
          <el-button
            round
            type="primary"
            size="large"
            :style="!isMobile ? { paddingLeft: '100px', paddingRight: '100px' } : { width: '100%' }"
          >
            Simpan dan Lanjutkan
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

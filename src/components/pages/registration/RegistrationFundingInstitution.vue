<script setup lang="ts">
import useMaster from '@/api/queries/master/useMaster'
import useRegistration from '@/api/queries/registration/useRegistration'
import useScreenType from '@/composables/useScreenType'
import type { FileType, Option } from '@/types/general'
import type { TReqRegisterInstitution } from '@/types/registration'
import { useQueryClient } from '@tanstack/vue-query'
import { ElNotification, dayjs, type FormInstance, type FormRules } from 'element-plus'
import { h, reactive, ref, watch } from 'vue'

// Hooks
const queryClient = useQueryClient()
const { isMobile } = useScreenType()

// Queries
const { data: sourceOfFound } = useMaster.getSourceOfFound()
const { data: monthlyIncome } = useMaster.getMonthlyIncome()
const { data: bank } = useMaster.getBank()
const { data: legalEntity } = useMaster.getLegalEntity()
const { data: businessLicense } = useMaster.getBusinessLicense()
const { data: businessField } = useMaster.getBusinessLicense()
const { data: documents } = useRegistration.getAllDocument()
const { data: province } = useMaster.getProvince()
const { mutate: city } = useMaster.getCity()
const { mutate: district } = useMaster.getDistrict()
const { mutate: subDistrict } = useMaster.getSubDistrict()
const { mutate: registerInstitution } = useRegistration.patchRegisterInstitution()

const optionsCity = ref<Option[]>([])
const optionsDistrict = ref<Option[]>([])
const optionsSubDistrict = ref<Option[]>([])
const defaultValue = dayjs().subtract(5, 'year').toDate()

const disabledDate = (time: Date) => {
  const fiveYearsAgo = dayjs().subtract(5, 'year')
  return dayjs(time).isAfter(fiveYearsAgo, 'day')
}

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
  companyAddress: '',
  address: '',
  postalCode: ''
})

const validateIdCard = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Nomor KTP Koresponden harus diisi'))
  } else if (value.replace(/\s/g, '').length !== 16) {
    callback(new Error('Nomor KTP Koresponden harus 16 digit'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<TReqRegisterInstitution>>({
  companyName: [
    {
      required: true,
      message: 'Nama Perusahaan harus diisi',
      trigger: 'blur'
    }
  ],
  legalEntityId: [
    {
      required: true,
      message: 'Bentuk Badan Hukum harus diisi',
      trigger: 'blur'
    }
  ],
  businessFieldId: [
    {
      required: true,
      message: 'Bidang Usaha harus diisi',
      trigger: 'blur'
    }
  ],
  businessLicenseId: [
    {
      required: true,
      message: 'Izin Usaha harus diisi',
      trigger: 'blur'
    }
  ],
  businessLicenseNumber: [
    {
      required: true,
      message: 'Nomor SIUP harus diisi',
      trigger: 'blur'
    }
  ],
  deedNumber: [
    {
      required: true,
      message: 'No. Akta Pendirian harus diisi',
      trigger: 'blur'
    }
  ],
  idCardNumber: [{ validator: validateIdCard, trigger: 'blur' }],
  taxNumber: [
    { required: true, message: 'No. NPWP Perusahaan harus diisi', trigger: 'blur' },
    { min: 15, max: 16, message: 'Nomor NPWP harus 15-16 digit', trigger: 'blur' }
  ],
  birthPlace: [
    {
      required: true,
      message: 'Tempat Lahir harus diisi',
      trigger: 'blur'
    }
  ],
  birthDate: [
    {
      required: true,
      message: 'Tanggal Lahir harus diisi',
      trigger: 'blur'
    }
  ],
  provinceId: [
    {
      required: true,
      message: 'Provinsi harus diisi',
      trigger: 'blur'
    }
  ],
  cityId: [
    {
      required: true,
      message: 'Kota harus diisi',
      trigger: 'blur'
    }
  ],
  districtId: [
    {
      required: true,
      message: 'Kecamatan harus diisi',
      trigger: 'blur'
    }
  ],
  subDistrictId: [
    {
      required: true,
      message: 'Kelurahan harus diisi',
      trigger: 'blur'
    }
  ],
  companyAddress: [
    {
      required: true,
      message: 'Alamat Perusahaan harus diisi',
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: 'Alamat Koresponden harus diisi',
      trigger: 'blur'
    }
  ],
  postalCode: [
    {
      required: true,
      message: 'Kode POS harus diisi',
      trigger: 'blur'
    }
  ],
  sourceOfFoundId: [
    {
      required: true,
      message: 'Sumber Dana harus diisi',
      trigger: 'blur'
    }
  ],
  monthlyIncomeId: [
    {
      required: true,
      message: 'Penghasilan Perbulan harus diisi',
      trigger: 'blur'
    }
  ],
  bankId: [
    {
      required: true,
      message: 'Nama Rekening Bank harus diisi',
      trigger: 'blur'
    }
  ],
  bankAccountNumber: [
    {
      required: true,
      message: 'No. Rekening harus diisi',
      trigger: 'blur'
    }
  ]
})

const fieldFile: { key: FileType; label: string; desc?: string; multiple: boolean }[] = [
  {
    key: 'akta-pendirian',
    label: 'Unggah Akta Pendirian',
    multiple: false
  },
  {
    key: 'akta-perubahan',
    label: 'Unggah Akta Perubahan',
    multiple: true
  },
  {
    key: 'sk-kemenkumham-akta-pendirian',
    label: 'Unggah SK Kemenkumham Akta Pendirian',
    multiple: false
  },
  {
    key: 'sk-kemenkumham-akta-perubahan',
    label: 'Unggah SK Kemenkumham Akta Perubahan',
    multiple: true
  },
  {
    key: 'id-card',
    label: 'Unggah KTP Bagian Depan',
    multiple: false
  },
  {
    key: 'selfie-photo',
    label: 'Unggah Foto Wajah',
    multiple: false
  },
  {
    key: 'nib',
    label: 'Unggah NIB',
    multiple: false
  },
  {
    key: 'rekening-koran',
    label: 'Unggah Rekening Koran',
    desc: 'Min.3 bulan terkahir',
    multiple: true
  },
  {
    key: 'keuangan-perusahaan-inhouse',
    label: 'Unggah Laporan Keuangan Perusahaan InHouse',
    multiple: true
  },
  {
    key: 'bukti-penghasilan',
    label: 'Unggah Bukti Penghasilan',
    multiple: true
  },
  {
    key: 'siup',
    label: 'Unggah SIUP',
    desc: 'Opsional',
    multiple: false
  },
  {
    key: 'tdp',
    label: 'Unggah TDP',
    desc: 'Opsional',
    multiple: true
  },
  {
    key: 'tax-card',
    label: 'Unggah NPWP Perusahaan',
    desc: 'Opsional',
    multiple: false
  },
  {
    key: 'keuangan-perusahaan-audited',
    label: 'Laporan Keuangan Perusahaan Audited',
    desc: 'Opsional',
    multiple: true
  }
]

const validateFiles = () => {
  const errors = []

  for (const key in documents.value) {
    const file = fieldFile.find((it) => it.key === key)

    if (documents.value[key] === '0' && file && !file.desc) {
      errors.push(key)
    }
  }

  if (errors.length > 0) {
    ElNotification({
      title: 'Dokumen wajib diisi: ',
      message: h(
        'ul',
        errors.map((error) =>
          h(
            'li',
            { class: 'tw-text-danger' },
            `• ${fieldFile.find((it) => it.key === error)?.label}`
          )
        )
      ),
      type: 'error'
    })
    return false
  }

  return true
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (!validateFiles()) return
    if (valid) {
      const payload: TReqRegisterInstitution = {
        ...form,
        birthDate: dayjs(form.birthDate).format('YYYY-MM-DD'),
        idCardNumber: form.idCardNumber.replace(/\s/g, '')
      }

      registerInstitution(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['FUNDING_CHECK'] })
        }
      })
    }
  })
}

watch(
  () => form.provinceId,
  (value) => {
    if (value) {
      form.cityId = ''
      form.districtId = ''
      form.subDistrictId = ''
      form.postalCode = ''
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
      form.districtId = ''
      form.subDistrictId = ''
      form.postalCode = ''
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
      form.subDistrictId = ''
      form.postalCode = ''
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
              v-maska="'################'"
              label="No. NPWP Perusahaan"
              placeholder="Cth: 2941XXXXX"
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
          <el-form-item prop="birthPlace" class="tw-col-span-6">
            <InputField v-model="form.birthPlace" label="Tempat Lahir" placeholder="Cth: Jakarta" />
          </el-form-item>
          <el-form-item prop="birthDate" class="tw-col-span-6">
            <DatePicker
              v-model="form.birthDate"
              :disabledDate="disabledDate"
              :default-value="defaultValue"
              label="Tanggal Lahir"
              format="DD/MM/YYYY"
              placeholder="11/11/2019"
            />
          </el-form-item>
          <el-form-item prop="companyAddress" class="tw-col-span-6">
            <InputField
              v-model="form.companyAddress"
              label="Alamat Perusahaan"
              placeholder="Cth: Jl. Sukses Bersama"
            />
          </el-form-item>
          <el-form-item prop="address" class="tw-col-span-6">
            <InputField
              v-model="form.address"
              label="Alamat Koresponden"
              placeholder="Cth: Jl. Sukses Bersama"
            />
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
            <UploadFile
              :file-type="item.key"
              :label="item.label"
              :status="item.desc"
              :multiple="item.multiple"
            />
          </el-form-item>
        </div>

        <el-button
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
          :style="!isMobile ? { paddingLeft: '45px', paddingRight: '45px' } : { width: '100%' }"
          class="tw-mt-6"
        >
          Simpan dan Lanjutkan
        </el-button>
      </div>
    </el-form>
  </div>
</template>

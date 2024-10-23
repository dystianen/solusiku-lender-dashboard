<script setup lang="ts">
import useMaster from '@/api/queries/master/useMaster'
import useRegistration from '@/api/queries/registration/useRegistration'
import DatePicker from '@/components/atoms/datepicker/DatePicker.vue'
import InputField from '@/components/atoms/input/InputField.vue'
import SelectField from '@/components/atoms/select/SelectField.vue'
import useScreenType from '@/composables/useScreenType'
import type { Option } from '@/types/general'
import type { TReqRegisterIndividual } from '@/types/registration'
import { dayjs, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isMobile } = useScreenType()

// Queries
const { data: gender } = useMaster.getGender()
const { data: province } = useMaster.getProvince()
const { data: sourceOfFound } = useMaster.getSourceOfFound()
const { data: monthlyIncome } = useMaster.getMonthlyIncome()
const { data: bank } = useMaster.getBank()
const { mutate: city } = useMaster.getCity()
const { mutate: district } = useMaster.getDistrict()
const { mutate: subDistrict } = useMaster.getSubDistrict()
const { mutate: registerIndividual } = useRegistration.patchRegisterIndividual()

const optionsCity = ref<Option[]>([])
const optionsDistrict = ref<Option[]>([])
const optionsSubDistrict = ref<Option[]>([])

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  idCardNumber: '',
  taxNumber: '',
  genderId: '',
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
  postalCode: '',

  // only used for validation
  idCardNumberFile: '',
  selfiePhotoFile: '',
  taxNumberFile: '',
  proofOfIncomeFile: ''
})

const rules = reactive<FormRules<TReqRegisterIndividual>>({
  idCardNumber: [
    {
      required: true,
      message: 'Nomor KTP harus diisi',
      trigger: 'change'
    }
  ],
  taxNumber: [
    {
      required: true,
      message: 'Nomor NPWP harus diisi',
      trigger: 'change'
    }
  ],
  genderId: [
    {
      required: true,
      message: 'Jenis Kelamin harus diisi',
      trigger: 'change'
    }
  ],
  birthPlace: [
    {
      required: true,
      message: 'Tampat Lahir harus diisi',
      trigger: 'change'
    }
  ],
  birthDate: [
    {
      required: true,
      message: 'Tanggal Lahir harus diisi',
      trigger: 'change'
    }
  ],
  provinceId: [
    {
      required: true,
      message: 'Provinsi harus diisi',
      trigger: 'change'
    }
  ],
  cityId: [
    {
      required: true,
      message: 'Kota harus diisi',
      trigger: 'change'
    }
  ],
  districtId: [
    {
      required: true,
      message: 'Kecamatan harus diisi',
      trigger: 'change'
    }
  ],
  subDistrictId: [
    {
      required: true,
      message: 'Kelurahan harus diisi',
      trigger: 'change'
    }
  ],
  address: [
    {
      required: true,
      message: 'Alamat Lengkap harus diisi',
      trigger: 'change'
    }
  ],
  postalCode: [
    {
      required: true,
      message: 'Kode POS harus diisi',
      trigger: 'change'
    }
  ],
  sourceOfFoundId: [
    {
      required: true,
      message: 'Sumber dana harus diisi',
      trigger: 'change'
    }
  ],
  monthlyIncomeId: [
    {
      required: true,
      message: 'Penghasilan Perbulan harus diisi',
      trigger: 'change'
    }
  ],
  bankId: [
    {
      required: true,
      message: 'Nama Rekening Bank harus diisi',
      trigger: 'change'
    }
  ],
  bankAccountNumber: [
    {
      required: true,
      message: 'Nomor Rekening harus diisi',
      trigger: 'change'
    }
  ],
  idCardNumberFile: [
    {
      required: true,
      message: 'File KTP harus diisi',
      trigger: 'blur'
    }
  ],
  selfiePhotoFile: [
    {
      required: true,
      message: 'Foto Wajah harus diisi',
      trigger: 'change'
    }
  ],
  taxNumberFile: [
    {
      required: true,
      message: 'NPWP harus diisi',
      trigger: 'change'
    }
  ],
  proofOfIncomeFile: [
    {
      required: true,
      message: 'Bukti Penghasilan harus diisi',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const payload: TReqRegisterIndividual = {
        ...form,
        birthDate: dayjs(form.birthDate).format('YYYY-MM-DD'),
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

const handleChangeFile = ({ value, field }: { value: string; field: keyof typeof form }) => {
  form[field] = value
}

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
        Registrasi Pendanaan - Pribadi
      </h1>
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
        <h5 class="tw-text-lg tw-font-semibold tw-text-primary md:tw-text-xl">Informasi Dasar</h5>

        <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-4">
          <el-form-item prop="idCardNumber" class="tw-col-span-2">
            <InputField
              v-model="form.idCardNumber"
              v-maska="'#### #### #### ####'"
              label="Nomor KTP"
              placeholder="Cth: 3674 0412 3456 7890"
            />
          </el-form-item>
          <el-form-item prop="taxNumber" class="tw-col-span-2">
            <InputField
              v-model="form.taxNumber"
              v-maska="'###############'"
              type="number"
              label="No. NPWP"
              placeholder="Cth: 2941XXXXX"
            />
          </el-form-item>
          <el-form-item prop="genderId" class="tw-col-span-2">
            <SelectField
              v-model="form.genderId"
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              :options="gender"
            />
          </el-form-item>
          <el-form-item prop="birthPlace">
            <InputField v-model="form.birthPlace" label="Tempat Lahir" placeholder="Cth: Jakarta" />
          </el-form-item>
          <el-form-item prop="birthDate">
            <DatePicker v-model="form.birthDate" label="Tanggal Lahir" placeholder="11/11/2024" />
          </el-form-item>
          <el-form-item prop="provinceId" class="tw-col-span-2">
            <SelectField
              v-model="form.provinceId"
              label="Provinsi"
              placeholder="Pilih Provinsi"
              :options="province"
            />
          </el-form-item>
          <el-form-item prop="cityId" class="tw-col-span-2">
            <SelectField
              v-model="form.cityId"
              label="Kota"
              placeholder="Pilih Kota"
              :options="optionsCity"
            />
          </el-form-item>
          <el-form-item prop="districtId" class="tw-col-span-2">
            <SelectField
              v-model="form.districtId"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              :options="optionsDistrict"
            />
          </el-form-item>
          <el-form-item prop="subDistrictId" class="tw-col-span-2">
            <SelectField
              v-model="form.subDistrictId"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              :options="optionsSubDistrict"
            />
          </el-form-item>
          <el-form-item prop="postalCode" class="tw-col-span-2">
            <InputField
              v-model="form.postalCode"
              label="Kode POS"
              placeholder="Kode POS"
              disabled
            />
          </el-form-item>
          <el-form-item prop="address" class="tw-col-span-2">
            <InputField
              v-model="form.address"
              label="Alamat Lengkap"
              placeholder="Cth: Jl. Pasti Beruntung"
            />
          </el-form-item>
          <el-form-item prop="sourceOfFoundId" class="tw-col-span-2">
            <SelectField
              v-model="form.sourceOfFoundId"
              label="Sumber Dana"
              placeholder="Pilih Sumber Dana"
              :options="sourceOfFound"
            />
          </el-form-item>
          <el-form-item prop="monthlyIncomeId" class="tw-col-span-2">
            <SelectField
              v-model="form.monthlyIncomeId"
              label="Penghasilan Perbulan"
              placeholder="Pilih Penghasilan Perbulan"
              :options="monthlyIncome"
            />
          </el-form-item>
          <el-form-item prop="bankId" class="tw-col-span-2">
            <SelectField
              v-model="form.bankId"
              label="Nama Rekening Bank"
              placeholder="Pilih Nama Bank"
              :options="bank"
            />
          </el-form-item>
          <el-form-item prop="bankAccountNumber" class="tw-col-span-2">
            <InputField
              v-model="form.bankAccountNumber"
              type="number"
              label="No. Rekening"
              placeholder="Masukan Nomor Rekening"
            />
          </el-form-item>
        </div>
      </div>

      <div class="tw-p-5 tw-pt-0">
        <h5 class="tw-text-lg tw-font-semibold tw-text-primary md:tw-text-xl">Unggah Dokumen</h5>
        <p class="tw-text-neutral-desc">
          Format yang disarankan zip, pdf, jpg, jpeg dan png. (Maks.20mb)
        </p>

        <div class="tw-mt-6 tw-grid tw-grid-cols-1 tw-gap-x-4 tw-gap-y-2 tw-pt-2 md:tw-grid-cols-2">
          <el-form-item prop="idCardNumberFile">
            <FileInput
              field="idCardNumberFile"
              file-type="id-card"
              label="Unggah KTP Bagian Depan"
              @update:model-value="handleChangeFile"
            />
          </el-form-item>
          <el-form-item prop="selfiePhotoFile">
            <FileInput
              field="selfiePhotoFile"
              file-type="selfie-photo"
              label="Unggah Foto Wajah"
              @update:model-value="handleChangeFile"
            />
          </el-form-item>
          <el-form-item prop="taxNumberFile">
            <FileInput
              field="taxNumberFile"
              file-type="tax-card"
              label="Unggah NPWP"
              @update:model-value="handleChangeFile"
            />
          </el-form-item>
          <el-form-item prop="proofOfIncomeFile">
            <FileInput
              field="proofOfIncomeFile"
              file-type="bukti-penghasilan"
              label="Unggah Bukti Penghasilan"
              @update:model-value="handleChangeFile"
            />
          </el-form-item>
        </div>

        <div class="tw-mt-6 tw-flex tw-justify-center">
          <el-button
            round
            type="primary"
            size="large"
            @click="submitForm(ruleFormRef)"
            :style="!isMobile ? { paddingLeft: '100px', paddingRight: '100px' } : { width: '100%' }"
          >
            Simpan dan Lanjutkan
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

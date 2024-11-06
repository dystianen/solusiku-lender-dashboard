<script setup lang="ts">
import useMaster from '@/api/queries/master/useMaster'
import useRegistration from '@/api/queries/registration/useRegistration'
import AutoComplete from '@/components/atoms/autocomplete/AutoComplete.vue'
import useScreenType from '@/composables/useScreenType'
import { maskaIdCardNumber, maskaNumberLength16 } from '@/helpers/maska'
import type { FileType, Option } from '@/types/general'
import type { TReqRegisterIndividual } from '@/types/registration'
import { useQueryClient } from '@tanstack/vue-query'
import { ElNotification, dayjs, type FormInstance, type FormRules } from 'element-plus'
import { h, onMounted, reactive, ref, watch } from 'vue'

const queryClient = useQueryClient()
const { isMobile } = useScreenType()

// Queries
const { data: gender } = useMaster.getGender()
const { data: sourceOfFound } = useMaster.getSourceOfFound()
const { data: monthlyIncome } = useMaster.getMonthlyIncome()
const { data: documents } = useRegistration.getAllDocument()
const { data: province } = useMaster.getProvince()
const { mutate: mutateBank } = useMaster.getBank()
const { mutate: city } = useMaster.getCity()
const { mutate: district } = useMaster.getDistrict()
const { mutate: subDistrict } = useMaster.getSubDistrict()
const { mutate: registerIndividual, isPending: isLoadingSubmitRegister } =
  useRegistration.patchRegisterIndividual()

const optionsBank = ref<Option[]>([])
const optionsCity = ref<Option[]>([])
const optionsDistrict = ref<Option[]>([])
const optionsSubDistrict = ref<Option[]>([])
const defaultValue = dayjs().subtract(5, 'year').toDate()

const disabledDate = (time: Date) => {
  const fiveYearsAgo = dayjs().subtract(5, 'year')
  return dayjs(time).isAfter(fiveYearsAgo, 'day')
}

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
  postalCode: ''
})
const bankName = ref('')

const validateIdCard = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Nomor KTP harus diisi'))
  } else if (value.replace(/\s/g, '').length !== 16) {
    callback(new Error('Nomor KTP harus 16 digit'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<TReqRegisterIndividual>>({
  idCardNumber: [{ validator: validateIdCard, trigger: 'change' }],
  taxNumber: [
    { required: true, message: 'Nomor NPWP harus diisi', trigger: 'change' },
    { min: 15, max: 16, message: 'Nomor NPWP harus 15-16 digit', trigger: 'change' }
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
  ]
})

const fieldFile: { key: FileType; label: string; desc?: string }[] = [
  {
    key: 'id-card',
    label: 'Unggah KTP Bagian Depan'
  },
  {
    key: 'selfie-photo',
    label: 'Unggah Foto Wajah'
  },
  {
    key: 'tax-card',
    label: 'Unggah NPWP'
  },
  {
    key: 'bukti-penghasilan',
    label: 'Unggah Bukti Penghasilan'
  }
]

const validateFiles = () => {
  const errors = []
  for (const key in documents.value) {
    const file = fieldFile.find((it) => it.key === key)
    if (documents.value[key] === '0' && file) {
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
      const payload: TReqRegisterIndividual = {
        ...form,
        birthDate: dayjs(form.birthDate).format('YYYY-MM-DD'),
        idCardNumber: form.idCardNumber.replace(/\s/g, '')
      }

      registerIndividual(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['FUNDING_CHECK'] })
        }
      })
    }
  })
}

const querySearch = (queryString: string, cb: any) => {
  mutateBank(
    { search: queryString },
    {
      onSuccess: (res) => {
        cb(res)
      }
    }
  )
}

const handleSelectBank = (item: any) => {
  bankName.value = item.name
  form.bankId = item.id
}

onMounted(() => {
  mutateBank(undefined, {
    onSuccess: (res) => {
      optionsBank.value = res
      console.log({ res })
    }
  })
})

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
              v-maska="maskaIdCardNumber"
              label="Nomor KTP"
              placeholder="Cth: 3674 0412 3456 7890"
            />
          </el-form-item>
          <el-form-item prop="taxNumber" class="tw-col-span-2">
            <InputField
              v-model="form.taxNumber"
              v-maska="maskaNumberLength16"
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
            <DatePicker
              v-model="form.birthDate"
              :disabledDate="disabledDate"
              :default-value="defaultValue"
              label="Tanggal Lahir"
              format="DD/MM/YYYY"
              placeholder="11/11/2019"
            />
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
            <AutoComplete
              v-model="bankName"
              label="Nama Rekening Bank"
              placeholder="Cari Nama Bank"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="true"
              clearable
              @select="handleSelectBank"
            />
          </el-form-item>
          <el-form-item prop="bankAccountNumber" class="tw-col-span-2">
            <InputField
              v-model="form.bankAccountNumber"
              v-maska="'####################'"
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
          <el-form-item v-for="(item, i) in fieldFile" :key="i" :prop="item.key">
            <UploadFile :file-type="item.key" :label="item.label" />
          </el-form-item>
        </div>

        <el-button
          type="primary"
          size="large"
          :loading="isLoadingSubmitRegister"
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

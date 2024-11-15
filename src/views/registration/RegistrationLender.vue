<script lang="ts" setup>
import useUser from '@/api/queries/master/user/useUser'
import useVerification from '@/api/queries/verification/useVerification'
import IcFlagIDN from '@/assets/icons/ic_flag_idn.svg'
import InputField from '@/components/atoms/input/InputField.vue'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import useTimer from '@/composables/useTimer'
import useVerificationToken from '@/composables/useVerificationToken'
import useEmailStore from '@/stores/email'
import type { TReqRegister } from '@/types/verification'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { h, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emailStore = useEmailStore()
const { setTimerCookies } = useTimer()
const { setVerificationToken } = useVerificationToken()

// Queries
const { data: userType } = useUser.getUserType()
const { mutate: submitRegister, isPending } = useVerification.postRegister()

const ruleFormRef = ref<FormInstance>()
const form = reactive<TReqRegister>({
  userTypeId: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  isAgree: false
})

const validatePhoneNumber = (rule: any, value: any, callback: any) => {
  const validValue = `0${value.replace(/\s/g, '')}`
  if (value === '') {
    callback(new Error('No. Hp/Telepon harus diisi'))
  } else if (validValue.length < 7 || validValue.length > 13) {
    callback(new Error('No. Hp/Telepon tidak valid'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Kata Sandi harus diisi'))
  }

  if (value.length < 6 || value.length > 20) {
    return callback(new Error('Password harus terdiri dari 6-20 karakter'))
  }
  if (!/[A-Z]/.test(value) || !/\d/.test(value)) {
    return callback(new Error('Password harus mengandung 1 huruf besar dan 1 angka'))
  }

  if (form.confirmPassword !== '') {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validateField('confirmPassword')
  }

  callback()
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Konfirmasi Kata Sandi harus diisi'))
  }
  if (value !== form.password) {
    callback(new Error('Konfirmasi kata sandi tidak cocok'))
  }

  if (value.length < 6 || value.length > 20) {
    return callback(new Error('Password harus terdiri dari 6-20 karakter'))
  }
  if (!/[A-Z]/.test(value) || !/\d/.test(value)) {
    return callback(new Error('Password harus mengandung 1 huruf besar dan 1 angka'))
  }

  callback()
}

const validateCheckbox = (rule: any, value: any, callback: any) => {
  if (value === false) {
    callback(new Error('Harap centang kotak persetujuan untuk melanjutkan'))
  }
  callback()
}

const rules = reactive<FormRules<TReqRegister>>({
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
      trigger: 'change'
    }
  ],
  phone: [{ validator: validatePhoneNumber, trigger: 'change' }],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatePassword
    }
  ],
  confirmPassword: [
    {
      required: true,
      trigger: 'change',
      validator: validateConfirmPassword
    }
  ],
  isAgree: [
    {
      required: true,
      trigger: 'change',
      validator: validateCheckbox
    }
  ]
})

const handleSelectedType = (value: string) => {
  form.userTypeId = value
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const payload = {
        ...form,
        phone: `+62${form.phone.replace(/\s/g, '')}`
      }
      submitRegister(payload, {
        onSuccess: (res) => {
          setTimerCookies()
          setVerificationToken(res.token)
          emailStore.setEmail(form.email)
          router.push({ name: 'register-otp' })
        },
        onError: (res: any) => {
          const errors = Object.values(res.data.details)
          ElNotification({
            title: 'Errors: ',
            message: h(
              'ul',
              errors.map((error) => h('li', { class: 'tw-text-danger' }, `• ${error}`))
            ),
            type: 'error'
          })
        }
      })
    }
  })
}

watchEffect(() => {
  if (userType.value) {
    form.userTypeId = userType.value[0].id
  }
})
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-3xl md:tw-text-4xl tw-font-semibold">Registrasi Akun Lender</h1>
    <p class="tw-text-neutral-desc">
      Mohon lengkapi informasi dibawah ini dengan <br />
      baik dan benar.
    </p>

    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-flex-col tw-gap-4 tw-w-full"
      status-icon
      :model="form"
      :rules="rules"
      @keydown.enter="submitForm(ruleFormRef)"
    >
      <h5 class="tw-font-semibold">Daftar Sebagai</h5>
      <el-form-item prop="userTypeId">
        <div class="tw-flex tw-gap-8">
          <button
            v-for="item in userType"
            :key="item.id"
            :class="[
              'tw-flex tw-w-[155px] tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-rounded-lg tw-px-10 tw-py-3 tw-shadow-medium-orange md:tw-w-[240px]',
              form.userTypeId === item.id ? 'tw-border-2 tw-border-primary tw-bg-primary/[.05]' : ''
            ]"
            @click.prevent="handleSelectedType(item.id)"
          >
            <h5>
              {{ item.description }}
            </h5>
          </button>
        </div>
      </el-form-item>

      <el-divider style="margin: 0px; margin-bottom: 1rem" />

      <el-form-item prop="fullName">
        <InputField
          v-model="form.fullName"
          label="Nama Lengkap Sesuai KTP"
          placeholder="Cth: Jhon Due"
        />
      </el-form-item>
      <el-form-item prop="email">
        <InputField
          v-model="form.email"
          label="Alamat Email"
          placeholder="Cth: namaanda@domain.com"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <InputField
          v-model="form.phone"
          v-maska="'#### #### ####'"
          label="No. Hp/Telepon"
          placeholder="8128 1234 5678"
        >
          <template #prefix>
            <div class="tw-flex tw-items-center tw-gap-1">
              <img :src="IcFlagIDN" :width="24" :height="20" alt="IcFlagIDN" />
              <span class="tw-text-black">+62</span>
              <el-divider direction="vertical" />
            </div>
          </template>
        </InputField>
      </el-form-item>
      <el-form-item prop="password">
        <InputField
          v-model="form.password"
          type="password"
          autocomplete="off"
          label="Kata Sandi"
          placeholder="Masukan Kata Sandi"
          show-password
        />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <InputField
          v-model="form.confirmPassword"
          type="password"
          autocomplete="off"
          label="Konfirmasi Kata Sandi"
          placeholder="Konfirmasi Kata Sandi"
          show-password
        />
      </el-form-item>

      <el-form-item prop="isAgree">
        <div class="tw-flex tw-items-start tw-gap-2">
          <el-checkbox
            v-model="form.isAgree"
            size="large"
            type="success"
            style="align-items: start"
            class="checkbox-agreement"
          >
            <template #default>
              <p class="tw-leading-normal tw-text-wrap tw-text-neutral-desc tw-w-full">
                Dengan mendaftar, Saya menyetujui
                <span class="tw-text-primary">Syarat dan Ketentuan </span> serta
                <span class="tw-text-primary">Kebijakan Privasi</span> dari Solusiku.
              </p>
            </template>
          </el-checkbox>
        </div>
      </el-form-item>

      <el-button
        round
        type="primary"
        size="large"
        style="width: 100%"
        :loading="isPending"
        @click="submitForm(ruleFormRef)"
      >
        Daftar Sekarang
      </el-button>

      <p class="tw-w-full tw-text-center tw-text-lg tw-text-neutral-desc">
        Sudah Punya Akun?
        <RouterLink to="login" class="tw-font-semibold tw-text-primary"> Masuk </RouterLink>
      </p>
    </el-form>
  </VerificationLayout>
</template>

<style scoped>
:deep(.checkbox-agreement .ep-checkbox__input.is-checked .ep-checkbox__inner) {
  background: #03ab6f;
  border-color: #03ab6f;
  border-radius: 5px;
}
</style>

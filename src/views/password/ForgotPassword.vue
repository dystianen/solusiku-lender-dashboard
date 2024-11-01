<script lang="ts" setup>
import useVerification from '@/api/queries/verification/useVerification'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import useScreenType from '@/composables/useScreenType'
import { setTimerCookies } from '@/cookies/timer'
import { setVerificationToken } from '@/cookies/verificationToken'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const { isMobile } = useScreenType()

// Queries
const { mutate: submitForgotPassword, isPending } = useVerification.postForgotPassword()

interface RuleForm {
  email: string
}
const form = reactive<RuleForm>({
  email: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
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
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      submitForgotPassword(form, {
        onSuccess: (res) => {
          setTimerCookies()
          setVerificationToken(res.token)
          router.push({ name: 'forgot-password-otp' })
        },
        onError: (res: any) => {
          ElMessage.error(res.data.error)
        }
      })
    }
  })
}
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Lupa Kata Sandi?</h1>
    <p class="tw-text-neutral-desc">
      Masukkan Email/No.Telepon yang digunakan saat <br v-if="!isMobile" />
      mendaftar untuk memulihkan kata sandi. Anda akan <br v-if="!isMobile" />
      menerima tautan pengaturan ulang kata sandi.
    </p>

    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-w-full tw-flex-col tw-gap-4"
      status-icon
      :model="form"
      :rules="rules"
      @keydown.enter.prevent="submitForm(ruleFormRef)"
    >
      <el-form-item prop="email">
        <InputField v-model="form.email" label="Email" placeholder="Cth: Jhondue@example.com" />
      </el-form-item>
    </el-form>
    <el-button
      round
      type="primary"
      size="large"
      style="width: 100%"
      :loading="isPending"
      @click="submitForm(ruleFormRef)"
    >
      Kirim Email
    </el-button>
    <RouterLink to="login" class="tw-w-full tw-text-center tw-font-semibold tw-text-primary">
      Kembali ke Halaman Login
    </RouterLink>
  </VerificationLayout>
</template>

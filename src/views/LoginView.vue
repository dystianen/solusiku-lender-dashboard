<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import useScreenType from '@/composables/useScreenType'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import useVerification from '@/api/queries/verification/useVerification'
import { setAccessToken } from '@/cookies/accessToken'
import type { TResError } from '@/types/general'

const router = useRouter()
const { isMobile } = useScreenType()

// Queries
const { mutate: login, isPending } = useVerification.postLogin()

interface RuleForm {
  username: string
  password: string
}
const form = reactive<RuleForm>({
  username: '',
  password: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: 'Email/No.Telepon harus diisi',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Harap masukkan alamat email yang benar',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Password harus diisi',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      login(form, {
        onSuccess: (res) => {
          setAccessToken(res.token)
          router.push({ name: 'dashboard' })
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
    <h1 class="tw-text-4xl tw-font-semibold">
      Selamat Datang Kembali <br v-if="!isMobile" />
      Sahabat<span class="tw-text-primary"> Solusiku</span>
    </h1>
    <p class="tw-text-neutral-desc">
      Silahkan masukan Email/No.Telepon akun Lender <br v-if="!isMobile" />
      yang sudah pernah terdaftar.
    </p>

    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-w-full tw-flex-col tw-gap-4"
      status-icon
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="username">
        <InputField
          v-model="form.username"
          label="Email/No.Telepon"
          placeholder="Cth: JhonDue@example.com"
        />
      </el-form-item>
      <el-form-item prop="password">
        <InputField
          v-model="form.password"
          type="password"
          label="Kata Sandi"
          placeholder="•••••••••••••••"
          show-password
        />
      </el-form-item>
      <RouterLink to="/forgot-password" class="tw-font-semibold tw-text-primary">
        Lupa Kata Sandi?
      </RouterLink>
    </el-form>
    <el-button
      round
      type="primary"
      size="large"
      style="width: 100%"
      :loading="isPending"
      @click="submitForm(ruleFormRef)"
    >
      Masuk
    </el-button>

    <p class="tw-w-full tw-text-center">
      Belum Punya Akun?
      <RouterLink to="/register-type" class="tw-font-semibold tw-text-primary"> Daftar </RouterLink>
    </p>
  </VerificationLayout>
</template>

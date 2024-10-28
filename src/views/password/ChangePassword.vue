<script lang="ts" setup>
import useVerification from '@/api/queries/verification/useVerification'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import { accessToken } from '@/cookies/accessToken'
import validatorPassword from '@/helpers/password'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isLengthValid = ref(false)
const isComplexValid = ref(false)

// Queries
const { mutate: submitChangePassword, isPending } = useVerification.postChangePassword()

interface RuleForm {
  password: string
}
const form = reactive<RuleForm>({
  password: ''
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const payload = {
        ...form,
        token: accessToken.value
      }
      submitChangePassword(payload, {
        onSuccess: () => {
          router.push({ name: 'success-update-password' })
        },
        onError: (res: any) => {
          ElMessage.error(res.data.error)
        }
      })
    }
  })
}

// Function to verify the password length and complexity
const verifyPassword = () => {
  isLengthValid.value = form.password.length >= 6 && form.password.length <= 20
  isComplexValid.value = /[A-Z]/.test(form.password) && /\d/.test(form.password)
}

// Watch the password for changes and verify on update
watch(() => form.password, verifyPassword)
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Buat Kata Sandi Baru</h1>
    <p class="tw-text-lg tw-text-neutral-desc">
      Masukan kata sandi yang sering digunakan agar mudah diingat.
    </p>
    <el-form
      ref="ruleFormRef"
      label-width="auto"
      class="tw-flex tw-w-full tw-flex-col tw-gap-4"
      status-icon
      :model="form"
      :rules="rules"
      @keydown.enter="submitForm(ruleFormRef)"
    >
      <el-form-item prop="password">
        <InputField
          v-model="form.password"
          type="password"
          label="Kata Sandi"
          placeholder="Masukan Kata sandi"
          show-password
        />
      </el-form-item>
    </el-form>

    <div class="tw-text-lg">
      <p>Kata sandi harus memiliki:</p>
      <div class="tw-flex tw-items-center tw-gap-2">
        <el-checkbox v-model="isLengthValid" size="large" color="green" disabled />
        <p class="tw-text-neutral-2">Minimal terdiri dari 6-20 karakter</p>
      </div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <el-checkbox v-model="isComplexValid" size="large" color="green" disabled />
        <p class="tw-text-neutral-2">Minimal terdiri dari 1 huruf besar dan 1 angka</p>
      </div>
    </div>

    <el-button
      round
      type="primary"
      size="large"
      style="width: 100%"
      :loading="isPending"
      @click.prevent="submitForm(ruleFormRef)"
    >
      Selanjutnya
    </el-button>
  </VerificationLayout>
</template>

<style scoped>
:deep(.ep-checkbox.ep-checkbox--large .ep-checkbox__inner) {
  border-radius: 100%;
}

:deep(.ep-checkbox__input.is-checked .ep-checkbox__inner) {
  border-color: #03ab6f;
  background-color: #03ab6f;
}

:deep(.ep-checkbox.is-disabled),
:deep(.ep-checkbox__input.is-disabled .ep-checkbox__inner) {
  cursor: default;
}
:deep(.ep-checkbox__input.is-disabled.is-checked .ep-checkbox__inner::after) {
  border-color: white;
}
</style>

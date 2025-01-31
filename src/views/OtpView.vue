<script lang="ts" setup>
import useVerification from '@/api/queries/verification/useVerification'
import VerificationLayout from '@/components/templates/verification/VerificationLayout.vue'
import useTimer from '@/composables/useTimer'
import useEmailStore from '@/stores/email.store'
import verificationTokenStore from '@/stores/verificationToken.store'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VOtpInput from 'vue3-otp-input'

const { verificationToken, setVerificationToken } = verificationTokenStore()
const { getTimerCookies, removeTimerCookies, setTimerCookies } = useTimer()
const { email } = useEmailStore()
const router = useRouter()
const route = useRoute()
const isForgotPassword = route.name === 'forgot-password-otp'
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)
const bindModal = ref('')
const otpCode = ref('')
const isSend = ref(true)
const isSuccessOtp = ref(false)
const hasError = ref(false)

// Timer
const timerCookies = computed(() => getTimerCookies())
const timer = ref(timerCookies.value)

watch(timerCookies, (newValue) => {
  timer.value = newValue
})

// Queries
const { mutate: submitOTPRegister } = useVerification.postConfirmOTPRegister()
const { mutate: resendOTPRegister, isPending: isLoadingResendR } =
  useVerification.postResendOTPRegister()
const { mutate: submitOTPForgotPassword } = useVerification.postForgotPasswordConfirmOTP()
const { mutate: resendOTPForgotPassword, isPending: isLoadingResendFP } =
  useVerification.postResendForgotPasswordConfirmOTP()

const handleSubmitOTP = () => {
  const payload = {
    token: verificationToken,
    otpCode: otpCode.value
  }

  if (isForgotPassword) {
    submitOTPForgotPassword(payload, {
      onSuccess: (res) => {
        removeTimerCookies()
        setVerificationToken(res.token)
        router.push({ name: 'change-password' })
      },
      onError: (res: any) => {
        ElMessage.error(res.data.error)
      }
    })
  } else {
    submitOTPRegister(payload, {
      onSuccess: (res) => {
        removeTimerCookies()
        setVerificationToken(res.token)
        router.push({ name: 'login' })
      },
      onError: (res: any) => {
        ElMessage.error(res.data.error)
      }
    })
  }
}

const handleOnComplete = (value: string) => {
  otpCode.value = value
}

const handleResendOtp = () => {
  if (isForgotPassword) {
    resendOTPForgotPassword(verificationToken, {
      onSuccess: (res) => {
        isSend.value = true
        setVerificationToken(res.token)
        startCountdown()
      },
      onError: (res: any) => {
        ElMessage.error(res.data.error)
      }
    })
  } else {
    resendOTPRegister(verificationToken, {
      onSuccess: (res) => {
        setVerificationToken(res.token)
        isSend.value = true
        startCountdown()
      },
      onError: (res: any) => {
        ElMessage.error(res.data.error)
      }
    })
  }
}

const onProgress = (value: { totalMilliseconds: number }) => {
  setTimerCookies(value.totalMilliseconds)
}

const handleTimeoutOtp = () => {
  isSend.value = false
}

const startCountdown = () => {
  isSend.value = true
  const countdownTime = 60000
  timer.value = countdownTime
  setTimerCookies(countdownTime)
}

watch(timer, (value) => {
  if (value < 1000) {
    isSend.value = false
  }
})

// handle not error when less then 6 character
watch(otpCode, (value) => {
  if (value.length < 6) {
    hasError.value = false
    isSuccessOtp.value = false
  }
})

const transformSlotProps = (props: Record<string, number>): Record<string, string> => {
  const formattedProps: Record<string, string> = {}

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })

  return formattedProps
}
</script>

<template>
  <VerificationLayout>
    <h1 class="tw-text-4xl tw-font-semibold">Masukan Kode OTP</h1>
    <p class="tw-text-neutral-desc">
      Kami telah mengirim kode OTP via e-mail ke <br />
      <span class="tw-font-semibold tw-text-primary">{{ email }}</span>
    </p>

    <VOtpInput
      ref="otpInput"
      v-model:value="bindModal"
      input-classes="otp-input"
      input-type="number"
      :num-inputs="6"
      :should-auto-focus="true"
      :should-focus-order="true"
      @on-change="handleOnComplete"
      @on-complete="handleOnComplete"
    />

    <template v-if="!isSend">
      <p class="tw-text-center">
        Tidak menerima kode verifikasi?
        <el-button
          type="primary"
          class="tw-text-primary"
          :disabled="isLoadingResendR || isLoadingResendFP"
          @click.prevent="handleResendOtp"
          link
        >
          Kirim Ulang
        </el-button>
      </p>
    </template>

    <template v-else>
      <p class="tw-text-center">
        Kirim ulang setelah
        <v-countdown
          v-slot="{ minutes, seconds }"
          :time="timer"
          :transform="transformSlotProps"
          @progress="onProgress"
          @end="handleTimeoutOtp"
        >
          {{ minutes }}:{{ seconds }}
        </v-countdown>
      </p>
    </template>

    <el-button
      round
      type="primary"
      size="large"
      style="width: 100%"
      :disabled="otpCode.length !== 6"
      @click="handleSubmitOTP()"
    >
      Konfirmasi
    </el-button>
  </VerificationLayout>
</template>

<style scoped>
:deep(.otp-input) {
  width: 60px;
  height: auto;
  padding: 5px;
  margin: 0 10px;
  font-size: 30px;
  border-radius: 0;
  border-bottom: 1px solid #31353b;
  text-align: center;
  font-weight: 600;
}

@media screen and (max-width: 480px) {
  :deep(.otp-input) {
    margin: 0 5px;
    width: 50px;
  }
}

:deep(.otp-input::-webkit-inner-spin-button),
:deep(.otp-input::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(input::placeholder) {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  width: 60px;
}

:deep(.otp-input:focus),
:deep(.otp-input:focus-visible) {
  outline: none;
  border-bottom: 1px solid #de4f3f !important;
}
</style>

import { useMutation } from '@tanstack/vue-query'
import { verificationServices } from './verification-service'
import type {
  TReqChangePassword,
  TReqConfirmOTP,
  TReqForgotPassword,
  TReqLogin,
  TReqRegister
} from '@/types/verification'

const useVerification = {
  postLogin() {
    return useMutation({
      mutationFn: (payload: TReqLogin) => verificationServices.login(payload)
    })
  },
  postRegister() {
    return useMutation({
      mutationFn: (payload: TReqRegister) => verificationServices.register(payload)
    })
  },
  postConfirmOTPRegister() {
    return useMutation({
      mutationFn: (payload: TReqConfirmOTP) => verificationServices.confirmOtp(payload)
    })
  },
  postForgotPassword() {
    return useMutation({
      mutationFn: (payload: TReqForgotPassword) => verificationServices.forgotPassword(payload)
    })
  },
  postForgotPasswordConfirmOTP() {
    return useMutation({
      mutationFn: (payload: TReqConfirmOTP) =>
        verificationServices.forgotPasswordConfirmOTP(payload)
    })
  },
  postResendForgotPasswordConfirmOTP() {
    return useMutation({
      mutationFn: (token: string) => verificationServices.resendForgotPasswordConfirmOTP(token)
    })
  },
  postChangePassword() {
    return useMutation({
      mutationFn: (payload: TReqChangePassword) => verificationServices.changePassword(payload)
    })
  },
  postResendOTPRegister() {
    return useMutation({
      mutationFn: (token: string) => verificationServices.resendOTPRegister(token)
    })
  }
}

export default useVerification

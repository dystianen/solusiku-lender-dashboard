import { useMutation } from '@tanstack/vue-query'
import { verificationServices } from './verification-service'

const useVerification = {
  postLogin() {
    return useMutation({
      mutationFn: verificationServices.login
    })
  },
  postRegister() {
    return useMutation({
      mutationFn: verificationServices.register
    })
  },
  postConfirmOTPRegister() {
    return useMutation({
      mutationFn: verificationServices.confirmOtp
    })
  },
  postForgotPassword() {
    return useMutation({
      mutationFn: verificationServices.forgotPassword
    })
  },
  postForgotPasswordConfirmOTP() {
    return useMutation({
      mutationFn: verificationServices.forgotPasswordConfirmOTP
    })
  },
  postResendForgotPasswordConfirmOTP() {
    return useMutation({
      mutationFn: verificationServices.resendForgotPasswordConfirmOTP
    })
  },
  postChangePassword() {
    return useMutation({
      mutationFn: verificationServices.changePassword
    })
  },
  postResendOTPRegister() {
    return useMutation({
      mutationFn: verificationServices.resendOTPRegister
    })
  },
  logout() {
    return useMutation({
      mutationFn: verificationServices.logout
    })
  }
}

export default useVerification

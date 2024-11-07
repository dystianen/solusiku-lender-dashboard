import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type {
  TReqChangePassword,
  TReqConfirmOTP,
  TReqForgotPassword,
  TReqLogin,
  TReqRegister,
  TResConfirmOTP,
  TResponseRegisterOrChangePassword
} from '@/types/verification'

export const verificationServices = {
  async login(payload: TReqLogin) {
    const { data: login } = await api.post(`${LENDER_API}/login`, payload)
    return login.data ?? {}
  },
  async register(payload: TReqRegister) {
    const { data: register } = await api.post<TResponseRegisterOrChangePassword>(
      `${LENDER_API}/register`,
      payload
    )
    return register.data ?? {}
  },
  async confirmOtp(payload: TReqConfirmOTP) {
    const { data: confirmOtp } = await api.post<TResConfirmOTP>(
      `${LENDER_API}/confirm/otp`,
      payload
    )
    return confirmOtp.data ?? {}
  },
  async forgotPassword(payload: TReqForgotPassword) {
    const { data: forgotPassword } = await api.post<TResponseRegisterOrChangePassword>(
      `${LENDER_API}/forgot/password`,
      payload
    )
    return forgotPassword.data ?? {}
  },
  async forgotPasswordConfirmOTP(payload: TReqConfirmOTP) {
    const { data: confirmOTP } = await api.post(
      `${LENDER_API}/forgot/password/confirm/otp`,
      payload
    )
    return confirmOTP.data ?? {}
  },
  async resendForgotPasswordConfirmOTP(token: string) {
    const { data: forgotPassword } = await api.post(`${LENDER_API}/forgot/password/resend`, {
      token
    })
    return forgotPassword.data ?? {}
  },
  async changePassword(payload: TReqChangePassword) {
    const { data: changePassword } = await api.post(`${LENDER_API}/change/password`, payload)
    return changePassword.data ?? {}
  },
  async resendOTPRegister(token: string) {
    const { data: resendConfirmOTP } = await api.post(`${LENDER_API}/register/otp/resend`, {
      token
    })
    return resendConfirmOTP.data ?? {}
  },
  async logout() {
    const { data: signout } = await api.get(`${LENDER_API}/signout`)
    return signout.data
  }
}

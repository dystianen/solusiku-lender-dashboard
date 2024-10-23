import type { GeneralResponse } from './general'

export type TReqRegister = {
  userTypeId: string
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  isAgree: boolean
}

export type TResDataRegisterChangePassword = {
  token: string
  message: string
}

export type TResponseRegisterOrChangePassword = GeneralResponse<TResDataRegisterChangePassword>

export type TReqConfirmOTP = {
  otpCode: string
  token: string
}

export type TReqForgotPassword = {
  email: string
}

export type TToken = {
  token: string
}
export type TResConfirmOTP = GeneralResponse<TToken>

export type TReqChangePassword = {
  token: string
  password: string
}

export type TReqLogin = {
  username: string
  password: string
}

import { api } from '@/config/axios'
import { LENDER_API } from '@/api/BaseApiUrl'
import type { TReqRegister } from '@/types/verification'

export const verificationServices = {
  async login() {
    const { data } = await api.post(`${LENDER_API}/login`)
    return data ?? {}
  },

  async register(payload: TReqRegister) {
    const { data } = await api.post(`${LENDER_API}/register`, payload)
    return data ?? {}
  }
}

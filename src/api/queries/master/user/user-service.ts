import { api } from '@/config/axios'
import { LENDER_API } from '@/api/BaseApiUrl'
import type { TResUserType } from '@/types/user'

export const userServices = {
  async userType() {
    const { data: userType } = await api.get<TResUserType>(`${LENDER_API}/data/userType`)
    return userType?.data ?? []
  }
}

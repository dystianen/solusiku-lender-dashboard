import { api } from '@/config/axios'
import { LENDER_API } from '@/api/BaseApiUrl'
import type { TResUserType } from '@/types/user'

const masterServices = {
  async gender() {
    const { data: gender } = await api.get<TResUserType>(`${LENDER_API}/data/gender`)
    return gender?.data ?? []
  },
  async province() {
    const { data: province } = await api.get<TResUserType>(`${LENDER_API}/data/province`)
    return province?.data ?? []
  },
  async city(provinceId: string) {
    const { data: cities } = await api.get<TResUserType>(`${LENDER_API}/data/city/${provinceId}`)
    return cities?.data ?? []
  }
}

export default masterServices

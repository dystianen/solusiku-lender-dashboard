import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { TReqFilter } from '@/types/general'

const fundingServices = {
  async fundingHistory(params?: TReqFilter) {
    const { data: funding } = await api.get(`${LENDER_API}/funding`, {
      params
    })
    return funding ?? []
  }
}

export default fundingServices

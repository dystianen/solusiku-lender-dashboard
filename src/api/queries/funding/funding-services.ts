import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { TResFundingHistory } from '@/types/funding'
import type { TReqFilter } from '@/types/general'

const fundingServices = {
  async fundingHistory(params?: TReqFilter) {
    const { data: funding } = await api.get<TResFundingHistory>(`${LENDER_API}/funding`, {
      params
    })
    return {
      data: funding.data,
      totalCount: Number(funding.totalCount)
    }
  }
}

export default fundingServices

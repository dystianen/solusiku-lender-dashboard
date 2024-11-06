import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { TResDashboard } from '@/types/dashboard'

const dashboardServices = {
  async dashboard() {
    const { data: funding } = await api.get<TResDashboard>(`${LENDER_API}/dashboard`)
    return funding.data
  }
}

export default dashboardServices

import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'

const offeringServices = {
  async offering() {
    const { data: offering } = await api.get(`${LENDER_API}/offering`)
    return offering.data ?? []
  }
}

export default offeringServices

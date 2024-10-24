import { useQuery } from '@tanstack/vue-query'
import offeringServices from './offering-services'

const useOffering = {
  getOffering() {
    return useQuery({
      queryKey: ['OFFERING'],
      queryFn: offeringServices.offering
    })
  }
}

export default useOffering

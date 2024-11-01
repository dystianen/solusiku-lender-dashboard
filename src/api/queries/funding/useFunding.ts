import { useMutation } from '@tanstack/vue-query'
import fundingServices from './funding-services'

const useFunding = {
  getFundingHistory() {
    return useMutation({
      mutationFn: fundingServices.fundingHistory
    })
  }
}

export default useFunding

import { useMutation } from '@tanstack/vue-query'
import { verificationServices } from './verification-service'
import type { TReqRegister } from '@/types/verification'

const useVerification = {
  login() {
    return useMutation({
      mutationFn: () => verificationServices.login()
    })
  },
  postRegister() {
    return useMutation({
      mutationFn: (payload: TReqRegister) => verificationServices.register(payload)
    })
  }
}

export default useVerification

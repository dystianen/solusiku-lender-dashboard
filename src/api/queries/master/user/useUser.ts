import { useQuery } from '@tanstack/vue-query'
import { userServices } from './user-service'

const useUser = {
  getUserType() {
    return useQuery({
      queryKey: ['USER_TYPE'],
      queryFn: () => userServices.userType()
    })
  }
}

export default useUser

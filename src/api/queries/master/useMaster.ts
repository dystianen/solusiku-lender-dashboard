import { useMutation, useQuery } from '@tanstack/vue-query'
import masterServices from './master-service'

const useMaster = {
  getGender() {
    return useQuery({
      queryKey: ['GENDER'],
      queryFn: () => masterServices.gender()
    })
  },
  getProvince() {
    return useQuery({
      queryKey: ['PROVINCE'],
      queryFn: () => masterServices.province()
    })
  },
  getCity() {
    return useMutation({
      mutationFn: (provinceId: string) => masterServices.city(provinceId)
    })
  }
}

export default useMaster

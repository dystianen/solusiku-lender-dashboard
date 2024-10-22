import { useMutation, useQuery } from '@tanstack/vue-query'
import masterServices from './master-service'
import type { TReqIdWithFilter } from '@/types/master'
import type { TReqFilter } from '@/types/general'

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
      mutationFn: (payload: TReqIdWithFilter) => masterServices.city(payload)
    })
  },
  getDistrict() {
    return useMutation({
      mutationFn: (payload: TReqIdWithFilter) => masterServices.district(payload)
    })
  },
  getSubDistrict() {
    return useMutation({
      mutationFn: (payload: TReqIdWithFilter) => masterServices.subDistrict(payload)
    })
  },
  getSourceOfFound() {
    return useQuery({
      queryKey: ['SOURCE_OF_FOUND'],
      queryFn: () => masterServices.sourceOfFound()
    })
  },
  getMonthlyIncome() {
    return useQuery({
      queryKey: ['MONTHLY_INCOME'],
      queryFn: () => masterServices.monthlyIncome()
    })
  },
  getBank() {
    return useQuery({
      queryKey: ['BANK'],
      queryFn: () => masterServices.bank()
    })
  }
}

export default useMaster

import type { TReqIdWithFilter } from '@/types/master'
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
  },
  getLegalEntity() {
    return useQuery({
      queryKey: ['LEGAL_ENTITY'],
      queryFn: () => masterServices.legalEntity()
    })
  },
  getBusinessLicense() {
    return useQuery({
      queryKey: ['BUSINESS_LICENSE'],
      queryFn: () => masterServices.businessLicense()
    })
  },
  getBusinessField() {
    return useQuery({
      queryKey: ['BUSINESS_FIELD'],
      queryFn: () => masterServices.businessField()
    })
  }
}

export default useMaster

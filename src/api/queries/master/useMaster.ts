import { useMutation, useQuery } from '@tanstack/vue-query'
import masterServices from './master-service'

const useMaster = {
  getGender() {
    return useQuery({
      queryKey: ['GENDER'],
      queryFn: masterServices.gender
    })
  },
  getProvince() {
    return useQuery({
      queryKey: ['PROVINCE'],
      queryFn: masterServices.province
    })
  },
  getCity() {
    return useMutation({
      mutationFn: masterServices.city
    })
  },
  getDistrict() {
    return useMutation({
      mutationFn: masterServices.district
    })
  },
  getSubDistrict() {
    return useMutation({
      mutationFn: masterServices.subDistrict
    })
  },
  getSourceOfFound() {
    return useQuery({
      queryKey: ['SOURCE_OF_FOUND'],
      queryFn: masterServices.sourceOfFound
    })
  },
  getMonthlyIncome() {
    return useQuery({
      queryKey: ['MONTHLY_INCOME'],
      queryFn: masterServices.monthlyIncome
    })
  },
  getBank() {
    return useQuery({
      queryKey: ['BANK'],
      queryFn: masterServices.bank
    })
  },
  getLegalEntity() {
    return useQuery({
      queryKey: ['LEGAL_ENTITY'],
      queryFn: masterServices.legalEntity
    })
  },
  getBusinessLicense() {
    return useQuery({
      queryKey: ['BUSINESS_LICENSE'],
      queryFn: masterServices.businessLicense
    })
  },
  getBusinessField() {
    return useQuery({
      queryKey: ['BUSINESS_FIELD'],
      queryFn: masterServices.businessField
    })
  }
}

export default useMaster

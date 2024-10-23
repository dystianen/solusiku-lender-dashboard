import type { FileType } from '@/types/general'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { registationServices } from './registration-service'

const useRegistration = {
  getFundingCheck() {
    return useQuery({
      queryKey: ['FUNDING_CHECK'],
      queryFn: registationServices.fundingCheck
    })
  },
  getAllDocument() {
    return useQuery({
      queryKey: ['DOCUMENT'],
      queryFn: registationServices.document
    })
  },
  getDocument(fileType: FileType) {
    return useQuery({
      queryKey: ['DOCUMENT_TYPE', { fileType }],
      queryFn: () => registationServices.documentPerType(fileType)
    })
  },
  postUploadDocument() {
    return useMutation({
      mutationFn: registationServices.uploadDocument
    })
  },
  deleteDocument() {
    return useMutation({
      mutationFn: registationServices.deleteDocument
    })
  },
  patchRegisterIndividual() {
    return useMutation({
      mutationFn: registationServices.registerIndividual
    })
  },
  patchRegisterInstitution() {
    return useMutation({
      mutationFn: registationServices.registerInstitution
    })
  }
}

export default useRegistration

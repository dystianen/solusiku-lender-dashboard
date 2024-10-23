import type { FileType } from '@/types/general'
import type { TReqUploadDocument } from '@/types/master'
import type { TReqRegisterIndividual, TReqRegisterInstitution } from '@/types/registration'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { registationServices } from './registration-service'

const useRegistration = {
  getDocument(fileType: FileType) {
    return useQuery({
      queryKey: ['DOCUMENT', { fileType }],
      queryFn: () => registationServices.document(fileType)
    })
  },
  postUploadDocument() {
    return useMutation({
      mutationFn: (payload: TReqUploadDocument) => registationServices.uploadDocument(payload)
    })
  },
  deleteDocument() {
    return useMutation({
      mutationFn: (id: string) => registationServices.deleteDocument(id)
    })
  },
  patchRegisterIndividual() {
    return useMutation({
      mutationFn: (payload: TReqRegisterIndividual) =>
        registationServices.registerIndividual(payload)
    })
  },
  patchRegisterInstitution() {
    return useMutation({
      mutationFn: (payload: TReqRegisterInstitution) =>
        registationServices.registerInstitution(payload)
    })
  },
  getFundingCheck() {
    return useQuery({
      queryKey: ['FUNDING_CHECK'],
      queryFn: () => registationServices.fundingCheck()
    })
  }
}

export default useRegistration

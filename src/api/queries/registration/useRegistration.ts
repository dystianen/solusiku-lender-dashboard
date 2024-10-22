import { useMutation, useQuery } from '@tanstack/vue-query'
import { registationServices } from './registration-service'
import type { TReqUploadDocument } from '@/types/master'
import type { FileType } from '@/types/general'
import type { TReqRegisterIndividual } from '@/types/registration'

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
  }
}

export default useRegistration

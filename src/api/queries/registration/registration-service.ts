import { api } from '@/config/axios'
import { LENDER_API } from '@/api/BaseApiUrl'
import type { TReqUploadDocument, TResDocument } from '@/types/master'
import type { FileType } from '@/types/general'
import type { TReqRegisterIndividual } from '@/types/registration'

export const registationServices = {
  async document(fileType: FileType) {
    const { data: document } = await api.get<TResDocument>(`${LENDER_API}/document/${fileType}`)
    return document.data ?? []
  },
  async uploadDocument(payload: TReqUploadDocument) {
    const { fileType, formData } = payload
    const { data: document } = await api.post(
      `${LENDER_API}/document/upload/${fileType}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return document.data ?? {}
  },
  async deleteDocument(id: string) {
    const { data: document } = await api.delete(`${LENDER_API}/document/${id}`)
    return document.data ?? {}
  },
  async registerIndividual(payload: TReqRegisterIndividual) {
    const { data: registerIndividual } = await api.patch(
      `${LENDER_API}/profile/funding/individual`,
      payload
    )
    return registerIndividual.data ?? {}
  }
}

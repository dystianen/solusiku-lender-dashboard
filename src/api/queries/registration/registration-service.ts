import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { FileType } from '@/types/general'
import type { TReqUploadDocument, TResDocument, TResFundingCheck } from '@/types/master'
import type { TReqRegisterIndividual, TReqRegisterInstitution } from '@/types/registration'

export const registationServices = {
  async fundingCheck() {
    const { data: document } = await api.get<TResFundingCheck>(
      `${LENDER_API}/profile/funding/check`
    )
    return document.data ?? {}
  },
  async document() {
    const { data: document } = await api.get(`${LENDER_API}/document`)
    return document.data ?? {}
  },
  async documentPerType(fileType: FileType) {
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
  },
  async registerInstitution(payload: TReqRegisterInstitution) {
    const { data: registerInstitution } = await api.patch(
      `${LENDER_API}/profile/funding/instutution`,
      payload
    )
    return registerInstitution.data ?? {}
  }
}

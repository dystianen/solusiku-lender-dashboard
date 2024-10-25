import { LENDER_API } from '@/api/BaseApiUrl'
import { api } from '@/config/axios'
import type { TReqFilter } from '@/types/general'

const offeringServices = {
  async offering(params?: TReqFilter) {
    const { data: offering } = await api.get(`${LENDER_API}/offering`, {
      params
    })
    return offering ?? []
  },
  async offeringApproval(payload?: { offeringIds: string[] }) {
    const { data: offering } = await api.post(`${LENDER_API}/offering/approval`, payload)
    return offering.data
  },
  async offeringCheck() {
    const { data: offering } = await api.get(`${LENDER_API}/offering/check`)
    return offering.data
  },
  async signingOTPRequest(payload: { isAgree: boolean; approvalId: string }) {
    const { data: offering } = await api.post(`${LENDER_API}/signing/otp/request`, payload)
    return offering.data
  },
  async signingOTPValidate(payload: { transactionId: string; otpCode: string }) {
    const { data: offering } = await api.post(`${LENDER_API}/signing/otp/validate`, payload)
    return offering.data
  },
  async documentServiceAgreement(approvalId: string) {
    const { data: offering } = await api.get(
      `${LENDER_API}/signing/document/service/agreement/${approvalId}`
    )
    return offering.data
  },
  async documentLoanAgreement(approvalId: string) {
    const { data: offering } = await api.get(
      `${LENDER_API}/signing/document/loan/agreement/${approvalId}`
    )
    return offering.data
  }
}

export default offeringServices

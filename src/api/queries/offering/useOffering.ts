import { useMutation } from '@tanstack/vue-query'
import offeringServices from './offering-services'

const useOffering = {
  getOffering() {
    return useMutation({
      mutationFn: offeringServices.offering
    })
  },
  postOfferingApproval() {
    return useMutation({
      mutationFn: offeringServices.offeringApproval
    })
  },
  getOfferringCheck() {
    return useMutation({
      mutationFn: offeringServices.offeringCheck
    })
  },
  postSigningOTPRequest() {
    return useMutation({
      mutationFn: offeringServices.signingOTPRequest
    })
  },
  postSigningOTPValidate() {
    return useMutation({
      mutationFn: offeringServices.signingOTPValidate
    })
  },
  getDocumentServiceAgreement() {
    return useMutation({
      mutationFn: offeringServices.documentServiceAgreement
    })
  },
  getDocumentLoanAgreement() {
    return useMutation({
      mutationFn: offeringServices.documentLoanAgreement
    })
  }
}

export default useOffering

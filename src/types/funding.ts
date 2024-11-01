import type { GeneralResponse } from './general'

export interface TFundingOpportunities {
  createdOn: Date
  modifiedOn: Date
  id: string
  applicationId: string
  riskLevel: number
  isAuto: boolean
  isApproved: boolean
  originId: string
  originCreateTime: Date
  originStatus: string
  originPurposeId: string
  productId: string
  borrowerId: string
  platformId: string
  termPeriod: number
  termDays: number
  statusId: string
  purposeId: string
  purposeName: string
  purposeOriginName: string
  pgVendorId: string
  productName: string
  loanPeriod: number
  loanTenor: number
  userName: string
  amountRequested: string
  loanId: string
}
export type TResFundingOpportunities = GeneralResponse<TFundingOpportunities[]>

export type TFundingHistory = {
  createdOn: Date
  modifiedOn: Date
  id: string
  applicationId: string
  statusId: string
  amountPrinciple: number
  amountProvision: number
  amountDisburse: number
  startOn: Date
  finishOn: Date
  activeOn: Date
  dpd: number
  dpdMax: number
  borrowerId: string
  lenderId: string
  productName: string
  loanStatusName: string
  termPeriod: number
  termDays: number
  ownerLenderAmount: number
}
export type TResFundingHistory = GeneralResponse<TFundingHistory[]>

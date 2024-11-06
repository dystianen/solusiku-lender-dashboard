import type { GeneralResponse } from './general'

export interface TDashboard {
  totalFunding: number
  totalActiveFunding: number
  totalFeeLender: number
  totalPaymentPrinciple: number
  payment: Payment
  income: Income
}
export type TResDashboard = GeneralResponse<TDashboard>

export interface Income {
  fundingOldAmount: number
  fundingCurrentAmount: number
  fundingPercentage: number
  months: number[]
  incomes: number[]
  incomeRates: number[]
}

export interface Payment {
  totalPaymentPrinciple: number
  totalPaymentRate: number
  products: Product[]
}

export interface Product {
  productName: string
  paymentAmount: number
  totalAmount: number
}

export interface GeneralResponse<T = unknown> {
  timestamp: string
  status: number
  success: boolean
  data: T
}

export type StringOrNumber = string | number

export type Option = {
  id: StringOrNumber
  name: StringOrNumber
}

export type TResError = {
  status: number
  data: {
    error: string
    status: number
    success: boolean
    timestamp: string
  }
}

export type FileType =
  | 'id-card'
  | 'selfie-photo'
  | 'tax-card'
  | 'bukti-penghasilan'
  | 'akta-pendirian'
  | 'akta-perubahan'
  | 'sk-kemenkumham-akta-pendirian'
  | 'sk-kemenkumham-akta-perubahan'
  | 'nib'
  | 'rekening-koran'
  | 'keuangan-perusahaan-inhouse'
  | 'siup'
  | 'tdp'
  | 'keuangan-perusahaan-audited'

export interface TReqFilter {
  search?: string
  length?: number
  start?: number
  sort?: string
  isDesc?: boolean
}

export type TSize = 'default' | 'small' | 'large'

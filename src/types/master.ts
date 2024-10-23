import type { FileType, GeneralResponse, TReqFilter } from './general'

export interface TReqIdWithFilter extends TReqFilter {
  id: string
}

export type TReqUploadDocument = {
  fileType: FileType
  formData: FormData
}

export interface TDocument {
  id: string
  name: string
  user: User
  type: {
    id: string
    tag: string
    name: string
  }
  fileUrl: string
  ossSrc: string
  fileSize: string
}

export type TResDocument = GeneralResponse<TDocument[]>

export interface User {
  id: string
  idSeq: number
  name: string
  type: UserType
  mobilePhone: string
  email: string
}

export interface UserType {
  createdBy: string
  createdOn: Date
  modifiedBy: string
  modifiedOn: Date
  id: string
  name: string
  description: string
}

type TFundingCheck = {
  status: 'registered' | 'verified' | 'completed'
  userType: 'Pribadi' | 'Perusahaan'
}

export type TResFundingCheck = GeneralResponse<TFundingCheck>

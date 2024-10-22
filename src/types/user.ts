import type { GeneralResponse } from './general'

export type TUserType = {
  createdBy: string
  createdOn: Date
  modifiedBy: string
  modifiedOn: Date
  id: string
  name: string
  description: string
}
export type TResUserType = GeneralResponse<TUserType[]>

export type TCity = {
  createdBy: string
  createdOn: Date
  modifiedBy: string
  modifiedOn: Date
  id: string
  name: string
  idRef: number
  code: string
  sortOrder: number
  provinceId?: string
  province?: TCity
}

export type TResCity = GeneralResponse<TCity[]>

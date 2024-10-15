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

export interface GeneralResponse<T = unknown> {
  timestamp: string
  status: number
  success: boolean
  data: T
}

export type StringOrNumber = string | number

export type Options = {
  id: StringOrNumber
  name: StringOrNumber
}

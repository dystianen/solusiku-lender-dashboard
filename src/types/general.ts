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

export type TResError = {
  status: number
  data: {
    error: string
    status: number
    success: boolean
    timestamp: string
  }
}

export interface GeneralResponse<T = unknown> {
  timestamp: string
  status: number
  success: boolean
  data: T
}

export type AffiliateStatus = "free" | "paid" | "cancelled"

export interface AffiliateClient {
  id: number
  email: string
  status: AffiliateStatus
  created_at: string
}

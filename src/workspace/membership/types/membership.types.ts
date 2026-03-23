export interface MembershipPlan {
  id: string
  name: string
  price: number
  description?: string | null
  features?: string[] | null
  created_at?: string
}

export interface MembershipSubscription {
  id?: string
  user_id: string
  plan_id: string
  status?: "active" | "canceled" | "expired" | null
  started_at?: string | null
  expires_at?: string | null
  created_at?: string
}

import { supabase } from "@/supabase"
import type { MembershipPlan, MembershipSubscription } from "@/workspace/membership/types/membership.types.ts"
import { useMembershipStore } from "../store/membership.store"

// ===============================
// 🔵 API FUNCTIONS
// ===============================

// جلب خطط العضوية
export async function getMembershipPlans() {
  const { data, error } = await supabase
    .from("membership_plans")
    .select("*")
    .order("price", { ascending: true })

  if (error) throw error
  return data as MembershipPlan[]
}

// جلب اشتراك المستخدم
export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from("membership_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as MembershipSubscription | null
}

// تحديث اشتراك المستخدم
export async function saveUserSubscription(userId: string, planId: string) {
  const { data, error } = await supabase
    .from("membership_subscriptions")
    .upsert({ user_id: userId, plan_id: planId }, { onConflict: "user_id" })
    .select()
    .single()

  if (error) throw error
  return data as MembershipSubscription
}

// ===============================
// 🔵 REALTIME EVENTS
// ===============================

let channel: any = null

export function subscribeToMembership(userId: string) {
  const store = useMembershipStore()

  if (channel) return

  channel = supabase
    .channel(`membership-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "membership_subscriptions",
        filter: `user_id=eq.${userId}`,
      },
      payload => {
        store.updateSubscriptionFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeFromMembership() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

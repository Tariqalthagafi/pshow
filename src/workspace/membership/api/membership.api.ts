import { supabase } from "@/lib/supabaseClient"
import type { MembershipPlan, MembershipSubscription } from "../types/membership.types"

export async function fetchMembershipPlans() {
  const { data, error } = await supabase
    .from("membership_plans")
    .select("*")
    .order("price", { ascending: true })

  if (error) throw error
  return data as MembershipPlan[]
}

export async function fetchUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from("membership_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as MembershipSubscription | null
}

export async function updateUserSubscription(userId: string, planId: string) {
  const { data, error } = await supabase
    .from("membership_subscriptions")
    .upsert({ user_id: userId, plan_id: planId }, { onConflict: "user_id" })
    .select()
    .single()

  if (error) throw error
  return data as MembershipSubscription
}

import { supabase } from "@/supabase"
import type { AffiliateClient } from "../types/affiliate.types"

// جلب العملاء المرتبطين بالمستخدم
export async function fetchAffiliateClients(userId: string) {
  const { data, error } = await supabase
    .from("affiliate_clients")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as AffiliateClient[]
}

// جلب رابط الإحالة
export async function fetchAffiliateLink(userId: string) {
  const { data, error } = await supabase
    .from("affiliate_links")
    .select("code")
    .eq("user_id", userId)
    .single()

  if (error) throw error
  return data?.code
}

// إنشاء رابط إحالة جديد
export async function createAffiliateLink(userId: string, code: string) {
  const { data, error } = await supabase
    .from("affiliate_links")
    .insert({ user_id: userId, code })
    .select()
    .single()

  if (error) throw error
  return data
}

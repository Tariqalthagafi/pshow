import { supabase } from "@/lib/supabaseClient"
import type { UserSettings } from "../types/settings.types"

// جلب إعدادات المستخدم
export async function fetchUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as UserSettings | null
}

// تحديث إعدادات المستخدم
export async function updateUserSettings(userId: string, payload: Partial<UserSettings>) {
  const { data, error } = await supabase
    .from("user_settings")
    .upsert({ user_id: userId, ...payload }, { onConflict: "user_id" })
    .select()
    .single()

  if (error) throw error
  return data as UserSettings
}

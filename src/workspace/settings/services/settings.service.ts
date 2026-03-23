import { supabase } from "@/supabase"
import type { UserSettings } from "@/workspace/settings/types/settings.types"
import { useSettingsStore } from "../store/settings.store"

// جلسة المستخدم
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

// جلب بروفايل المستخدم (الاسم فقط)
export async function getProfile(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .single()

  return data || null
}

// تحديث الاسم
export async function updateFullName(userId: string, fullName: string) {
  return supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", userId)
}

// جلب إعدادات المستخدم
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as UserSettings | null
}

// تحديث إعدادات المستخدم
export async function saveUserSettings(userId: string, payload: Partial<UserSettings>) {
  const { data, error } = await supabase
    .from("user_settings")
    .upsert({ user_id: userId, ...payload }, { onConflict: "user_id" })
    .select()
    .single()

  if (error) throw error
  return data as UserSettings
}

// ===============================
// 🔥 Realtime Events (دمج ملف events هنا)
// ===============================

let channel: any = null

export function subscribeToUserSettings(userId: string) {
  const store = useSettingsStore()

  if (channel) return

  channel = supabase
    .channel(`settings-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "user_settings",
        filter: `user_id=eq.${userId}`,
      },
      payload => {
        store.updateSettingsFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeFromUserSettings() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

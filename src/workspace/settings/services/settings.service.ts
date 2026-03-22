import { supabase } from "@/supabase"

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

export async function getProfile(userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .single()

  return data || null
}

export async function updateFullName(userId: string, fullName: string) {
  return supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", userId)
}

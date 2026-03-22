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

export async function signOut() {
  return supabase.auth.signOut()
}

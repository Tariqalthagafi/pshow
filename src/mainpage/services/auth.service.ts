import { supabase } from "@/supabase"

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://displix.app/offers"   // ← الصفحة الرئيسية فقط
    }
  })

  if (error) {
    console.error("Google Auth Error:", error)
  }
}

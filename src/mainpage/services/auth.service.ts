import { supabase } from "@/supabase"

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://eypmuxcspmyizigzapsy.supabase.co/auth/v1/callback?next=/offers"
    }
  })

  if (error) {
    console.error("Google Auth Error:", error)
  }
}

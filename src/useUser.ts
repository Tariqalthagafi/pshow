import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import type { User } from "@supabase/supabase-js"

const user = ref<User | null>(null)
const loading = ref<boolean>(true)

export function useUser() {
  const loadUser = async () => {
    loading.value = true

    const { data } = await supabase.auth.getUser()
    user.value = data.user ?? null

    loading.value = false
  }

  onMounted(() => {
    loadUser()

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  })

  return {
    user,
    loading,
    loadUser
  }
}

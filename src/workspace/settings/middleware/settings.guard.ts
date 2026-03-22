import { useSupabaseUser } from "@/composables/useUser"

export function settingsGuard(to, from, next) {
  const user = useSupabaseUser()

  if (!user.value) return next("/login")

  next()
}

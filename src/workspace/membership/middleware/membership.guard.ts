import { useSupabaseUser } from "@/composables/useUser"

export function membershipGuard(to, from, next) {
  const user = useSupabaseUser()

  if (!user.value) return next("/login")

  next()
}

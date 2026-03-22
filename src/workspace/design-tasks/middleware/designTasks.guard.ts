import { useSupabaseUser } from "@/composables/useUser"

export function designTasksGuard(to, from, next) {
  const user = useSupabaseUser()

  if (!user.value) return next("/login")

  if (!user.value.isDesigner) {
    return next("/not-allowed")
  }

  next()
}

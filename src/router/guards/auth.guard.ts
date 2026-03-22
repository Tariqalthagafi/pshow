import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useUser } from "@/useUser"

export function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { user } = useUser()

  if (!user.value) {
    return next("/")
  }

  next()
}

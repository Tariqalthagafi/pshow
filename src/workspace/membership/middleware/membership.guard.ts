import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useUser } from "@/useUser"

export function membershipGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { user } = useUser()

  if (!user.value) {
    return next("/login")
  }

  next()
}

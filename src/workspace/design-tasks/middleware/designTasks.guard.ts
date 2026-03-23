import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useUser } from "@/useUser"

export function designTasksGuard(
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

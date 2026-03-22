import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useUser } from "@/useUser"

export function offersGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { user } = useUser()

  if (!user.value) {
    return next("/")   // العودة للصفحة الرئيسية لأنها تحتوي زر تسجيل الدخول
  }

  next()
}

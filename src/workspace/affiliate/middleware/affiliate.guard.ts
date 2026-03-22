import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useAffiliateCore } from "../composables/useAffiliateCore"

export async function affiliateGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { isLoggedIn, isAffiliateReady, loadAffiliate } = useAffiliateCore()

  if (!isLoggedIn.value) return next("/")

  await loadAffiliate()

  if (!isAffiliateReady.value) return next("/affiliate/setup")

  next()
}

import { computed } from "vue"
import { useUser } from "@/useUser"
import { useAffiliateStore } from "../store/affiliate.store"

export function useAffiliateCore() {
  const { user, loading: userLoading } = useUser()
  const affiliateStore = useAffiliateStore()

  const isLoggedIn = computed(() => !!user.value)

  const isAffiliateReady = computed(() => {
    return affiliateStore.initialized && !!affiliateStore.affiliateProfile
  })

  const loading = computed(() => {
    return userLoading.value || affiliateStore.loading
  })

  async function loadAffiliate() {
    if (!user.value) return

    if (!affiliateStore.initialized) {
      await affiliateStore.loadAffiliateData(user.value.id)
    }
  }

  return {
    user,
    isLoggedIn,
    isAffiliateReady,
    loading,
    affiliateStore,
    loadAffiliate
  }
}

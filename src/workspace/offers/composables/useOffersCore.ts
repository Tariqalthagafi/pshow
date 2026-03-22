import { computed } from "vue"
import { useUser } from "@/useUser"
import { useOffersStore } from "../store/offers.store"

export function useOffersCore() {
  const { user, loading: userLoading } = useUser()
  const offersStore = useOffersStore()

  const isLoggedIn = computed(() => !!user.value)

  const isOffersReady = computed(() => {
    return offersStore.initialized && Array.isArray(offersStore.offers)
  })

  const loading = computed(() => {
    return userLoading.value || offersStore.loading
  })

  async function loadOffers() {
    if (!user.value) return

    if (!offersStore.initialized) {
      await offersStore.loadOffers(user.value.id)
    }
  }

  return {
    user,
    isLoggedIn,
    isOffersReady,
    loading,
    offersStore,
    loadOffers
  }
}

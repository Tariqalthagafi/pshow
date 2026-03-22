import { ref } from "vue"
import type { Screen, Offer } from "../types/screen.types"
import {
  getUser,
  getMembership,
  getOffers,
  getScreens,
  getActivationData,
  updateActivation,
  assignOfferToScreen,
  updateOfferResolution
} from "../services/screens.service"

export function useScreens() {
  const loading = ref(true)
  const screens = ref<Screen[]>([])
  const offers = ref<Offer[]>([])
  const membership = ref<"free" | "pro">("free")
  const openScreenId = ref<number | null>(null)   // ← تم التعديل هنا
  const user = ref<any>(null)

  /* تحميل العروض */
  const loadOffers = async () => {
    const data = await getOffers(user.value.id)
    offers.value = data || []
  }

  /* تحميل الشاشات + دمج screen_activation */
  const loadScreens = async () => {
    loading.value = true

    const screensData = await getScreens(user.value.id)
    const activationData = await getActivationData()

    screens.value = screensData.map((screen) => {
      const match = activationData.find((a) => a.screen_id === screen.screen_id)

      return {
        ...screen,
        is_active: match?.is_active ?? false,
        last_seen: match?.last_seen ?? null,
        device_id: match?.device_id ?? null,
        app_version: match?.app_version ?? null,
        os_version: match?.os_version ?? null,
        resolution: match?.resolution ?? null,
        ip_address: match?.ip_address ?? null
      }
    })

    loading.value = false
  }

  /* قفل الشاشات حسب العضوية */
  const isLocked = (screen: Screen) => {
    return membership.value === "free" && screen.number > 1
  }

  /* تفعيل / إيقاف الشاشة */
  const toggleScreen = async (screen: Screen) => {
    if (isLocked(screen)) return

    const newState = !screen.is_active
    await updateActivation(screen.screen_id, newState)
    screen.is_active = newState
  }

  /* ربط الشاشة بالعرض */
  const assignOffer = async ({ screen, model }: { screen: Screen; model: Offer }) => {
    await assignOfferToScreen(screen.id, model.id)
    await updateOfferResolution(model.id, screen.resolution ?? null)
    loadScreens()
  }

  /* تحميل كل البيانات */
  const loadAll = async () => {
    user.value = await getUser()
    if (!user.value) return

    membership.value = await getMembership(user.value.id)

    await loadOffers()
    await loadScreens()
  }

  return {
    screens,
    offers,
    loading,
    openScreenId,
    isLocked,
    toggleScreen,
    assignOffer,
    loadAll
  }
}

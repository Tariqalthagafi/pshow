import { ref } from "vue"
import type { Offer } from "../types/offer.types"

import {
  getUserId,
  getMembership,
  getOffers,
  createImageOffer,
  createVideoOffer,
  deleteOffer,
  deleteOfferItems,
  checkOfferScreens
} from "../services/offers.service"

export function useOffers() {
  const cards = ref<Offer[]>([])
  const membership = ref<string>("free")
  const locked = ref<boolean>(false)
  const openCardId = ref<number | null>(null)
  const showTypeSelector = ref<boolean>(false)
  const userId = ref<string | null>(null)

  async function loadOffers() {
    // جلب معرف المستخدم
    userId.value = await getUserId()
    if (!userId.value) throw new Error("User not logged in")

    // uid الآن مضمون أنه string
    const uid = userId.value

    // جلب العضوية
    membership.value = await getMembership(uid)

    // جلب العروض
    const { data: offers } = await getOffers(uid)

    if (!offers || offers.length === 0) {
      const { data: newOffer } = await createImageOffer(uid, 1)
      cards.value = newOffer ? [newOffer] : []
    } else {
      cards.value = offers.filter((o): o is Offer => !!o)
    }

    // قفل الإضافة حسب العضوية
    locked.value = membership.value === "free"
  }

  async function deleteCard(offerId: number) {
    if (!userId.value) return
    const uid = userId.value

    const { data: screens } = await checkOfferScreens(offerId)

    if (screens && screens.length > 0) {
  alert(`لا يمكن حذف العرض لأنه مرتبط بالشاشة رقم ${screens?.[0]?.number}`)
  return
}


    await deleteOfferItems(offerId, uid)
    await deleteOffer(offerId, uid)

    cards.value = cards.value.filter(c => c.id !== offerId)

    if (openCardId.value === offerId) openCardId.value = null
  }

  function getNextOfferNumber() {
    if (cards.value.length === 0) return 1

    const numbers = cards.value
      .filter((c): c is Offer => !!c)
      .map(c => c.offer_number)

    return Math.max(...numbers) + 1
  }

  async function addImageCard() {
    if (locked.value || !userId.value) return
    const uid = userId.value

    const nextNumber = getNextOfferNumber()
    const { data: newOffer } = await createImageOffer(uid, nextNumber)

    if (newOffer) cards.value.push(newOffer)

    showTypeSelector.value = false
  }

  async function addVideoCard() {
    if (locked.value || !userId.value) return
    const uid = userId.value

    const nextNumber = getNextOfferNumber()
    const { offer } = await createVideoOffer(uid, nextNumber)

    if (offer) cards.value.push(offer)

    showTypeSelector.value = false
  }

  return {
    cards,
    membership,
    locked,
    openCardId,
    showTypeSelector,
    loadOffers,
    deleteCard,
    addImageCard,
    addVideoCard
  }
}

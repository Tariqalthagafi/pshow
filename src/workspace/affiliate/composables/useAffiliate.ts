import { ref, computed } from "vue"
import type { AffiliateClient, AffiliateStatus } from "../types/affiliate.types"
import { getAffiliateCode, getAffiliateClients } from "../services/affiliate.service"

export function useAffiliate() {
  const affiliateCode = ref<string>("")
  const clients = ref<AffiliateClient[]>([])
  const loading = ref<boolean>(false)
  const baseUrl = ref<string>("https://yourapp.com")

  const fullReferralLink = computed(() =>
    affiliateCode.value ? `${baseUrl.value}/?ref=${affiliateCode.value}` : ""
  )

  const translateStatus = (s: AffiliateStatus) => {
    return {
      free: "مجاني",
      paid: "مدفوع",
      cancelled: "ملغي"
    }[s]
  }

  const copyLink = async () => {
    if (!fullReferralLink.value) return
    await navigator.clipboard.writeText(fullReferralLink.value)
    alert("تم نسخ رابط الإحالة")
  }

  const loadAffiliate = async (userId?: string) => {
    loading.value = true
    affiliateCode.value = await getAffiliateCode(userId)
    clients.value = await getAffiliateClients(userId)
    loading.value = false
  }

  return {
    affiliateCode,
    clients,
    loading,
    fullReferralLink,
    translateStatus,
    copyLink,
    loadAffiliate
  }
}

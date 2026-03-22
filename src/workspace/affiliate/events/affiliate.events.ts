import { supabase } from "@/lib/supabaseClient"
import { useAffiliateStore } from "../store/affiliate.store"

let channel: any = null

export function subscribeAffiliateEvents(userId: string) {
  const store = useAffiliateStore()

  // منع الاشتراك مرتين
  if (channel) return

  channel = supabase
    .channel(`affiliate-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "affiliate_clients",
        filter: `owner_id=eq.${userId}`,
      },
      payload => {
        store.updateClientFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeAffiliateEvents() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

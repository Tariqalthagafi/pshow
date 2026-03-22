import { supabase } from "@/lib/supabaseClient"
import { useMembershipStore } from "../store/membership.store"

let channel: any = null

export function subscribeMembershipEvents(userId: string) {
  const store = useMembershipStore()

  if (channel) return

  channel = supabase
    .channel(`membership-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "membership_subscriptions",
        filter: `user_id=eq.${userId}`,
      },
      payload => {
        store.updateSubscriptionFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeMembershipEvents() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

import { supabase } from "@/lib/supabaseClient"
import { useSettingsStore } from "../store/settings.store"

let channel: any = null

export function subscribeSettingsEvents(userId: string) {
  const store = useSettingsStore()

  if (channel) return

  channel = supabase
    .channel(`settings-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "user_settings",
        filter: `user_id=eq.${userId}`,
      },
      payload => {
        store.updateSettingsFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeSettingsEvents() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

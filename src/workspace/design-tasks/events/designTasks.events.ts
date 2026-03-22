import { supabase } from "@/lib/supabaseClient"
import { useDesignTasksStore } from "../store/designTasks.store"

let channel: any = null

export function subscribeDesignTasksEvents(designerId: string) {
  const store = useDesignTasksStore()

  if (channel) return

  channel = supabase
    .channel(`design-tasks-${designerId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "design_tasks",
        filter: `designer_id=eq.${designerId}`,
      },
      payload => {
        store.updateTaskFromRealtime(payload)
      }
    )
    .subscribe()
}

export function unsubscribeDesignTasksEvents() {
  if (channel) {
    supabase.removeChannel(channel)
    channel = null
  }
}

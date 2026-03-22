import { supabase } from "@/lib/supabaseClient"
import type { DesignTask } from "../types/designTask.types"

// جلب المهام الخاصة بالمصمم
export async function fetchDesignTasks(designerId: string) {
  const { data, error } = await supabase
    .from("design_tasks")
    .select("*")
    .eq("designer_id", designerId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DesignTask[]
}

// جلب مهمة واحدة
export async function fetchDesignTaskById(taskId: string) {
  const { data, error } = await supabase
    .from("design_tasks")
    .select("*")
    .eq("id", taskId)
    .single()

  if (error) throw error
  return data as DesignTask
}

// تحديث حالة المهمة
export async function updateDesignTaskStatus(taskId: string, status: string) {
  const { data, error } = await supabase
    .from("design_tasks")
    .update({ status })
    .eq("id", taskId)
    .select()
    .single()

  if (error) throw error
  return data
}

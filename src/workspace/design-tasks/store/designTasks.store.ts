import { defineStore } from "pinia"
// import { fetchDesignTasks, fetchDesignTaskById } from "../api/designTasks.api"
import type { DesignTask } from "@/workspace/design-tasks/types/designTask.types"

export const useDesignTasksStore = defineStore("designTasks", {
  state: () => ({
    tasks: [] as DesignTask[],
    selectedTask: null as DesignTask | null,
    loading: false,
    error: null as string | null,
    initialized: false,
  }),

  actions: {
    async loadTasks(designerId: string) {
      try {
        if (this.initialized) return

        this.loading = true
        this.error = null

        // this.tasks = await fetchDesignTasks(designerId)
        this.initialized = true
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async loadTask(taskId: string) {
      try {
        this.loading = true
        this.error = null

       //  this.selectedTask = await fetchDesignTaskById(taskId)
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    updateTaskFromRealtime(payload: any) {
      const index = this.tasks.findIndex((t: DesignTask) => t.id === payload.new.id)

      if (index !== -1) {
        this.tasks[index] = payload.new
      } else {
        this.tasks.unshift(payload.new)
      }
    },

    resetStore() {
      this.tasks = []
      this.selectedTask = null
      this.initialized = false
      this.error = null
    }
  }
})

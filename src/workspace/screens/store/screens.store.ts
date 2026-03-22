import { defineStore } from "pinia"
import {
  getScreens as fetchScreens,
  getScreenById as fetchScreenById,
  createScreen,
  updateScreen
} from "../services/screens.service"
import type { Screen } from "../types/screen.types"

export const useScreensStore = defineStore("screens", {
  state: () => ({
    screens: [] as Screen[],
    selectedScreen: null as Screen | null,
    loading: false,
    error: null as string | null,
    initialized: false,
  }),

  actions: {
    async loadScreens(userId: string) {
      try {
        if (this.initialized) return

        this.loading = true
        this.error = null

        this.screens = await fetchScreens(userId)
        this.initialized = true
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async loadScreen(screenId: number) {
      try {
        this.loading = true
        this.error = null

        this.selectedScreen = await fetchScreenById(screenId)
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addScreen(payload: Partial<Screen>) {
      const newScreen = await createScreen(payload)
      this.screens.unshift(newScreen)
      return newScreen
    },

    async editScreen(screenId: number, payload: Partial<Screen>) {
      const updated = await updateScreen(screenId, payload)

      const index = this.screens.findIndex(s => s.id === screenId)
      if (index !== -1) this.screens[index] = updated

      return updated
    },

    updateScreenFromRealtime(payload: any) {
      const index = this.screens.findIndex(s => s.id === payload.new.id)
      if (index !== -1) {
        this.screens[index] = payload.new
      } else {
        this.screens.unshift(payload.new)
      }
    },

    resetStore() {
      this.screens = []
      this.selectedScreen = null
      this.initialized = false
      this.error = null
    }
  }
})

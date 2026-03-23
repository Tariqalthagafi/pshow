import { defineStore } from "pinia"
import {
  getUserSettings,
  saveUserSettings
} from "../services/settings.service"
import type { UserSettings } from "@/workspace/settings/types/settings.types.ts"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: null as UserSettings | null,
    loading: false,
    error: null as string | null,
    initialized: false,
  }),

  actions: {
    async loadSettings(userId: string) {
      try {
        if (this.initialized) return

        this.loading = true
        this.error = null

        this.settings = await getUserSettings(userId)
        this.initialized = true
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async saveSettings(userId: string, payload: Partial<UserSettings>) {
      try {
        this.loading = true
        this.error = null

        const updated = await saveUserSettings(userId, payload)
        this.settings = updated
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    updateSettingsFromRealtime(payload: any) {
      this.settings = payload.new
    },

    resetStore() {
      this.settings = null
      this.initialized = false
      this.error = null
    }
  }
})

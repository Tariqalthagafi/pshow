import { defineStore } from "pinia"
import { fetchAffiliateClients, fetchAffiliateLink } from "../api/affiliate.api"
import type { AffiliateClient } from "../types/affiliate.types"

export const useAffiliateStore = defineStore("affiliate", {
  state: () => ({
    clients: [] as AffiliateClient[],
    link: null as string | null,
    loading: false,
    error: null as string | null,
    initialized: false, // لمنع إعادة التحميل
  }),

  actions: {
    async loadAffiliateData(userId: string) {
      try {
        if (this.initialized) return

        this.loading = true
        this.error = null

        const [clients, link] = await Promise.all([
          fetchAffiliateClients(userId),
          fetchAffiliateLink(userId),
        ])

        this.clients = clients
        this.link = link
        this.initialized = true
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // تحديث عميل واحد (مفيد للـ Realtime)
    updateClientFromRealtime(payload: any) {
      const index = this.clients.findIndex(c => c.id === payload.new.id)
      if (index !== -1) {
        this.clients[index] = payload.new
      } else {
        this.clients.unshift(payload.new)
      }
    },

    // إعادة التهيئة (مثلاً عند تسجيل خروج)
    resetStore() {
      this.clients = []
      this.link = null
      this.initialized = false
      this.error = null
    }
  }
})

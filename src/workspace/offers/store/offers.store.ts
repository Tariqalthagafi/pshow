// src/workspace/offers/store/offers.store.ts

import { defineStore } from "pinia"
import type { Offer } from "../types/offer.types"
import { supabase } from "@/supabase"
import { getOffers } from "../services/offers.service"

export const useOffersStore = defineStore("offersStore", {
  state: () => ({
    offers: [] as Offer[],
    loading: false,
    initialized: false,
    channel: null as any
  }),

  actions: {
    async loadOffers(userId: string) {
      this.loading = true

      const { data, error } = await getOffers(userId)
      if (error) {
        console.error("Error loading offers:", error)
        this.loading = false
        return
      }

      this.offers = data || []
      this.initialized = true
      this.loading = false

      this.subscribeToRealtime(userId)
    },

    subscribeToRealtime(userId: string) {
      if (this.channel) return

      this.channel = supabase
        .channel("offers-realtime")
        .on(
          "postgres_changes" as any,
          {
            event: "*",
            schema: "public",
            table: "offers",
            filter: `user_id=eq.${userId}`
          },
          (payload: { eventType: string; new: Offer; old: Offer }) => {

            if (payload.eventType === "INSERT") {
              this.offers.unshift(payload.new)
            }

            if (payload.eventType === "UPDATE") {
              const index = this.offers.findIndex(o => o.id === payload.new.id)
              if (index !== -1) this.offers[index] = payload.new
            }

            if (payload.eventType === "DELETE") {
              this.offers = this.offers.filter(o => o.id !== payload.old.id)
            }
          }
        )
        .subscribe()
    }
  }
})

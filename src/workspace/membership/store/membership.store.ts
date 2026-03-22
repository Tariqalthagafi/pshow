import { defineStore } from "pinia"
import {
  fetchMembershipPlans,
  fetchUserSubscription,
  updateUserSubscription,
} from "../api/membership.api"
import type { MembershipPlan, MembershipSubscription } from "../types/membership.types"

export const useMembershipStore = defineStore("membership", {
  state: () => ({
    plans: [] as MembershipPlan[],
    subscription: null as MembershipSubscription | null,
    loading: false,
    error: null as string | null,
    initialized: false,
  }),

  actions: {
    async loadMembershipData(userId: string) {
      try {
        if (this.initialized) return

        this.loading = true
        this.error = null

        const [plans, subscription] = await Promise.all([
          fetchMembershipPlans(),
          fetchUserSubscription(userId),
        ])

        this.plans = plans
        this.subscription = subscription
        this.initialized = true
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async changePlan(userId: string, planId: string) {
      try {
        this.loading = true
        this.error = null

        const sub = await updateUserSubscription(userId, planId)
        this.subscription = sub
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    updateSubscriptionFromRealtime(payload: any) {
      this.subscription = payload.new
    },

    resetStore() {
      this.plans = []
      this.subscription = null
      this.initialized = false
      this.error = null
    }
  }
})

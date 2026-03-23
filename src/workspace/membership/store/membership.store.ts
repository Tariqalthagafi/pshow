import { defineStore } from "pinia"
import {
  getMembershipPlans,
  getUserSubscription,
  saveUserSubscription
} from "../services/membership.service"
import type { MembershipPlan, MembershipSubscription } from "@/workspace/membership/types/membership.types.ts"

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
          getMembershipPlans(),
          getUserSubscription(userId),
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

        const sub = await saveUserSubscription(userId, planId)
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

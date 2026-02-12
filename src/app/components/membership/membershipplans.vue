<template>
  <div class="membership-wrapper">

    <!-- العنوان + الحالة -->
    <div class="header">
      <h2 class="title">العضوية</h2>

    </div>

    <!-- الباقات -->
    <div class="cards">

      <!-- الباقة المجانية -->
      <ProMembershipCard
  :isActive="currentPlan === 'pro'"
  @subscribe="subscribePro"
  @cancel="setPlan('free')"
/>


    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ProMembershipCard from "./ProMembershipCard.vue"

const currentPlan = ref("free")
let userId = null

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user
  if (!user) return

  userId = user.id

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  currentPlan.value = profile?.plan || "free"
})

const setPlan = async (plan) => {
  await supabase
    .from("profiles")
    .update({ plan })
    .eq("id", userId)

  currentPlan.value = plan
}

const subscribePro = async (billing) => {
  const expires = new Date()

  if (billing === "monthly") {
    expires.setMonth(expires.getMonth() + 1)
  } else {
    expires.setFullYear(expires.getFullYear() + 1)
  }

  await supabase
    .from("profiles")
    .update({
      plan: "pro",
      billing_cycle: billing,
      expires_at: expires.toISOString()
    })
    .eq("id", userId)

  currentPlan.value = "pro"
}
</script>


<style scoped>
.membership-wrapper {
  direction: rtl;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 800;
}

.status {
  font-size: 14px;
  color: #6b7280;
  margin-top: 6px;
}

.status .free {
  color: #dc2626;
  font-weight: 700;
}

.status .pro {
  color: #10b981;
  font-weight: 700;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>

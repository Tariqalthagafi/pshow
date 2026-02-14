<script setup lang="ts">
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ScreenCard from "./screencard.vue"
import type { Screen as CardScreen, Offer as CardOffer } from "./screencard.vue"

type Screen = CardScreen
type Offer = CardOffer

const loading = ref(true)
const screens = ref<Screen[]>([])
const offers = ref<Offer[]>([])        // ← العروض هنا
const membership = ref<"free" | "pro">("free")
const openScreenId = ref<string | null>(null)
const user = ref<any>(null)

/* ============================
   تحميل عروض المستخدم فقط
============================ */
const loadOffers = async () => {
  const { data, error } = await supabase
    .from("offers")
    .select("id, offer_number")
    .eq("user_id", user.value.id)     // ← أهم سطر
    .order("offer_number", { ascending: true })

  offers.value = data || []
}

/* ============================
   تحميل الشاشات + دمج screen_activation
============================ */
const loadScreens = async () => {
  loading.value = true

  // 1) جلب الشاشات من جدول screens
  const { data: screensData, error } = await supabase
    .from("screens")
    .select("id, number, screen_id, offer_id, activation_code, user_id")
    .eq("user_id", user.value.id)
    .order("number", { ascending: true })

  if (error || !screensData) {
    loading.value = false
    return
  }

  // 2) جلب بيانات screen_activation
  const { data: activationData } = await supabase
    .from("screen_activation")
    .select("screen_id, is_active, device_id, resolution, app_version, os_version, ip_address, last_seen")

  // 3) دمج البيانات
  screens.value = screensData.map((screen) => {
    const match = activationData?.find((a: any) => a.screen_id === screen.screen_id)

    return {
      ...screen,
      is_active: match?.is_active ?? false,
      last_seen: match?.last_seen ?? null,
      device_id: match?.device_id ?? null,
      app_version: match?.app_version ?? null,
      os_version: match?.os_version ?? null,
      resolution: match?.resolution ?? null,
      ip_address: match?.ip_address ?? null
    }
  })

  loading.value = false
}

/* ============================
   قفل الشاشات حسب العضوية
============================ */
const isLocked = (screen: Screen) => {
  return membership.value === "free" && screen.number > 1
}

/* ============================
   تفعيل / إيقاف الشاشة
============================ */
const toggleScreen = async (screen: Screen) => {
  if (isLocked(screen)) return

  const newState = !screen.is_active

  await supabase
    .from("screen_activation")
    .update({ is_active: newState })
    .eq("screen_id", screen.screen_id)

  screen.is_active = newState
}

/* ============================
   ربط الشاشة بالعرض
============================ */
const assignOffer = async ({ screen, model }: { screen: Screen; model: Offer }) => {
  await supabase
    .from("screens")
    .update({ offer_id: model.id })
    .eq("id", screen.id)

  await supabase
    .from("offers")
    .update({ resolution: screen.resolution })
    .eq("id", model.id)

  loadScreens()
}

/* ============================
   تحميل البيانات عند الدخول
============================ */
onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  user.value = sessionData.session?.user

  if (!user.value) return

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.value.id)
    .single()

  membership.value = profile?.plan || "free"

  await loadOffers()     // ← تحميل العروض أولاً
  await loadScreens()    // ← ثم تحميل الشاشات
})
</script>


<template>
  <div class="screen-list">
    <div v-if="loading">جاري تحميل الشاشات...</div>

   <ScreenCard
  v-for="screen in screens"
  :key="screen.id"
  :screen="screen"
  :locked="isLocked(screen)"
  :openScreenId="openScreenId"
  :models="offers"
  @toggle="toggleScreen"
  @open="openScreenId = $event"
  @assign="assignOffer"
/>


  </div>
</template>

<style>
.screen-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  padding: 20px;
  direction: rtl;
  align-items: start;
}

/* تحسين الجوال */
@media (max-width: 600px) {
  .screen-list {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 12px;
  }
}

</style>


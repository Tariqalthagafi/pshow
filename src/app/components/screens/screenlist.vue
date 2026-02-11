<script setup lang="ts">
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ScreenCard from "./screencard.vue"
import type { Screen as CardScreen, Offer as CardOffer } from "./screencard.vue"

type Screen = CardScreen
type Offer = CardOffer


const loading = ref(true)
const screens = ref<Screen[]>([])
const membership = ref<"free" | "pro">("free")
const openScreenId = ref<string | null>(null)

const loadScreens = async () => {
  loading.value = true

  // 1) جلب الشاشات من جدول screens
  const { data: screensData, error } = await supabase
    .from("screens")
    .select("id, number, screen_id, offer_id, activation_code, offer_number, user_id")
    .order("number", { ascending: true })

  if (error || !screensData) {
    loading.value = false
    return
  }

  // 2) جلب بيانات screen_activation (كل بيانات الجهاز + is_active)
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

const isLocked = (screen: Screen) => {
  return membership.value === "free" && screen.number > 1
}

const toggleScreen = async (screen: Screen) => {
  if (isLocked(screen)) return

  const newState = !screen.is_active

  await supabase
    .from("screen_activation")
    .update({ is_active: newState })
    .eq("screen_id", screen.screen_id)

  screen.is_active = newState
}

const assignOffer = async ({ screen, model }: { screen: Screen; model: Offer }) => {
  // 1) ربط الشاشة بالعرض
  await supabase
    .from("screens")
    .update({ offer_id: model.id })
    .eq("id", screen.id)

  // 2) تحديث العرض بمقاس الشاشة
  await supabase
    .from("offers")
    .update({
      resolution: screen.resolution
    })
    .eq("id", model.id)

  // تحديث الواجهة
  loadScreens()
}

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user
  if (!user) return

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  membership.value = profile?.plan || "free"

  loadScreens()
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
      @toggle="() => toggleScreen(screen)"
      @open="openScreenId = screen.id"
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


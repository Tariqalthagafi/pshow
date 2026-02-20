<template>
  <div class="display-container">

    <!-- شاشة العرض -->
    <ScreenView 
      v-if="ready" 
      :key="`${duration}-${effect}`"
      :items="items" 
      :effect="effect"
      :pause="duration"     
    />

    <p v-else-if="waiting" class="waiting">
      الشاشة في وضع الانتظار… يرجى تفعيلها من لوحة التحكم
    </p>

    <p v-else-if="noOffer" class="no-offer">
      لا يوجد عرض مرتبط بهذه الشاشة حالياً
    </p>

    <p v-else class="loading">
      جاري تحميل العرض...
    </p>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ScreenView from "./screenview.vue"

const ready = ref(false)
const noOffer = ref(false)
const waiting = ref(false)
const items = ref([])
const effect = ref(null)
const duration = ref(10)   // هذه هي pause

onMounted(async () => {
  const screenUUID = localStorage.getItem("active_screen_id")

  if (!screenUUID) {
    window.location.href = "/activate"
    return
  }

  const { data: activation, error: activationError } = await supabase
    .from("screen_activation")
    .select("screen_id, is_active, offer_id")
    .eq("id", screenUUID)
    .single()

  if (activationError || !activation) {
    window.location.href = "/activate"
    return
  }

  if (!activation.is_active) {
    waiting.value = true
    return
  }

  const offerId = activation.offer_id

  if (!offerId) {
    noOffer.value = true
    return
  }

  await loadItems(offerId)
  ready.value = true
})

async function loadItems(offerId) {
  const { data: rows } = await supabase
    .from("offer_items")
    .select("secure_url, type")
    .eq("offer_id", offerId)
    .order("order_index", { ascending: true })

  const { data: offerData } = await supabase
    .from("offers")
    .select("duration, effect")
    .eq("id", offerId)
    .single()

  if (rows?.length) {
    items.value = rows.map(item => ({
      type: item.type.startsWith("image") ? "images" : item.type,
      url: item.secure_url
    }))

    effect.value = offerData?.effect || "strip"
    duration.value = Number(offerData?.duration) || 3   // هذه pause

    ready.value = true
    noOffer.value = false
    waiting.value = false
  } else {
    ready.value = false
    noOffer.value = true
  }
}
</script>


<style scoped>
.display-container {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}

.loading {
  color: white;
  font-size: 22px;
  text-align: center;
  margin-top: 40vh;
}

.no-offer {
  color: #ffcc00;
  font-size: 24px;
  text-align: center;
  margin-top: 40vh;
}

.waiting {
  color: #00c8ff;
  font-size: 24px;
  text-align: center;
  margin-top: 40vh;
}
</style>

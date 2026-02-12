<template>
  <div class="display-container">

    <ScreenView 
  v-if="ready" 
  :key="`${duration}-${effect}`"
  :images="images" 
  :effect="effect"
  :duration="duration" 
/>

<p v-else-if="waiting" class="waiting"> الشاشة في وضع الانتظار… يرجى تفعيلها من لوحة التحكم </p>

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
const images = ref([])
const effect = ref(null)
console.log(effect.value + " القيمة الأولية")
const duration = ref(10) // قيمة افتراضية 3 ثواني


onMounted(async () => {
  
  const screenUUID = localStorage.getItem("active_screen_id")

  if (!screenUUID) {
    window.location.href = "/activate"
    return
  }

  const { data: activation, error: activationError } = await supabase
  .from("screen_activation")
  .select("screen_id, is_active")
  .eq("id", screenUUID)
  .single()

if (activationError || !activation) {
  window.location.href = "/activate"
  return
}

// إذا الشاشة غير مفعّلة → وضع الانتظار
if (!activation.is_active) {
  waiting.value = true
  return
}

const shortId = activation.screen_id
 // الرقم القصير

  const { data: screenData, error: screenError } = await supabase
    .from("screens")
    .select("offer_id")
    .eq("screen_id", shortId)           // البحث بالرقم القصير
    .single()

  if (screenError || !screenData || !screenData.offer_id) {
    noOffer.value = true
    return
  }

  const offerId = screenData.offer_id

  await loadImages(offerId)
  ready.value = true

  supabase
    .channel(`activation_${screenUUID}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "screen_activation",
        filter: `id=eq.${screenUUID}`
      },
      async () => {
        await loadImages(offerId)
      }
    )
    .subscribe()

  supabase
    .channel(`offer_${offerId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "offer_items",
        filter: `offer_id=eq.${offerId}`
      },
      async () => {
        await loadImages(offerId)
      }
    )
    .subscribe()
})

async function loadImages(offerId) {

  // 1) استعلام الصور من offer_items
  const { data: items, error: itemsError } = await supabase
    .from("offer_items")
    .select("secure_url")
    .eq("offer_id", offerId)
    .order("order_index", { ascending: true })

  // 2) استعلام مدة العرض من جدول offers
  const { data: offerData, error: offerError } = await supabase
    .from("offers")
    .select("duration, effect")
    .eq("id", offerId)
    .single()
console.log("مدة العرض الآن:", offerData?.effect)

  if (!itemsError && items?.length) {
    images.value = items.map(img => img.secure_url)

    console.log("قبل التغيير:", effect.value)
effect.value = offerData?.effect || "fade"
console.log("بعد التغيير:", effect.value)



    // هنا القيمة الصحيحة 100٪
    duration.value = Number(offerData?.duration) || 10

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

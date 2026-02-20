<template>
  <div>
    <!-- شبكة البطاقات -->
    <div class="cards-grid">
<div v-for="card in cards" :key="card.id">

  <!-- بطاقة صور -->
  <ContentCard
    v-if="card.type === 'images'"
    :cardId="card.id"
    :openCardId="openCardId"
    :offerNumber="card.offer_number"
    @open-card="openCardId = $event"
    @delete="deleteCard"
  />

  <!-- بطاقة فيديو -->
  <VideoCard
  v-else-if="card.type === 'video'"
  :cardId="card.id"
  :offerNumber="card.offer_number"
  :openCardId="openCardId"
  @open-card="openCardId = $event"
  @delete="deleteCard"
/>


</div>


    </div>

    <!-- زر إضافة بطاقة جديدة -->
    <div class="add-wrapper">
      <button 
  class="add-btn" 
  :class="{ locked }"
  :disabled="locked"
  @click="showTypeSelector = true"
>
  <span class="add-text">+ إضافة بطاقة عرض جديدة</span>

  <span v-if="locked" class="premium-tag">
    العضوية بريميوم
  </span>
</button>
<div v-if="showTypeSelector" class="popup-overlay">
  <div class="popup-box">

    <h3>اختر نوع بطاقة العرض</h3>

    <button class="popup-btn" @click="addImageCard">
      عرض صور
    </button>

    <button class="popup-btn" @click="addVideoCard">
      عرض فيديو
    </button>

    <button class="close-btn" @click="showTypeSelector = false">
      إغلاق
    </button>

  </div>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ContentCard from "@/app/components/content/formcompo/contentcard.vue"
import VideoCard from "@/app/components/content/formcompo/VideoCard.vue"

const cards = ref([])
const currentUserId = ref(null)
const openCardId = ref(null)
const membership = ref("free")
const locked = ref(false)
const showTypeSelector = ref(false)

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  currentUserId.value = userData.user?.id

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", currentUserId.value)
    .single()

  membership.value = profile?.plan || "free"

  const { data: offers } = await supabase
    .from("offers")
    .select("*")
    .eq("user_id", currentUserId.value)
    .order("offer_number", { ascending: true })

  // إنشاء أول بطاقة إذا لم توجد أي بطاقة
  if (!offers || offers.length === 0) {
    const { data: newOffer } = await supabase
      .from("offers")
      .insert({
        offer_number: 1,
        user_id: currentUserId.value,
        type: "images"   // مهم جداً
      })
      .select()
      .single()

    if (newOffer) cards.value = [newOffer]
  } else {
    cards.value = offers
  }

  // العضوية المجانية بطاقة واحدة فقط
  if (membership.value === "free" && cards.value.length > 1) {
    cards.value = [cards.value[0]]
  }

  locked.value = membership.value === "free"
})

const deleteCard = async (offerId) => {
  const { data: screensUsingOffer } = await supabase
    .from("screens")
    .select("id, number")
    .eq("offer_id", offerId)

  if (screensUsingOffer?.length) {
    alert(`لا يمكن حذف العرض لأنه مرتبط بالشاشة رقم ${screensUsingOffer[0].number}`)
    return
  }

  await supabase
    .from("offer_items")
    .delete()
    .eq("offer_id", offerId)
    .eq("user_id", currentUserId.value)

  await supabase
    .from("offers")
    .delete()
    .eq("id", offerId)
    .eq("user_id", currentUserId.value)

  cards.value = cards.value.filter(c => c && c.id !== offerId)

  if (openCardId.value === offerId) {
    openCardId.value = null
  }

  if (membership.value === "free" && cards.value.length > 1) {
    cards.value = [cards.value[0]]
  }

  locked.value = membership.value === "free"
}

const addImageCard = async () => {
  if (locked.value) return

  const maxNumber = Math.max(
    ...cards.value.filter(c => c).map(c => c.offer_number),
    0
  )
  const nextNumber = maxNumber + 1

  const { data: newOffer } = await supabase
    .from("offers")
    .insert({
      offer_number: nextNumber,
      user_id: currentUserId.value,
      type: "images"
    })
    .select()
    .single()

  if (newOffer) cards.value.push(newOffer)
  showTypeSelector.value = false
}

const addVideoCard = async () => {
  if (locked.value) return

  // حساب رقم العرض التالي
  const maxNumber = Math.max(
    ...cards.value.filter(c => c).map(c => c.offer_number),
    0
  )
  const nextNumber = maxNumber + 1

  // 1) إنشاء العرض نفسه
  const { data: newOffer, error: offerError } = await supabase
    .from("offers")
    .insert({
      offer_number: nextNumber,
      user_id: currentUserId.value,
      type: "video"   // مهم جداً
    })
    .select()
    .single()

  if (offerError || !newOffer) {
    console.error("Offer insert error:", offerError)
    alert("حدث خطأ أثناء إنشاء بطاقة الفيديو")
    return
  }

  // 2) إنشاء عنصر الفيديو داخل offer_items
  const { error: itemError } = await supabase
    .from("offer_items")
    .insert({
      offer_id: newOffer.id,
      user_id: currentUserId.value,
      type: "video",
      secure_url: "",   // الرابط سيُحدّث لاحقًا من VideoCard.vue
      public_id: null
    })

  if (itemError) {
    console.error("Offer item insert error:", itemError)
    alert("تم إنشاء العرض ولكن حدث خطأ في إضافة الفيديو")
    return
  }

  // 3) تحديث الواجهة
  cards.value.push(newOffer)
  showTypeSelector.value = false
}

</script>


<style scoped>

/* شبكة البطاقات */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  padding: 20px;
  direction: rtl;
  align-items: start; /* أهم سطر */
}

/* زر الإضافة */
.add-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.add-btn {
  background: #2563eb;
  color: white;
  padding: 16px 28px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  gap: 14px;
}

.add-btn:hover {
  background: #1d4ed8;
}

.locked {
  opacity: 0.55;
  pointer-events: none;
}

.premium-tag {
  background: #facc15;
  color: #1f2937;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

@media (max-width: 600px) {

  /* الشبكة */
  .cards-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    padding: 12px !important;
  }

  /* زر الإضافة */
  .add-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 10px;
    gap: 10px;
  }

  .add-text {
    font-size: 14px;
  }

  .premium-tag {
    font-size: 11px;
    padding: 3px 8px;
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-box {
  background: white;
  padding: 25px;
  border-radius: 14px;
  width: 320px;
  text-align: center;
  direction: rtl;
}

.popup-btn {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-size: 15px;
}

.close-btn {
  margin-top: 15px;
  background: #aaa;
  color: white;
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  cursor: pointer;
}

</style>

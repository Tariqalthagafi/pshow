<template>
  <div>
    <!-- شبكة البطاقات -->
    <div class="cards-grid">
<ContentCard
  v-for="card in cards"
  :key="card.offer_id"
  :cardId="card.id"
  :openCardId="openCardId"
  :offerNumber="card.offer_number"
  @open-card="openCardId = $event"
  @delete="deleteCard"
/>

    </div>

    <!-- زر إضافة بطاقة جديدة -->
    <div class="add-wrapper">
      <button 
        class="add-btn" 
        :class="{ locked }"
        :disabled="locked"
        @click="addCard"
      >
        <span class="add-text">+ إضافة بطاقة عرض جديدة</span>

        <span v-if="locked" class="premium-tag">
          العضوية بريميوم
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import ContentCard from "@/app/components/content/formcompo/contentcard.vue"

const cards = ref([])
const currentUserId = ref(null)
const openCardId = ref(null)
const membership = ref("free")
const locked = ref(false)

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

  if (!offers || offers.length === 0) {
    const { data: newOffer } = await supabase
      .from("offers")
      .insert({
        offer_number: 1,
        user_id: currentUserId.value
      })
      .select()
      .single()

    cards.value = [newOffer]
  } else {
    cards.value = offers
  }

  if (membership.value === "free" && cards.value.length > 1) {
    cards.value = [cards.value[0]]
  }

  locked.value = membership.value === "free"
})

const addCard = async () => {
  if (locked.value) return

  const maxNumber = Math.max(...cards.value.map(c => c.offer_number), 0)
  const nextNumber = maxNumber + 1

  const { data: newOffer } = await supabase
    .from("offers")
    .insert({
      offer_number: nextNumber,
      user_id: currentUserId.value
    })
    .select()
    .single()

  cards.value.push(newOffer)

  if (membership.value === "free" && cards.value.length > 1) {
    cards.value = [cards.value[0]]
  }

  locked.value = membership.value === "free"
}

const deleteCard = async (offerId) => {

  // 1) التحقق هل العرض مرتبط بشاشة
  const { data: screensUsingOffer } = await supabase
    .from("screens")
    .select("id, number")
    .eq("offer_id", offerId)

  if (screensUsingOffer?.length) {
    alert(`لا يمكن حذف العرض لأنه مرتبط بالشاشة رقم ${screensUsingOffer[0].number}`)
    return
  }

  // 2) حذف الملفات المرتبطة بالعرض
  await supabase
    .from("offer_items")
    .delete()
    .eq("offer_id", offerId)
    .eq("user_id", currentUserId.value)

  // 3) حذف العرض نفسه
  await supabase
    .from("offers")
    .delete()
    .eq("id", offerId)
    .eq("user_id", currentUserId.value)

  // 4) تحديث الواجهة
  cards.value = cards.value.filter(c => c.id !== offerId)

  if (openCardId.value === offerId) {
    openCardId.value = null
  }

  if (membership.value === "free" && cards.value.length > 1) {
    cards.value = [cards.value[0]]
  }

  locked.value = membership.value === "free"
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

</style>

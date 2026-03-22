<template>
  <div class="form-box video-card">

    <!-- الصف العلوي -->
    <div class="row-top">
      <h2>العرض رقم {{ offerNumber }} (فيديو)</h2>

      <div class="actions">
        <ContentActions 
          :cardId="cardId"
          :hideDelete="false"
          @delete="emit('delete', cardId)"
        />
      </div>
    </div>

    <!-- أزرار التابات -->
    <div class="row-buttons">

      <!-- التاب الحقيقي -->
      <button 
        :class="{ active: openSection === 'video' }"
        @click="toggleSection('video')"
      >
        المرفقات
      </button>

      <!-- تاب فارغ 1 -->
      <button class="empty-tab" disabled></button>

      <!-- تاب فارغ 2 -->
      <button class="empty-tab" disabled></button>

    </div>

    <!-- قسم الفيديو -->
    <transition name="expand">
      <div v-if="openSection === 'video'" class="section-box">

        <!-- حقل إدخال الرابط -->
        <div class="input-box">
          <label>رابط الفيديو</label>
          <input 
            v-model="videoUrl"
            type="text"
            placeholder="الصق رابط الفيديو هنا"
          />
        </div>

        <!-- الصيغة -->
        <div class="input-box">
          <label>الصيغة</label>
          <input 
            type="text"
            :value="videoType"
            disabled
            class="locked-input"
          />
        </div>

        <!-- مدة العرض -->
        <div class="input-box">
          <label>مدة العرض (بالثواني)</label>
          <input 
            v-model.number="duration"
            type="number"
            min="1"
          />
        </div>

        <!-- زر الحفظ -->
        <button class="save-btn" @click="saveVideo">💾 حفظ</button>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { supabase } from "@/supabase"
import ContentActions from "@/workspace/offers/components/shared/contentactions.vue"

const props = defineProps({
  cardId: String,
  offerNumber: Number,
  openCardId: String
})

const emit = defineEmits(["delete", "open-card"])

const currentUserId = ref(null)
const itemId = ref(null)

const openSection = ref(null)

const videoUrl = ref("")
const duration = ref(10)

/* فتح/إغلاق التاب */
const toggleSection = (section) => {
  if (openSection.value === section) {
    openSection.value = null
  } else {
    openSection.value = section
    emit("open-card", props.cardId)
  }
}

/* تحميل البيانات */
onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  currentUserId.value = userData.user?.id

  // تحميل عنصر الفيديو من offer_items
  const { data: item } = await supabase
    .from("offer_items")
    .select("*")
    .eq("offer_id", props.cardId)
    .eq("type", "video")
    .single()

  if (item) {
    itemId.value = item.id
    videoUrl.value = item.secure_url || ""
  }

  // تحميل مدة العرض من offers
  const { data: offer } = await supabase
    .from("offers")
    .select("duration")
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)
    .single()

  if (offer) {
    duration.value = offer.duration || 10
  }
})

/* حفظ */
const saveVideo = async () => {
  if (!itemId.value) {
    alert("خطأ: لم يتم العثور على عنصر الفيديو")
    return
  }

  // تحديث رابط الفيديو داخل offer_items
  await supabase
    .from("offer_items")
    .update({
      secure_url: videoUrl.value
    })
    .eq("id", itemId.value)
    .eq("user_id", currentUserId.value)

  // تحديث مدة العرض داخل offers
  await supabase
    .from("offers")
    .update({
      duration: duration.value
    })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)

  alert("تم حفظ بطاقة الفيديو")
}

/* كشف نوع الرابط */
const videoType = computed(() => {
  if (!videoUrl.value) return "—"

  if (videoUrl.value.includes("youtube") || videoUrl.value.includes("youtu.be"))
    return "YouTube"

  if (videoUrl.value.includes("vimeo"))
    return "Vimeo"

  if (videoUrl.value.includes("drive.google.com"))
    return "Google Drive"

  if (videoUrl.value.includes("dropbox.com"))
    return "Dropbox"

  return "MP4 مباشر"
})

/* إغلاق التاب عند فتح بطاقة أخرى */
watch(() => props.openCardId, (newVal) => {
  if (newVal !== props.cardId) {
    openSection.value = null
  }
})
</script>


<style scoped>
/* نفس تصميم بطاقة الصور */
.video-card {
  background: #ffffff;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 14px;
  direction: rtl;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  transition: height 0.3s ease;
}

/* الصف الأول */
.row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-top h2 {
  font-size: 18px;
  margin: 0;
  font-weight: 700;
}

/* أزرار التابات */
.row-buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;

}

.row-buttons button {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.25s ease;
}

.row-buttons button:hover {
  background: #eef2ff;
}

.row-buttons button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
}

/* صندوق القسم */
.section-box {
  margin-top: 6px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

/* زر إضافة فيديو */
.add-video-btn {
  background: #2563eb;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  text-align: center;
}

.add-video-btn:hover {
  background: #1d4ed8;
}

/* حقل الإدخال */
.input-box {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-box input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* معاينة الفيديو */
.preview-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* اللقطة */
.thumb-box {
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* معلومات الفيديو */
.info-box {
  background: #f3f4f6;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  line-height: 1.6;
}

/* مشغل الفيديو */
.player-box iframe,
.player-box video {
  width: 100%;
  height: 260px;
  border-radius: 12px;
  border: none;
}

/* أنيميشن التمدد */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.35s ease, opacity 0.25s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 600px;
  opacity: 1;
}

/* موبايل */
@media (max-width: 480px) {
  .video-card {
    max-width: 100%;
    width: 100%;
  }

  .row-top h2 {
    font-size: 16px;
  }

  .row-buttons button {
    font-size: 13px;
    padding: 8px 0;
  }

  .section-box {
    padding: 12px;
  }

  .thumb-box {
    height: 150px;
  }

  .player-box iframe,
  .player-box video {
    height: 220px;
  }
}

.empty-tab {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  cursor: default;
  pointer-events: none;
  visibility: hidden; /* يخفي الزر لكن يحافظ على المساحة */
}

</style>

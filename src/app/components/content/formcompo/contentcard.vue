<template>
  <div class="form-box">

    <!-- الصف الأول -->
    <div class="row-top">
      <h2>العرض رقم {{ offerNumber }}</h2>
      <ContentActions 
        :cardId="cardId"
        :hideDelete="offerNumber === 1"
        @save="saveCard"
        @delete="emit('delete', cardId)"
      />
    </div>

    <!-- الصف الثاني: أزرار التحكم -->
    <div class="row-buttons">
      <button 
        :class="{ active: openSection === 'attachments' }"
        @click="toggleSection('attachments')"
      >
        المرفقات
      </button>

      <button 
        :class="{ active: openSection === 'effects' }"
        @click="toggleSection('effects')"
      >
        التأثير
      </button>

      <button 
        :class="{ active: openSection === 'designer' }"
        @click="toggleSection('designer')"
      >
        المصمم
      </button>
    </div>

    <!-- قسم المرفقات -->
    <transition name="expand">
      <div v-if="openSection === 'attachments'" class="section-box">
        <ContentFileUploader
          :files="files"
          :userId="currentUserId"
          :offerId="cardId"
          @add="handleFiles"
          @remove="removeFile"
        />
      </div>
    </transition>

    <!-- قسم التأثير -->
    <transition name="expand">
      <div v-if="openSection === 'effects'" class="section-box">
        <ContentHeaderRow
          :modelId="cardId"
          :type="type"
          :effect="effect"
          :duration="duration"
          @update:type="type = $event"
          @update:effect="effect = $event"
          @update:duration="duration = $event"
        />
      </div>
    </transition>

    <!-- قسم المصمم -->
    <transition name="expand">
      <div v-if="openSection === 'designer'" class="section-box">
        <ContentDesignerInvite
          :email="designerEmail"
          :designerId="designerId"
          :disabledMode="membership === 'free'"
          @update:email="designerEmail = $event"
          @invite="handleInvite"
          @cancel="handleCancelInvite"
        />
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted , watch } from "vue"
import { supabase } from "@/supabase"
import ContentHeaderRow from "@/app/components/content/formcompo/contentheaderrow.vue"
import ContentFileUploader from "@/app/components/content/formcompo/contentfileuploader.vue"
import ContentDesignerInvite from "@/app/components/content/formcompo/contentdesignerinvite.vue"
import ContentActions from "@/app/components/content/formcompo/contentactions.vue"

const props = defineProps({
  cardId: String,
  offerNumber: Number,
  openCardId: String
})

const emit = defineEmits(["open-card", "delete"])

const openSection = ref(null)

const toggleSection = (section) => {
  if (props.openCardId !== props.cardId) {
    emit("open-card", props.cardId)
    openSection.value = section
    return
  }
  openSection.value = openSection.value === section ? null : section
}

watch(
  () => props.openCardId,
  (newVal) => {
    if (newVal !== props.cardId) openSection.value = null
  }
)

const currentUserId = ref(null)
const membership = ref("free")

const files = ref([])
const type = ref("images")
const effect = ref("slide-left")

const designerEmail = ref("")
const designerId = ref(null)

const duration = ref(3)

/* تحديث التأثير */
watch(effect, async (newVal) => {
  if (!currentUserId.value) return
  await supabase
    .from("offers")
    .update({ effect: newVal })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)
})

/* تحديث المدة */
watch(duration, async (newVal) => {
  if (!currentUserId.value) return
  await supabase
    .from("offers")
    .update({ duration: newVal })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)
})

/* حدود المرفقات */
const handleFiles = (uploadedFiles) => {
  const limit = membership.value === "free" ? 2 : 10

  if (files.value.length >= limit) {
    alert(`الحد الأقصى للمرفقات هو ${limit}`)
    return
  }

  const allowed = limit - files.value.length
  const toAdd = uploadedFiles.slice(0, allowed)

  files.value.push(
    ...toAdd.map(f => ({
      url: f.url,
      public_id: f.public_id,
      type: f.type,
      original_filename: f.original_filename,
      format: f.format,
      bytes: f.bytes,
      width: f.width,
      height: f.height,
      duration: f.duration
    }))
  )
}

/* حذف ملف */
const removeFile = async (index) => {
  const file = files.value[index]

  await supabase
    .from("offer_items")
    .delete()
    .eq("public_id", file.public_id)
    .eq("offer_id", props.cardId)

  const { data: { session } } = await supabase.auth.getSession()

  await fetch("https://eypmuxcspmyizigzapsy.supabase.co/functions/v1/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ publicId: file.public_id })
  })

  files.value.splice(index, 1)
}

/* حفظ البطاقة */
const saveCard = async () => {
  await supabase
    .from("offers")
    .update({
      designer_email: designerEmail.value,
      effect: effect.value,
      duration: duration.value
    })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)

  alert("تم حفظ بطاقة العرض")
}

const sendRegistrationInvite = async (email) => {
  await fetch(
    "https://eypmuxcspmyizigzapsy.supabase.co/functions/v1/send-registration-invite",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }
  )

  alert(`تم إرسال دعوة تسجيل إلى ${email}`)
}

/* دعوة المصمم */
const handleInvite = async (email) => {
  if (membership.value === "free") {
    alert("ميزة دعوة المصمم متاحة فقط في خطة Pro")
    return
  }

  if (!email?.includes("@")) {
    alert("الرجاء إدخال بريد صحيح")
    return
  }

  // 1) البحث عن المصمم عبر الفنكشن find-designer
  const res = await fetch(
    "https://eypmuxcspmyizigzapsy.supabase.co/functions/v1/find-designer",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }
  )

  const data = await res.json()
  const designerProfile = data?.[0] || null

  // 2) إذا المصمم غير موجود → إرسال دعوة تسجيل
  if (!designerProfile) {
    await sendRegistrationInvite(email)
    return
  }

  // 3) المصمم موجود → ربطه بالعرض
  await supabase
    .from("offers")
    .update({
      designer_email: email,
      designer_id: designerProfile.id
    })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)

  designerEmail.value = email
  designerId.value = designerProfile.id

  alert("تم ربط المصمم بالعرض")
}



/* إلغاء الدعوة */
const handleCancelInvite = async () => {
  const confirmCancel = confirm("هل تريد إلغاء الدعوة وحذف المصمم من العرض؟")
  if (!confirmCancel) return

  await supabase
    .from("offers")
    .update({
      designer_email: null,
      designer_id: null
    })
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)

  designerEmail.value = ""
  designerId.value = null

  alert("تم إلغاء الدعوة")
}

/* تحميل البيانات */
onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  currentUserId.value = userData.user?.id

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", currentUserId.value)
    .single()

  membership.value = profile?.plan || "free"

  const { data: items } = await supabase
    .from("offer_items")
    .select("*")
    .eq("offer_id", props.cardId)
    .eq("user_id", currentUserId.value)

  if (items) {
    files.value = items.map(item => ({
      url: item.secure_url,
      public_id: item.public_id,
      type: item.type,
      original_filename: item.file_name,
      format: item.format,
      bytes: item.bytes,
      width: item.width,
      height: item.height,
      duration: item.duration
    }))
  }

  const { data: offerData } = await supabase
    .from("offers")
    .select("designer_email, designer_id")
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)
    .single()

  if (offerData) {
    designerEmail.value = offerData.designer_email || ""
    designerId.value = offerData.designer_id || null
  }

  const { data: offerData2 } = await supabase
    .from("offers")
    .select("effect, duration")
    .eq("id", props.cardId)
    .eq("user_id", currentUserId.value)
    .single()

  if (offerData2) {
    effect.value = offerData2.effect || "slide-left"
    duration.value = offerData2.duration ?? 3
  }
})
</script>

<style scoped>

.form-box {
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

/* الصف الثاني: أزرار التحكم */
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

/* دعم الجوال */
@media (max-width: 480px) {
.form-box {
    max-width: 100%;
    width: 100%;
  }
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


.designer-locked-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.locked-title {
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
}

.locked-input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  color: #9ca3af;
}

.locked-btn {
  padding: 10px;
  border-radius: 8px;
  background: #e5e7eb;
  color: #9ca3af;
  border: none;
  font-weight: 600;
}


</style>

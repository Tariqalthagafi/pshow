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
  <div v-show="openSection === 'attachments'" class="section-box">

    <!-- لا يتم عرض ContentFilesManager إلا بعد تحميل userId -->
    <div v-if="currentUserId">
      <ContentFilesManager
        :offerId="cardId"
        :userId="currentUserId"
      />
    </div>

  </div>
  </transition>

    <!-- قسم التأثير -->
    <transition name="expand">
      <div v-if="openSection === 'effects'" class="section-box">
        <ContentEffectsManager
          :offerId="cardId"
          :userId="currentUserId ?? ''"
        />
      </div>
    </transition>

    <!-- قسم المصمم -->
    <transition name="expand">
  <div v-if="openSection === 'designer'" class="section-box">
    <div class="coming-soon-box">
      <h3> قريبًا</h3>
      <p>نعمل على تطوير نظام احترافي لدعوة المصممين.</p>
    </div>
  </div>
</transition>


  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { supabase } from "@/supabase"

import {
  getUserId,
  getMembership
} from "@/workspace/offers/services/offers.service"

import ContentActions from "@/workspace/offers/components/shared/contentactions.vue"
import ContentFilesManager from "@/workspace/offers/components/imgcontent/imguploader/ContentFilesManager.vue"
import ContentEffectsManager from "@/workspace/offers/components/imgcontent/Effects/ContentEffectsManager.vue"

const props = defineProps<{
  cardId: string
  offerNumber: number
  openCardId: string | null
}>()

const emit = defineEmits<{
  (e: "open-card", id: string): void
  (e: "delete", id: string): void
}>()

const openSection = ref<string | null>(null)

const toggleSection = (section: string) => {
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

const currentUserId = ref<string | null>(null)
const membership = ref<string>("free")

/* حفظ البطاقة */
const saveCard = async () => {
  alert("تم حفظ بطاقة العرض")
}

/* تحميل البيانات */
onMounted(async () => {
  currentUserId.value = await getUserId()
  if (!currentUserId.value) return

  membership.value = await getMembership(currentUserId.value)
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
}

</style>

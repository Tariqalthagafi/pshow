<template>
  <div class="screen-card" :class="{ locked }">

    <!-- الصف الأول: شاشة رقم + تفعيل -->
    <div class="top">

      <a 
        v-if="!locked"
        :href="url"
        target="_blank"
        class="screen-link"
      >
        شاشة رقم {{ screen.number }}
      </a>

      <span 
        v-else 
        class="screen-link locked-text"
      >
        شاشة رقم {{ screen.number }} 
      </span>

      <!-- سويتش التفعيل (الآن من screen_activation) -->
      <label class="switch">
        <input 
          type="checkbox"
          :checked="screen.is_active"
          :disabled="locked"
          @change="emit('toggle', screen)"
        />
        <span class="slider round"></span>
      </label>

    </div>

    <!-- الصف الثاني: ربط الشاشة + ربط العرض + معلومات -->
    <div class="actions-row">

      <button 
  class="action-btn"
  :class="{ active: showScreenLink }"
  @click="openAndToggle('screen')"
>
  رابط الشاشة
</button>

<button 
  class="action-btn"
  :class="{ active: showOfferLink }"
  @click="openAndToggle('offer')"
>
  العروض
</button>

<button 
  class="action-btn"
  :class="{ active: showInfo }"
  @click="openAndToggle('info')"
>
  معلومات الشاشة
</button>


    </div>

    <!-- منطقة التمدد -->
    <ScreenLinkSection
      v-if="showScreenLink"
      :screen="screen"
    />

    <ScreenOfferSection
      v-if="showOfferLink"
      :screen="screen"
      :models="models"
      @assign="emit('assign', $event)"
      @remove="emit('remove', $event)"
    />

    <ScreenInfoSection
      v-if="showInfo"
      :screen="screen"
    />

    <div v-if="locked" class="lock-overlay">
      <span class="premium-text">العضوية بريميوم</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { supabase } from "@/supabase"

import ScreenLinkSection from "./ScreenLinkSection.vue"
import ScreenOfferSection from "./ScreenOfferSection.vue"
import ScreenInfoSection from "./ScreenInfoSection.vue"

export interface Screen {
  id: string
  number: number
  screen_id: number  
  offer_id: string | null
  is_active: boolean 
  activation_code: string
  last_seen?: string | null
  device_id?: string | null
  app_version?: string | null
  os_version?: string | null
  resolution?: string | null
  ip_address?: string | null
  is_broadcasting?: boolean
}

export interface Offer {
  id: string
  offer_number: number
}

const props = defineProps<{
  screen: Screen,
  locked: boolean,
  openScreenId: string | null,
  models: Offer[]          // ← الآن نستقبل العروض من الأب
}>()

const emit = defineEmits<{
  (e: "toggle", screen: Screen): void
  (e: "assign", payload: { screen: Screen; model: Offer }): void
  (e: "remove", screen: Screen): void
  (e: "broadcast", screen: Screen): void
  (e: "open", id: string): void
}>()

/* رابط التفعيل */
const url = computed(() => `/activate/${props.screen.id}`)

/* منطق التمدد */
const showScreenLink = ref(false)
const showOfferLink = ref(false)
const showInfo = ref(false)

watch(
  () => props.openScreenId,
  (val) => {
    if (val !== props.screen.id) {
      showScreenLink.value = false
      showOfferLink.value = false
      showInfo.value = false
    }
  }
)

const openAndToggle = (section: 'screen' | 'offer' | 'info') => {
  if (props.openScreenId === props.screen.id) {
    if (
      (section === 'screen' && showScreenLink.value) ||
      (section === 'offer' && showOfferLink.value) ||
      (section === 'info' && showInfo.value)
    ) {
      showScreenLink.value = false
      showOfferLink.value = false
      showInfo.value = false
      return
    }
  }

  emit("open", props.screen.id)

  showScreenLink.value = section === 'screen'
  showOfferLink.value = section === 'offer'
  showInfo.value = section === 'info'
}

/* تشغيل/إيقاف البث */
const toggleBroadcast = async () => {
  const newState = !props.screen.is_broadcasting

  await supabase
    .from("screens")
    .update({ is_broadcasting: newState })
    .eq("id", props.screen.id)

  props.screen.is_broadcasting = newState
  emit("broadcast", props.screen)
}
</script>


<style scoped>

/* ===========================
   بطاقة الشاشة (نفس ستايل العروض)
=========================== */
.screen-card {
  background: #ffffff;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 14px;
  direction: rtl;
}

/* ===========================
   الصف العلوي
=========================== */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.screen-link {
  font-size: 16px;
  font-weight: 700;
  color: #111;
}

/* ===========================
   أزرار التمدد (Tabs)
=========================== */
.actions-row {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px 0;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
  font-size: 12px;   /* ← أصغر وأجمل */
  font-weight: 600;
  transition: 0.25s ease;
}


.action-btn:hover {
  background: #eef2ff;
}

.action-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
}

/* ===========================
   صندوق الأقسام المتمددة
=========================== */
.expand-box {
  margin-top: 6px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

/* ===========================
   أنيميشن التمدد
=========================== */
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

/* =========================== السويتش (نفس التصميم القديم) =========================== */ 
.switch { position: relative; width: 48px; height: 26px; display: inline-block; } 
.switch input { opacity: 0; width: 0; height: 0; } 
.slider { position: absolute; inset: 0; background-color: #d1d5db; border-radius: 26px; transition: .4s; cursor: pointer; } 
.slider:before { content: ""; position: absolute; height: 20px; width: 20px; left: 3px; bottom: 3px; background: #ffffff; border-radius: 50%; transition: .4s; } input:checked + .slider { background-color: #4ade80; /* أخضر */ } input:checked + .slider:before { transform: translateX(22px); }
/* ===========================
   الجوال
=========================== */
@media (max-width: 600px) {
  .screen-card {
    padding: 14px;
    border-radius: 12px;
  }

  .screen-link {
    font-size: 14px;
  }

  .action-btn {
    font-size: 10px;
    padding: 8px 0;
  }

  .expand-box {
    padding: 12px;
  }
  .switch { width: 40px; height: 22px; } .slider:before { width: 16px; height: 16px; } input:checked + .slider:before { transform: translateX(18px); }
}

</style>



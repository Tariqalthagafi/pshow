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

      <button class="action-btn" :disabled="locked" @click="!locked && openAndToggle('screen')">
        ربط الشاشة
      </button>

      <button class="action-btn" :disabled="locked" @click="!locked && openAndToggle('offer')">
        ربط العرض
      </button>

      <button class="action-btn" :disabled="locked" @click="!locked && openAndToggle('info')">
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
import { ref, computed, onMounted , watch } from "vue"
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
  openScreenId: string | null
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

/* تحميل العروض */
const models = ref<Offer[]>([])

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

onMounted(async () => {
  const { data } = await supabase
    .from("offers")
    .select("id, offer_number")
    .order("offer_number", { ascending: true })

  models.value = data || []
})

/* منطق التمدد */
const showScreenLink = ref(false)
const showOfferLink = ref(false)
const showInfo = ref(false)

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

<style>
.screen-card {
  background: #ffffff;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #d1d5db; /* رمادي أنعم */
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 16px;
  direction: rtl;
}

/* الصف العلوي */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.screen-link {
  font-size: 16px;
  font-weight: 600;
  color: #111; /* أسود */
  text-decoration: none;
}

/* صف الأزرار */
.actions-row {
  display: flex;
  gap: 10px;
}

/* زر أبيض + حدود رمادية */
.action-btn {
  flex: 1;
  background: #ffffff;
  color: #111;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s ease;
}

.action-btn:hover {
  background: #f3f4f6;
}

/* سويتش التفعيل */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d1d5db;
  transition: .4s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4ade80; /* أخضر */
}

input:checked + .slider:before {
  transform: translateX(22px);
}

/* صندوق التمدد */
.expand-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 12px;
  border-radius: 10px;
}

.screen-card.locked {
  opacity: 0.6;
  position: relative;
  pointer-events: none;
}

.lock-overlay {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 28px;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #b45309; /* نفس لون تاق العضوية بريميوم */
  border-radius: 10px 10px 0 0;
  pointer-events: none;
  border: 1px solid #facc15;
  border-bottom: none;
}

.premium-text {
  background: #facc15;
  padding: 3px 10px;
  border-radius: 6px;
  color: #1f2937;
}


.locked-text {
  color: #9ca3af;
  cursor: not-allowed;
}


/* إزالة الحدود السوداء عند الضغط */
.action-btn:focus {
  outline: none !important;
  box-shadow: 0 0 0 2px #c7d2fe !important; /* أزرق فاتح */
  border-color: #6366f1 !important; /* أزرق بنفسجي */
}


/* تأثير الضغط (Active) */
.action-btn:active {
  background: #e0e7ff !important; /* أزرق فاتح جميل */
  border-color: #6366f1 !important; /* أزرق بنفسجي */
  color: #1e1b4b !important;
  transform: scale(0.97);
}

/* تحسين كامل للجوال */
@media (max-width: 600px) {

  .screen-card {
    padding: 14px;
    border-radius: 12px;
    gap: 12px;
  }

  .top {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .screen-link {
    font-size: 14px;
  }

  /* تصغير السويتش */
  .switch {
    width: 40px;
    height: 22px;
  }

  .slider:before {
    height: 16px;
    width: 16px;
    bottom: 3px;
    left: 3px;
  }

  input:checked + .slider:before {
    transform: translateX(18px);
  }

  /* الأزرار تتحول إلى عمود */
  .actions-row {
    flex-direction: column;
    gap: 8px;
  }

  .action-btn {
    width: 100%;
    font-size: 12px;
    padding: 8px;
  }

  /* أقسام التمدد */
  .expand-box,
  .screen-info,
  .screen-offer,
  .screen-link-section {
    margin-top: 10px;
  }
}

.action-btn:active {
  background: #f0f0f0 !important;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.08);
  transform: scale(0.96);
}

/* تصغير الأزرار داخل الكرت */ 
.action-btn { padding: 6px 10px !important; font-size: 12px !important; border-radius: 6px !important; } 
/* تصغير المسافة بين الأزرار */ 
.actions-row { gap: 6px !important; } 
/* تصغير الكرت نفسه */ 
.screen-card { padding: 14px !important; gap: 12px !important; } 
/* تصغير النص العلوي */ 
.screen-link { font-size: 14px !important; }

</style>

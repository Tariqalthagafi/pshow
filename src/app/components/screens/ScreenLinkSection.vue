<template>
  <div class="expand-box">

    <!-- حالة الشاشة -->
    <div class="status-row">
      <span class="label">الحالة:</span>
      <span class="value" :class="statusClass">{{ statusText }}</span>
    </div>



    <!-- معرف الشاشة -->
    <div class="activation-code">
      رمز المستخدم: {{ screen.screen_id }}
    </div>

    <!-- رمز التفعيل -->
    <div class="activation-code">
      رمز التفعيل: {{ screen.activation_code }}
    </div>

    <!-- زر نسخ رابط التفعيل -->
    <button class="copy-btn" @click="copyLink">نسخ رابط التفعيل</button>

    <!-- الرابط -->
    <div class="link-box">
      <span class="link-text">{{ fullUrl }}</span>
    </div>

    <!-- زر فصل الربط -->
    <button class="unlink-btn" @click="unlinkScreen">
      فصل الربط
    </button>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { supabase } from "@/supabase"

const props = defineProps<{
  screen: {
    number: number
    screen_id: number
    activation_code: string
  }
}>()

/* رابط التفعيل */
const fullUrl = computed(() => `${window.location.origin}/activate`)

/* نسخ الرابط */
const copyLink = () => {
  navigator.clipboard.writeText(fullUrl.value)
  alert("تم نسخ الرابط")
}

/* هل الشاشة مرتبطة؟ */
const isLinked = ref(false)

onMounted(async () => {
  const { data } = await supabase
    .from("screen_activation")
    .select("id")
    .eq("screen_id", props.screen.screen_id)
    .maybeSingle()

  isLinked.value = !!data
})

/* نص الحالة */
const statusText = computed(() => {
  return isLinked.value ? "مرتبطة" : "غير مرتبطة"
})

/* لون الحالة */
const statusClass = computed(() => {
  return isLinked.value ? "online" : "offline"
})

/* فصل الربط */
const unlinkScreen = async () => {
    console.log("VALUE SENT TO SUPABASE:", props.screen.screen_id)

  const { error } = await supabase
    .from("screen_activation")
    .delete()
    .eq("screen_id", props.screen.screen_id)

  if (error) {
    alert("فشل في فصل الربط من قاعدة البيانات")
    return
  }

  // إعادة التحقق من وجود السجل فعليًا
  const { data } = await supabase
    .from("screen_activation")
    .select("id")
    .eq("screen_id", props.screen.screen_id)
    .maybeSingle()

  isLinked.value = !!data

  if (!isLinked.value) {
    alert("تم فصل الربط عن الشاشة")
  } else {
    alert("لم يتم فصل الربط — السجل ما زال موجود")
  }
}

</script>

<style scoped>
.expand-box {
  background: #ffffff;
  border: 1px solid #d1d5db;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  direction: rtl;
}

.status-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.label {
  color: #6b7280;
}

.value {
  font-weight: 600;
  color: #111;
}

.online {
  color: #10b981;
}

.offline {
  color: #ef4444;
}

.activation-code {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  white-space: nowrap;
  font-weight: 600;
  color: #111;
}

.copy-btn {
  background: #ffffff;
  color: #111;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s ease;
}

.copy-btn:hover {
  background: #f3f4f6;
}

.link-box {
  background: #f9fafb;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.link-text {
  font-size: 13px;
  color: #111;
  direction: ltr;
  word-break: break-all;
}

.unlink-btn {
  background: #ffffff;
  color: #ef4444;
  border: 1px solid #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s ease;
}

.unlink-btn:hover {
  background: #fee2e2;
}
</style>

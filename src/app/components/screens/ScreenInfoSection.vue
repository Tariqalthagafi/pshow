<template>
  <div class="info-box">

    <!-- القسم الأول: حالة الشاشة -->
    <div class="section">
      <h4 class="section-title">معلومات الشاشة</h4>

      <div class="row">
        <span class="label">الحالة:</span>
        <span class="value" :class="statusClass">{{ statusText }}</span>
      </div>

      <div class="row">
        <span class="label">آخر اتصال:</span>
        <span class="value">{{ lastSeenText }}</span>
      </div>
    </div>

    <!-- القسم الثاني: المعلومات التقنية -->
    <div class="section">
      <h4 class="section-title">المعلومات التقنية</h4>

      <div class="row">
        <span class="label">Device ID:</span>
        <span class="value">{{ screen.device_id || '—' }}</span>
      </div>

      <div class="row">
        <span class="label">App Version:</span>
        <span class="value">{{ screen.app_version || '—' }}</span>
      </div>

      <div class="row">
        <span class="label">OS Version:</span>
        <span class="value">{{ screen.os_version || '—' }}</span>
      </div>

      <div class="row">
        <span class="label">Resolution:</span>
        <span class="value">{{ screen.resolution || '—' }}</span>
      </div>

      <div class="row">
        <span class="label">IP Address:</span>
        <span class="value">{{ screen.ip_address || '—' }}</span>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  screen: {
    is_active: boolean
    last_seen?: string | null
    device_id?: string | null
    app_version?: string | null
    os_version?: string | null
    resolution?: string | null
    ip_address?: string | null
  }
}>()

// الحالة تعتمد على is_active فقط
const statusText = computed(() => {
  return props.screen.is_active ? "Online" : "Offline"
})

const statusClass = computed(() => {
  return props.screen.is_active ? "online" : "offline"
})

// عرض آخر اتصال فقط بدون حساب الحالة
const lastSeenText = computed(() => {
  if (!props.screen.last_seen) return "—"
  return new Date(props.screen.last_seen).toLocaleString()
})
</script>


<style scoped>
.info-box {
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;

  display: flex;
  flex-direction: column;
  gap: 22px;
  direction: rtl;
}


/* كل قسم */
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* عنوان القسم */
.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
}

/* صف */
.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  width: 100%;
}

/* النصوص */
.label {
  color: #6b7280;
  flex-shrink: 0;
}

/* القيمة */
.value {
  font-weight: 600;
  color: #111;
  text-align: left;
  direction: ltr;

  /* أهم شيء — يمنع خروج النص */
  max-width: 60%;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

/* حالة الشاشة */
.online {
  color: #10b981;
}

.offline {
  color: #ef4444;
}

@media (max-width: 600px) {

.expand-box { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; border-radius: 0 !important; gap: 16px; }

  .section-title {
    font-size: 14px;
  }

  .row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .label {
    font-size: 12px;
  }

  .value {
    font-size: 13px;
    max-width: 100%;
    text-align: right;
    direction: rtl;
    word-break: break-word;
  }
}
:deep(.expand-box) {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

</style>

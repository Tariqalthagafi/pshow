<template>
  <div class="membership-card">

    <!-- العنوان + الحالة + الأزرار -->
    <div class="header">
      <div>
        <h2 class="title">العضوية</h2>

        <p class="status">
          حالتك الحالية:
          <span :class="currentPlan === 'pro' ? 'pro' : 'free'">
            {{ currentPlan === 'pro' ? 'مدفوعة (Pro)' : 'مجانية' }}
          </span>
        </p>
      </div>

      <div class="actions">
        <!-- زر الترقية -->
        <button
          v-if="currentPlan !== 'pro'"
          class="upgrade-btn"
          @click="setPlan('pro')"
        >
          ترقية إلى Pro
        </button>

        <!-- زر الخطة مفعلة -->
        <button
          v-else
          class="active-btn"
          disabled
        >
          الخطة مفعلة
        </button>

        <!-- زر العودة للخطة المجانية (اختبار فقط) -->
        <button
          v-if="currentPlan === 'pro'"
          class="test-free-btn"
          @click="setPlan('free')"
        >
          العودة للخطة المجانية (اختبار)
        </button>
      </div>
    </div>

    <!-- وصف -->
    <p class="description">
      اختر الخطة المناسبة لك. الخطة المجانية توفر الأساسيات، بينما Pro تمنحك جميع المزايا.
    </p>

    <!-- جدول المقارنة -->
    <table class="compare-table">
      <thead>
        <tr>
          <th>الميزة</th>
          <th>مجاني</th>
          <th>Pro</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(f, i) in comparison" :key="i">
          <td>{{ f.name }}</td>

          <!-- عمود المجاني -->
          <td>
            <span v-if="typeof f.free === 'number'">{{ f.free }}</span>
            <span v-else>{{ f.free ? '✔' : '—' }}</span>
          </td>

          <!-- عمود Pro -->
          <td>
            <span v-if="typeof f.pro === 'number'">{{ f.pro }}</span>
            <span v-else>{{ f.pro ? '✔' : '—' }}</span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"

const currentPlan = ref("free")
let userId = null

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user
  if (!user) return

  userId = user.id

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  currentPlan.value = profile?.plan || "free"
})

const setPlan = async (plan) => {
  if (plan === currentPlan.value) return

  await supabase
    .from("profiles")
    .update({ plan })
    .eq("id", userId)

  currentPlan.value = plan
}

const comparison = [
  { name: "عدد الشاشات", free: 1, pro: 5 },
  { name: "عدد العروض", free: 3, pro: 20 },
  { name: "رفع الصور", free: 2, pro: 10 },
  { name: "رفع فيديو", free: false, pro: true },
  { name: "جميع التأثيرات", free: false, pro: true },
  { name: "دعوة مصمم", free: false, pro: true },
  { name: "ربط الشاشة الآمن", free: false, pro: true },
]
</script>

<style scoped>
.membership-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 22px;
  direction: rtl;
  max-width: 700px;
  margin-left: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.status {
  font-size: 14px;
  color: #6b7280;
}

.status .free {
  color: #dc2626;
  font-weight: 700;
}

.status .pro {
  color: #10b981;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.upgrade-btn {
  background: #2563eb;
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.active-btn {
  background: #10b981;
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
}

.test-free-btn {
  background: #f3f4f6;
  color: #374151;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 13px;
  cursor: pointer;
}

.test-free-btn:hover {
  background: #e5e7eb;
}

.description {
  margin: 16px 0;
  color: #6b7280;
  font-size: 14px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.compare-table th,
.compare-table td {
  border-bottom: 1px solid #e5e7eb;
  padding: 10px;
  text-align: center;
}

.compare-table th {
  background: #f9fafb;
  font-weight: 700;
}
</style>

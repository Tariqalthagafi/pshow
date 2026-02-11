<template>
  <div class="membership-wrapper">

    <!-- العنوان + الحالة -->
    <div class="header">
      <h2 class="title">العضوية</h2>

      <p class="status">
        حالتك الحالية:
        <span :class="currentPlan === 'pro' ? 'pro' : 'free'">
          {{ currentPlan === 'pro' ? 'مدفوعة (Pro)' : 'مجانية' }}
        </span>
      </p>
    </div>

    <!-- بطاقة Pro -->
    <div class="pro-wrapper">

      <div class="badge">الأكثر طلبًا</div>

      <div class="pro-card">

        <h2 class="pro-title">خطة Pro</h2>
        <p class="pro-subtitle">كل ما تحتاجه لإدارة عروضك باحتراف</p>

        <ul class="features">
          <li>
            <span class="icon">✔</span>
            عروض أكثر بدون حدود تقريبًا
          </li>

          <li>
            <span class="icon">✔</span>
            حتى 5 شاشات بدلاً من شاشة واحدة
          </li>

          <li>
            <span class="icon">✔</span>
            صلاحية دعوة المصمم للعمل معك
          </li>
        </ul>

        <!-- اختيار نوع الدفع -->
<div class="billing-toggle">
  <button 
    :class="{ active: billing === 'monthly' }"
    @click="billing = 'monthly'"
  >
    شهري
  </button>

  <button 
    :class="{ active: billing === 'yearly' }"
    @click="billing = 'yearly'"
  >
    سنوي – وفر 20%
  </button>
</div>

<!-- السعر -->
<div class="price-box">
  <span class="price">{{ selectedPrice }}</span>
</div>

        <!-- زر الترقية (صغير) -->
        <button
          v-if="currentPlan !== 'pro'"
          class="upgrade-btn"
          @click="setPlan('pro')"
        >
          ابدأ الترقية الآن
        </button>

        <!-- زر الخطة مفعلة -->
        <button
          v-else
          class="active-btn"
          disabled
        >
          الخطة مفعلة
        </button>

        <!-- زر العودة للخطة المجانية (وضع التجارب) -->
        <button
          v-if="currentPlan === 'pro'"
          class="test-free-btn"
          @click="setPlan('free')"
        >
          العودة للخطة المجانية (اختبار)
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
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

const billing = ref("monthly") // monthly | yearly

const prices = {
  monthly: 39,   // سعر شهري غالي ومنافس
  yearly: 299    // سعر سنوي مع خصم
}

const selectedPrice = computed(() => {
  return billing.value === "monthly"
    ? `${prices.monthly} ريال / شهر`
    : `${prices.yearly} ريال / سنة`
})

</script>

<style scoped>
.membership-wrapper {
  direction: rtl;
  padding: 20px;
}

/* العنوان */
.header {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 800;
}

.status {
  font-size: 14px;
  color: #6b7280;
  margin-top: 6px;
}

.status .free {
  color: #dc2626;
  font-weight: 700;
}

.status .pro {
  color: #10b981;
  font-weight: 700;
}

/* بطاقة Pro */
.pro-wrapper {
  width: 100%;
  position: relative;
  margin-top: 20px;
}

.badge {
  position: absolute;
  top: -12px;
  right: 16px;
  background: #facc15;
  color: #1f2937;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
}

.pro-card {
  width: 100%;
  padding: 26px 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  color: white;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  transition: 0.25s ease;
}

.pro-card:hover {
  transform: translateY(-4px);
}

.pro-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 6px;
}

.pro-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 20px;
}

/* المزايا */
.features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
}

.icon {
  font-size: 16px;
  font-weight: 700;
}

/* زر الترقية (صغير) */
.upgrade-btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: white;
  color: #1f2937;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
  width: auto;
  align-self: flex-start;
}

.upgrade-btn:hover {
  background: #f3f4f6;
}

/* زر الخطة مفعلة */
.active-btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #10b981;
  color: white;
  font-size: 15px;
  font-weight: 700;
  width: auto;
  align-self: flex-start;
}

/* زر العودة للخطة المجانية */
.test-free-btn {
  margin-top: 10px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
  cursor: pointer;
  width: auto;
  align-self: flex-start;
}

.test-free-btn:hover {
  background: #e5e7eb;
}

.billing-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}


.billing-toggle button {
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.25);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  font-size: 13px;
  width: auto;
}


.billing-toggle button.active {
  background: white;
  color: #1f2937;
  font-size: 13px;
  padding: 6px 14px;
}


.price-box {
  margin-bottom: 20px;
}

.price {
  font-size: 22px;
  font-weight: 800;
}

</style>

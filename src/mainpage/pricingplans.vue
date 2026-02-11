<template>
  <section class="pricing-section">

    <div class="single-card">

      <!-- زر شهري / سنوي داخل البطاقة -->
      <div class="toggle-container">
        <button
          :class="['toggle-btn', billingCycle === 'monthly' ? 'active' : '']"
          @click="billingCycle = 'monthly'"
        >
          شهري
        </button>

        <button
          :class="['toggle-btn', billingCycle === 'yearly' ? 'active' : '']"
          @click="billingCycle = 'yearly'"
        >
          سنوي
        </button>
      </div>

      <div class="plans-wrapper">

        <!-- الباقة الأساسية -->
        <div class="plan-section">
          <h3 class="plan-title">الباقة الأساسية</h3>
          <p class="plan-price">مجانية</p>

          <ul class="plan-features">
            <li>✔ رفع الصور حتى صورتين</li>
            <li>✔ عرض شاشة واحدة</li>
            <li>✔ إنشاء عرض واحد فقط</li>
          </ul>
        </div>

        <!-- خط فاصل -->
        <div class="divider"></div>

        <!-- الباقة الاحترافية -->
        <div class="plan-section">
          <h3 class="plan-title">الباقة الاحترافية</h3>

          <p class="plan-price">
            {{ billingCycle === 'monthly' ? '70 ريال' : '650 ريال' }}
          </p>

          <p class="plan-subtitle">
            {{ billingCycle === 'monthly' ? 'شهري' : 'سنوي' }}
          </p>

          <ul class="plan-features">
            <li>✔ كل مميزات الباقة الأساسية</li>
            <li>✔ رفع الصور والفيديو</li>
            <li>✔ جدولة المحتوى</li>
            <li>✔ حتى 5 شاشات</li>
            <li>✔ إنشاء حتى 30 عرض</li>
            <li>✔ مساحة تخزينية سحابية</li>
            <li>✔ أولوية الدعم الفني</li>
          </ul>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from "vue"
const billingCycle = ref("monthly")
</script>

<style>
/* القسم */
.pricing-section {
  width: 100%;
  max-width: 48rem;
  margin: 4rem auto;
  padding: 0 1.5rem;
}

/* البطاقة */
.single-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  text-align: center;
}

/* زر التبديل */
.toggle-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.toggle-btn {
  padding: .6rem 1.5rem;
  border-radius: .75rem;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  cursor: pointer;
  transition: .2s;
  font-size: 1rem;
}

.toggle-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* محتوى الباقات */
.plans-wrapper {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
}

.plan-section {
  flex: 1;
  text-align: center;
}

/* الفاصل */
.divider {
  width: 1px;
  background: #e5e7eb;
  height: 100%;
}

/* النصوص */
.plan-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: .5rem;
  color: #111827;
}

.plan-price {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2563eb;
}

.plan-subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* المميزات */
.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 18rem;
  text-align: right;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: .6rem;
  font-size: 1.05rem;
}

/* موبايل */
@media (max-width: 768px) {
  .plans-wrapper {
    flex-direction: column;
  }

  .divider {
    width: 100%;
    height: 1px;
  }
}
</style>

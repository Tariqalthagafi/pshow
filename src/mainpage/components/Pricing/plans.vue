<template>
  <section class="pricing-section" dir="rtl">
<h2>الاشتراك والباقات</h2>
    <div class="single-card">

      <!-- زر شهري / سنوي داخل البطاقة -->
      <div class="plans-wrapper">

        <!-- الباقة الأساسية -->
        <div class="plan-section">
          <h3 class="plan-title">الباقة الأساسية</h3>
              <div class="w-full flex justify-center my-12">
  
     <googleloginbutton label="ابدأ الآن مجانًا" client:load />
              
    </div>

          <p class="plan-price">مجانا</p>

          <ul class="plan-features">
            <li>✔ رفع الصور حتى 10 صور</li>
            <li>✔ قبول اكثر من صيغه للصور</li>
            <li>✔ تشغيل شاشة واحدة</li>
            <li>✔ إنشاء عرض واحد فقط</li>
            <li>✔ دعوة مصمم للعرض</li>
          </ul>
        </div>

        <!-- خط فاصل -->
        <div class="divider"></div>

        <!-- الباقة الاحترافية -->
        <div class="plan-section">
          <h3 class="plan-title">باقة بريميوم</h3>

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

          <p class="plan-price">
            {{ billingCycle === 'monthly' ? '65 ريال' : '650 ريال' }}
          </p>



          <ul class="plan-features">
            <li>+ كل مميزات الباقة الأساسية</li>
            <li>✔ حتى 5 شاشات</li>
            <li>✔ إنشاء حتى 20 عرض</li>
            
            <li>✔  الدعم الفني</li>
          </ul>
        </div>

        <!-- الباقة بلس -->
<div class="plan-section">
  <h3 class="plan-title">باقة بلس</h3>

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

  <p class="plan-price">
    {{ billingCycle === 'monthly' ? '165 ريال' : '1600 ريال' }}
  </p>

  <ul class="plan-features">
    <li>+ كل مميزات الباقة الاحترافية</li>
    <li>✔ حتى 10 شاشات</li>
    <li>✔ إنشاء عروض حتى 40 عرض</li>
    <li>✔ اولوية الدعم الفني</li>
  </ul>
</div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from "vue"
import googleloginbutton from "@/mainpage/components/Header/LoginButton.vue" 

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

.pricing-section h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #111827;
}


/* البطاقة */
.single-card {
  background: #ffffff;
  border: none;              /* إزالة كل الحدود */
  border-top: 1px solid #e5e7eb; /* الإبقاء على الحد السفلي فقط */
  border-radius: 0;          /* بدون زوايا */
  padding: 2rem;
  box-shadow: none;          /* إزالة الظل لو تبغى شكل أنظف */
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
  text-align: center;
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

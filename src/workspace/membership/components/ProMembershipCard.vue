<template>
  <div class="pro-wrapper">

    <!-- شارة أعلى البطاقة -->
    <div class="badge">الأكثر طلبًا</div>

    <!-- بطاقة Pro -->
    <div class="pro-card">

      <!-- حالة المستخدم -->
      <p class="status">
        الباقة الحالية:
        <span :class="isActive ? 'pro' : 'free'">
          {{ isActive ? 'مدفوعة (Pro)' : 'مجانية' }}
        </span>
      </p>

      <!-- اختيار شهري / سنوي -->
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
      <p class="price">
        {{ billing === 'monthly' ? '39 ريال / شهر' : '299 ريال / سنة' }}
      </p>

      <!-- زر الترقية -->
      <button class="upgrade-btn" @click.stop="$emit('subscribe', billing)">
  خطة Pro — الترقية الآن
</button>
<button 
  v-if="isActive"
  class="cancel-btn"
  @click.stop="$emit('cancel')"
>
  العودة للخطة المجانية
</button>


      <!-- الوصف -->
      <p class="subtitle">احصل على مزايا الترقيه </p>

      <!-- المزايا -->
      <ul class="features">
        <li>
          <span class="icon">✔</span>
          عروض أكثر حتى 10 عروض
        </li>

        <li>
          <span class="icon">✔</span>
           5 شاشات بدلاً من شاشة واحدة
        </li>

        <li>
          <span class="icon">✔</span>
          صلاحية دعوة المصمم للعمل معك
        </li>
      </ul>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  isActive: Boolean
})

defineEmits(["select", "subscribe", "cancel"])



const billing = ref("monthly")
</script>

<style scoped>
/* الحالة */
.status {
  font-size: 14px;
  margin-bottom: 10px;
  color: #e5e7eb;
}

.status .free {
  color: #fca5a5;
  font-weight: 700;
}

.status .pro {
  color: #6ee7b7;
  font-weight: 700;
}

/* الحاوية العامة */
.pro-wrapper {
  width: 100%;
  position: relative;
  direction: rtl;
  margin-top: 20px;
}

/* شارة الأكثر طلبًا */
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

/* بطاقة Pro — التصميم القديم */
.pro-card {
  width: 98%;
  padding: 26px 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  color: white;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: 0.25s ease;
}

.pro-card:hover {
  transform: translateY(-4px);
}

/* اختيار شهري / سنوي */
.billing-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
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
}

.billing-toggle button.active {
  background: white;
  color: #1f2937;
}

/* السعر */
.price {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 14px;
}

/* الوصف */
.subtitle {
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

/* زر الترقية */
.upgrade-btn {
  width: auto; 
  display: inline-block;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: white;
  color: #1f2937;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
  margin-bottom: 14px;
}

.upgrade-btn:hover {
  background: #f3f4f6;
}

@media (max-width: 600px) {
  .pro-card {
    padding: 18px 14px;
  }

  .price {
    font-size: 18px;
  }

  .upgrade-btn {
    font-size: 14px;
    padding: 10px 14px;
  }

  .billing-toggle button {
    padding: 6px 10px;
    font-size: 12px;
  }

  .features li {
    font-size: 13px;
  }
}

</style>

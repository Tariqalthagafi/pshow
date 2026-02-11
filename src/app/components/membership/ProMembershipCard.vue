<template>
  <div class="pro-wrapper">

    <!-- شارة أعلى البطاقة -->
    <div class="badge">الأكثر طلبًا</div>

    <!-- بطاقة Pro -->
    <div class="pro-card" @click="$emit('select')">

      <h2 class="title">خطة Pro</h2>
      <p class="subtitle">كل ما تحتاجه لإدارة عروضك باحتراف</p>

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

      <button class="upgrade-btn">
        ابدأ الترقية الآن
      </button>

    </div>

  </div>
</template>

<script setup>
defineEmits(["select"])
</script>

<style scoped>
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

/* بطاقة Pro */
.pro-card {
  width: 100%;
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

/* العنوان */
.title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 6px;
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
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: white;
  color: #1f2937;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
}

.upgrade-btn:hover {
  background: #f3f4f6;
}
</style>

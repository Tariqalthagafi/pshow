<template>
  <div class="coming-soon-wrapper">
    <h2>ميزة المهام (قريبا) </h2>
    <p>هذه الميزة غير متاحة حاليًا وسيتم إطلاقها في النسخة القادمة.</p>
  </div>
</template>

<script setup lang="ts">
// تم تعطيل موديول المصمم بالكامل مؤقتًا
</script>

<style scoped>
.coming-soon-wrapper {
  padding: 40px 24px;
  text-align: center;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  margin-top: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  animation: fadeIn 0.5s ease;
}

.coming-soon-wrapper h2 {
  font-size: 22px;
  margin-bottom: 12px;
  font-weight: 700;
  color: #1f2937;
}

.coming-soon-wrapper p {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  max-width: 320px;
  margin: 0 auto;
}

/* حركة دخول لطيفة */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

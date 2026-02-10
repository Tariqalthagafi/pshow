<template>
  <div class="description-wrapper">
    <p class="product-description">
      تحكّم في كل شاشات منشأتك من مكان واحد.  
      حمّل المحتوى، رتّب العروض، وجدول التشغيل بسهولة تامة.  
      اختر الباقة التي تناسب احتياجاتك.
    </p>

    <button class="cta-btn" @click="scrollToPlans">
      استعرض الباقات
    </button>
  </div>
</template>

<script setup>
function scrollToPlans() {
  const section = document.querySelector("#pricing-section")
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}
</script>

<style scoped>
.description-wrapper {
  text-align: center;
}

/* النص */
.product-description {
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;

  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp .6s ease forwards;
}

/* زر CTA */
.cta-btn {
  background: #2563eb;
  color: white;
  padding: 0.7rem 1.8rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.25s ease;
  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.25);

  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp .6s ease forwards;
  animation-delay: .15s;
}

.cta-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
}

/* حركة الدخول */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

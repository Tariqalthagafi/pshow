<template>
  <div class="slide-content flex flex-col items-center text-center px-6 py-12">

    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
      عروض احترافية… بدون أي جهد
    </h2>

    <p class="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
      مع ProShow تحصل على نظام متكامل يسهّل عليك إدارة المحتوى والعروض  
      ويمنحك تجربة سلسة من البداية للنهاية.  
      وفّر وقتك، وركّز على ما يهمك، ودع النظام يتكفّل بالباقي.
    </p>

    <ul class="text-gray-700 text-lg max-w-xl space-y-3 mb-8">
      <li>✔ نتائج احترافية بدون خبرة تقنية</li>
      <li>✔ تنظيم كامل لكل شاشات منشأتك</li>
      <li>✔ تجربة استخدام سريعة وسلسة</li>
      <li>✔ دعم مستمر وتطوير دائم</li>
    </ul>

  </div>
</template>

<script setup>
</script>

<style scoped>
.slide-content {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeInUp .7s ease forwards;

  /* التوسيط */
  display: flex;
  flex-direction: column;
  justify-content: center; /* عمودي */
  align-items: center;     /* أفقي */
  text-align: center;

  height: 100%; /* مهم جداً */
}


@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

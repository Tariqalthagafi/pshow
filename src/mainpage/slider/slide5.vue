<template>
  <div class="slide-content flex flex-col items-center text-center px-6 py-12">

    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
      ثلاث خطوات فقط لتشغيل عروضك باحترافية
    </h2>

    <p class="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
      أنشئ العرض، ادعُ المصمم، واعرض المحتوى على شاشاتك مباشرة.  
      تجربة بسيطة وسريعة بدون أي تعقيد تقني، لتمنحك تحكّمًا كاملًا في كل ما يظهر على شاشات منشأتك.
    </p>

    <ul class="text-gray-700 text-lg max-w-xl space-y-3 mb-8">
      <li>✔ أنشئ عروضك بسهولة</li>
      <li>✔ اربط المصممين وامنحهم صلاحيات العمل</li>
      <li>✔ اعرض المحتوى على شاشاتك فورًا</li>
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

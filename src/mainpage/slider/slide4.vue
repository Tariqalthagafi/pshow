<template>
  <div class="slide-content flex flex-col items-center text-center px-6 py-12">

    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
      لماذا يختار المستخدمون ProShow؟
    </h2>

    <p class="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
      نظام متكامل لإدارة الشاشات والعروض باحترافية.  
      واجهة سهلة، أداء سريع، وأدوات ذكية تساعدك على تنظيم المحتوى  
      ودعوة المصممين ومتابعة العمل من مكان واحد.
    </p>

    <ul class="text-gray-700 text-lg max-w-xl space-y-3 mb-8">
      <li>✔ واجهة بسيطة وسهلة الاستخدام</li>
      <li>✔ إدارة مركزية لكل الشاشات والعروض</li>
      <li>✔ دعوات مصممين مدمجة داخل النظام</li>
      <li>✔ أمان عالي وسرعة عبر Supabase</li>
      <li>✔ تحديثات مستمرة وتجربة محسّنة</li>
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

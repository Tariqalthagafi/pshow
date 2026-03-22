<template>
  <div class="slide-content" dir="rtl">

    <div class="inner-wrapper">

      <!-- النص يمين -->
      <div class="text-box">
        <h2>
          ‫مهما كان نشاط منشأتك.  
          ‫سواء كنت تدير مطعمًا، مكتبًا، مقهى، عيادة أو معرضًا،  
          ProShow يمنحك محتوى مرنًا، تحكّمًا فوريًا، وعرضًا موحّدًا يغطي كل احتياجاتك.
        </h2>
      </div>

      <!-- النقاط يسار -->
      <div class="list-box">
        <ul>
          <li>✔ شاشات عرض المطاعم</li>
          <li>✔ شاشات عرض المعارض والمتاجر</li>
          <li>✔ شاشات الممرات داخل المنشآت</li>
          <li>✔ شاشات المكاتب والاستقبال</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* السلايد كامل */
.slide-content {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeInUp .7s ease forwards;

  height: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* الحاوية الداخلية */
.inner-wrapper {
  width: 100%;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* النص يمين */
.text-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.text-box h2 {
  max-width: 420px;
  text-align: right;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.6;
  color: #1f2937;
}

/* القائمة يسار */
.list-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.list-box ul {
  max-width: 420px;
  font-size: 20px;
  line-height: 1.8;
  color: #4b5563;
  list-style: none;
  padding: 0;
}

.list-box li {
  margin-bottom: 8px;
}

/* على الشاشات الكبيرة: صف */
@media (min-width: 768px) {
  .inner-wrapper {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

/* الأنيميشن */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

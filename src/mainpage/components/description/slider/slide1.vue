<template>
  <div class="slide-content">

    <div class="inner-wrapper">

      <!-- الصورة يسار -->
      <div class="image-box">
        <img 
          src="/slides/slide1.jpg" 
          alt="Digital signage screens" 
        />
      </div>

      <!-- النص يمين -->
      <div class="text-box">
        <h2>
          من مكان واحد تحكّم في كل شاشات منشأتك، حمل المحتوى رتّب العروض على الشاشات وابدأ البث بسهولة تامة وبدون أي تعقيد.
        </h2>
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

/* الصورة يسار */
.image-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.image-box img {
  width: 100%;
  max-width: 360px;
  border-radius: 12px;
  object-fit: cover;
}

/* النص يمين */
.text-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.text-box h2 {
  max-width: 360px;
  text-align: right;
  font-size: 20px;
  line-height: 1.7;
  color: #4b5563;
}

/* على الشاشات الكبيرة: صف */
@media (min-width: 768px) {
  .inner-wrapper {
    flex-direction: row;
    align-items: center;
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

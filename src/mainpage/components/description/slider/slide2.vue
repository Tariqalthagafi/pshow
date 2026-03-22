<template>
  <div class="slide-content" dir="rtl">

    <div class="inner-wrapper">

      <!-- النص يسار -->
      <div class="text-box">
        <h2>
          سهولة إدارة المحتوى على شاشاتك مع مزامنة مباشرة للتغييرات؛  
          أنشئ عروضك، وأرفق الصور والفيديو، ورتّب الشرائح كما تريد.
        </h2>
      </div>

      <!-- الصورة يمين -->
      <div class="image-box">
        <img 
          src="/slides/slide2.webp" 
          alt="Content management preview"
        />
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

/* النص يسار */
.text-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.text-box h2 {
  max-width: 360px;
  text-align: left;
  font-size: 20px;
  line-height: 1.7;
  color: #4b5563;
}

/* الصورة يمين */
.image-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.image-box img {
  width: 100%;
  max-width: 360px;
  border-radius: 12px;
  object-fit: cover;
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

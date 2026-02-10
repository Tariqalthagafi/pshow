<template>
  <section class="pricing-section">

    <div class="pricing-grid">

      <!-- الباقة الأساسية -->
      <div class="plan-card">
        <h3 class="plan-title">الباقة الأساسية</h3>
        <p class="plan-subtitle">مناسبة للتجربة د</p>
        <p class="plan-price">مجانية</p>

        <ul class="plan-features">
          <li>✔  رفع الصور حتى صورتين</li>
          <li>✔ عرض شاشة واحدة</li>
          <li>✔ انشاء عرض واحد فقط </li>
        </ul>

        <button class="plan-btn">ابدأ الاستخدام</button>
      </div>

      <!-- الباقة الاحترافية -->
      <div class="plan-card featured">
        <h3 class="plan-title featured-title">الباقة الاحترافية</h3>
        <p class="plan-subtitle featured-subtitle">الأكثر استخدامًا</p>
        <p class="plan-price featured-price">650 ريال</p>
        <p class="plan-price featured-price">سنوي</p>
        <ul class="plan-features featured-features">
          <li>✔ بالاضافة الى المجاني</li>
          <li>✔ رفع الصور والفيديو</li>
          <li>✔ جدولة المحتوى</li>
          <li>✔  حتى 5 شاشات</li>
          <li>✔ انشاء عروض لحد 30 عرض</li>
          <li>✔ مساحة تخزينية كلاود</li>
          <li>✔ اولوية الدعم الفني</li>
        </ul>

        <button class="plan-btn featured-btn">اشترك الان</button>
      </div>

      <!-- الباقة المتقدمة -->
      <div class="plan-card">
        <h3 class="plan-title">الباقة المتقدمة</h3>
        <p class="plan-subtitle">للشركات والمنشآت</p>
        <p class="plan-price"> عرض سعر خاص</p>

        <ul class="plan-features">
          <li>✔ عدد غير محدود من الشاشات</li>
          <li>✔ دعم فني مخصص</li>
          <li>✔ عروض مخصصة</li>
        </ul>

        <button class="plan-btn"> تواصل معنا</button>
      </div>

    </div>
  </section>
</template>

<script setup>
// لاحقاً نضيف props أو dynamic plans
</script>

<style>
/* القسم */
.pricing-section {
  width: 100%;
  max-width: 64rem;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
}

/* العنوان */
.pricing-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #111827;
}

/* الشبكة */
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* بطاقة الباقة */
.plan-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all .25s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

/* الباقة المميزة */
.featured {
  background: #1e40af;
  color: white;
  border: 2px solid #1d4ed8;
  transform: scale(1.05);
}

.featured:hover {
  transform: scale(1.05) translateY(-4px);
}

/* النصوص */
.plan-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: .5rem;
}

.plan-subtitle {
  color: #6b7280;
  margin-bottom: 1rem;
}

.plan-price {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

/* النصوص داخل الباقة المميزة */
.featured-title,
.featured-subtitle,
.featured-price {
  color: white;
}

.featured-subtitle {
  opacity: .8;
}

/* المميزات */
.plan-features {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.featured-features {
  color: #e0e7ff;
}

/* زر الباقة */
.plan-btn {
  background: #2563eb;
  color: white;
  padding: .6rem 1.5rem;
  border-radius: .75rem;
  border: none;
  cursor: pointer;
  transition: background .2s ease;
  font-size: .95rem;
}

.plan-btn:hover {
  background: #1d4ed8;
}

/* زر الباقة المميزة */
.featured-btn {
  background: white;
  color: #1e40af;
}

.featured-btn:hover {
  background: #f3f4f6;
}
</style>

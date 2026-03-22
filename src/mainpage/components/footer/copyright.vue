<template>
  <footer class="footer-container">
    <div class="footer-inner">
      <p class="footer-text">
        © {{ new Date().getFullYear() }} جميع الحقوق محفوظة — <span class="brand">PShow</span>
      </p>

      <div class="footer-links">
        <a href="#" class="footer-link">سياسة الخصوصية</a>
        <span class="dot">•</span>
        <a href="#" class="footer-link">الشروط والأحكام</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// لا يوجد منطق حالياً
</script>

<style>
.footer-container {
  width: 100%;
  margin-top: 5rem;
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb; /* gray-200 */
  background: #fafafa;
}

.footer-inner {
  max-width: 64rem; /* 1024px */
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
}

.footer-text {
  color: #6b7280; /* gray-500 */
  font-size: .875rem;
  letter-spacing: .03em;
}

.brand {
  font-weight: 600;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #9ca3af; /* gray-400 */
  font-size: .875rem;
}

.footer-link {
  color: #9ca3af;
  transition: color .2s ease;
  text-decoration: none;
}

.footer-link:hover {
  color: #4b5563; /* gray-600 */
}

.dot {
  opacity: .4;
}
</style>

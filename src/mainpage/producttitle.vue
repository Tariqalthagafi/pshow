<template>
  <h1 class="product-title">
    نظام عرض الشاشات
  </h1>
</template>

<script setup>
// لا يوجد منطق حالياً
</script>

<style>
.product-title {
  font-size: 2.5rem; /* text-4xl */
  font-weight: 800;
  color: #111827; /* gray-900 */
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.5px;

  /* حركة دخول ناعمة */
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeDown .6s ease forwards;
}

@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

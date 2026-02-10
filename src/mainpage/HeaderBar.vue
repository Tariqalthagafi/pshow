<template>
  <header class="header-bar">
    <Logo  />
    <googleloginbutton client:load />

  </header>
</template>

<script setup>
import Logo from "./Logo.vue"
import googleloginbutton from "./googleloginbutton.vue"
</script>

<style scoped>
.header-bar {
  width: 98%;
  background: transparent;

  /* ارتفاع صغير ومناسب للهيدر */
  padding: 0.4rem 1rem;

  display: flex;
  flex-direction: row; /* ثابت: Logo يسار – Login يمين */
  align-items: center;
  justify-content: space-between;

  box-shadow: none;
  border: none;
  transition: none;

  max-height: 55px; /* أصغر من قبل */
}

/* تصميم الجوال */
@media (max-width: 640px) {
  .header-bar {
    padding: 0.3rem 0.8rem;
    max-height: 50px;
  }


  .header-bar :deep(span) {
    font-size: 1.4rem; /* تصغير اللوقو */
  }

  .header-bar :deep(button) {
    padding: 0.4rem 0.8rem; /* تصغير زر الدخول */
    font-size: 0.85rem;
  }
}
</style>

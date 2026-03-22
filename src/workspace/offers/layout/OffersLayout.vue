<template>
  <MainLayout>
    <div class="offers-layout">

      <!-- سايدبار خاص بالعروض (تضيفه لاحقًا لو احتجته) -->
      <!-- <OffersSidebar /> -->

      <main class="offers-content">
        <slot />
      </main>

      <!-- إشعارات خاصة بموديول العروض (اختياري لاحقًا) -->
      <!-- <OffersNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.offers-layout {
  display: flex;
  width: 100%;
}

.offers-content {
  flex: 1;
  padding: 20px;
}
</style>

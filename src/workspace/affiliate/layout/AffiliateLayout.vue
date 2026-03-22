<template>
  <MainLayout>
    <div class="affiliate-layout">

      <!-- سايدبار خاص بموديول الإحالة (اختياري لاحقًا) -->
      <!-- <AffiliateSidebar /> -->

      <main class="affiliate-content">
        <slot />
      </main>

      <!-- مركز الإشعارات الخاص بالموديول (اختياري لاحقًا) -->
      <!-- <AffiliateNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.affiliate-layout {
  display: flex;
  width: 100%;
}

.affiliate-content {
  flex: 1;
  padding: 20px;
}
</style>

<template>
  <MainLayout>
    <div class="screens-layout">

      <!-- سايدبار خاص بالشاشات (تضيفه لاحقًا لو احتجته) -->
      <!-- <ScreensSidebar /> -->

      <main class="screens-content">
        <slot />
      </main>

      <!-- إشعارات خاصة بموديول الشاشات (اختياري لاحقًا) -->
      <!-- <ScreensNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.screens-layout {
  display: flex;
  width: 100%;
}

.screens-content {
  flex: 1;
  padding: 20px;
}
</style>

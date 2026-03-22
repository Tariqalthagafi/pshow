<template>
  <MainLayout>
    <div class="design-tasks-layout">

      <!-- سايدبار خاص بموديول المهام (تضيفه لاحقًا لو احتجته) -->
      <!-- <DesignTasksSidebar /> -->

      <main class="design-tasks-content">
        <slot />
      </main>

      <!-- إشعارات خاصة بالموديول (اختياري لاحقًا) -->
      <!-- <DesignTasksNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.design-tasks-layout {
  display: flex;
  width: 100%;
}

.design-tasks-content {
  flex: 1;
  padding: 20px;
}
</style>

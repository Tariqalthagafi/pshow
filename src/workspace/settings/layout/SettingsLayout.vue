<template>
  <MainLayout>
    <div class="settings-layout">

      <!-- سايدبار خاص بالإعدادات (اختياري لاحقًا) -->
      <!-- <SettingsSidebar /> -->

      <main class="settings-content">
        <slot />
      </main>

      <!-- إشعارات خاصة بموديول الإعدادات (اختياري لاحقًا) -->
      <!-- <SettingsNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.settings-layout {
  display: flex;
  width: 100%;
}

.settings-content {
  flex: 1;
  padding: 20px;
}
</style>

<template>
  <MainLayout>
    <div class="membership-layout">

      <!-- سايدبار خاص بالعضوية (تضيفه لاحقًا لو احتجته) -->
      <!-- <MembershipSidebar /> -->

      <main class="membership-content">
        <slot />
      </main>

      <!-- إشعارات خاصة بموديول العضوية (اختياري لاحقًا) -->
      <!-- <MembershipNotifications /> -->

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue"
</script>

<style scoped>
.membership-layout {
  display: flex;
  width: 100%;
}

.membership-content {
  flex: 1;
  padding: 20px;
}
</style>

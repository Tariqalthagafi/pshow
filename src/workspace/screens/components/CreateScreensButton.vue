<script setup lang="ts">
/*
  هذا مكوّن زر بسيط جدًا
  لا يعرف أي شيء عن Supabase أو الخدمات
  فقط يرسل حدث "create" للصفحة
*/

const emit = defineEmits(["create"])
</script>

<template>
  <button class="create-btn" @click="emit('create')">
    إضافة شاشة جديدة
  </button>
</template>

<style scoped>
.create-btn {
  background: #4caf50;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
}

.create-btn:hover {
  background: #43a047;
}
</style>

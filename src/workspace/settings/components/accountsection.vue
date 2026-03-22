<template>
  <div class="account-card">
    <h2 class="title">معلومات الحساب</h2>

    <div class="grid">
      <div class="item">
        <p class="label">البريد الإلكتروني</p>
        <p class="value">{{ email }}</p>
      </div>

      <div class="item">
        <p class="label">الاسم الكامل</p>
        <input 
          v-model="fullName"
          class="input"
          type="text"
          placeholder="اكتب اسمك"
          @blur="saveFullName"
        />
      </div>

      <div class="item">
        <p class="label">تاريخ إنشاء الحساب</p>
        <p class="value">{{ createdAt }}</p>
      </div>

      <div class="item">
        <p class="label">آخر تسجيل دخول</p>
        <p class="value">{{ lastSignIn }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "../composables/useSettings"

const {
  email,
  fullName,
  createdAt,
  lastSignIn,
  loadAccount,
  saveFullName
} = useSettings()

loadAccount()
</script>


<style scoped>
.account-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 22px;
  direction: rtl;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);

  width: 96%;     /* ← هذا اللي يخليها تاخذ عرض الشاشة */
  margin-left: auto;
}


.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #111;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 24px;
}

.item { width: 100%; max-width: 100%; }

.label {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 2px;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.input {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  width: 100%; 
  max-width: 100%; 
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr !important;
    gap: 14px;
  }

  .account-card {
    padding: 16px;
  }

  .title {
    font-size: 20px;
  }

  .value,
  .input { font-size: 13px; padding: 8px 10px; }
}

</style>

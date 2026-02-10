<template>
  <div class="users-list">

    <div 
      v-for="user in users" 
      :key="user.id" 
      class="user-row"
    >
      <div class="info">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>

      <div class="role">{{ user.role }}</div>
      <div class="plan">{{ user.plan }}</div>

      <div :class="['status', user.status]">
        {{ user.status === 'active' ? 'نشط' : 'موقوف' }}
      </div>

      <div class="actions">
        <button class="btn">تفاصيل</button>
        <button class="btn">الباقة</button>
        <button 
          class="btn" 
          :class="user.status === 'active' ? 'stop' : 'activate'"
        >
          {{ user.status === 'active' ? 'إيقاف' : 'تفعيل' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
const users = [
  { id: 1, name: "أحمد", email: "ahmed@test.com", role: "عميل", plan: "أساسية", status: "active" },
  { id: 2, name: "سارة", email: "sara@test.com", role: "مسوّق", plan: "بريميوم", status: "inactive" },
  { id: 3, name: "طارق", email: "tariq@test.com", role: "عميل", plan: "أساسية", status: "active" },
]
</script>

<style scoped>
.users-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-row {
  background: white;
  padding: 16px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  direction: rtl;
}

.info h3 {
  font-size: 18px;
  font-weight: 700;
}

.info p {
  font-size: 14px;
  color: #666;
}

.role, .plan, .status {
  font-size: 16px;
  font-weight: 600;
}

.status.active {
  color: #059669;
}

.status.inactive {
  color: #dc2626;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  background: #e5e7eb;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.2s;
}

.btn:hover {
  background: #d1d5db;
}

.btn.stop {
  background: #dc2626;
  color: white;
}

.btn.activate {
  background: #059669;
  color: white;
}
</style>

<template>
  <aside class="sidebar">
    <h2 class="title">لوحة الإدارة</h2>

    <nav class="menu">
      <a href="/admin" class="item">لوحة التحكم</a>
      <a href="/admin/users" class="item">المستخدمين</a>
      <a href="/admin/affiliates" class="item">المسوقين</a>
      <a href="/admin/billing" class="item">الفواتير</a>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: white;
  height: 100vh;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  direction: rtl;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  transition: 0.2s;
}

.item:hover {
  background: #f3f4f6;
}
</style>

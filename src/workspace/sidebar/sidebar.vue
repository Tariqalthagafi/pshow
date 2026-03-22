<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="toggle">☰</button>

      <span class="sidebar-title" v-if="!collapsed">
        مرحبًا {{ firstName }}
      </span>
    </div>

    <nav class="sidebar-nav">

      <router-link 
        to="/usage-guide"
        class="sidebar-link"
        :class="{ active: currentPath === '/usage-guide' }"
      >
        <img class="icon-img" src="/icons/info.png" />
        <span class="label" v-if="!collapsed">دليل الاستخدام</span>
      </router-link>

      <router-link 
        to="/offers"
        class="sidebar-link"
        :class="{ active: currentPath === '/offers' }"
      >
        <img class="icon-img" src="/icons/offers.png" />
        <span class="label" v-if="!collapsed">العروض</span>
      </router-link>

      <router-link 
        to="/screens"
        class="sidebar-link"
        :class="{ active: currentPath === '/screens' }"
      >
        <img class="icon-img" src="/icons/screens.png" />
        <span class="label" v-if="!collapsed">الشاشات</span>
      </router-link>

      <router-link 
       to="/settings"
       class="sidebar-link"
       :class="{ active: currentPath === '/settings' }"
      >
      <img class="icon-img" src="/icons/settings.jpg" />
      <span class="label" v-if="!collapsed">الإعدادات</span>
      </router-link>

      <router-link 
        to="/membership"
        class="sidebar-link"
        :class="{ active: currentPath === '/membership' }"
      >
        <img class="icon-img" src="/icons/membership.png" />
        <span class="label" v-if="!collapsed">العضوية</span>
      </router-link>

<!--
<router-link 
  to="/design-tasks"
  class="sidebar-link"
  :class="{ active: currentPath === '/design-tasks' }"
>
  <img class="icon-img" src="/icons/tasks.png" />
  <span class="label" v-if="!collapsed">المهام</span>
</router-link>

<router-link 
  to="/affiliate"
  class="sidebar-link"
  :class="{ active: currentPath === '/affiliate' }"
>
  <img class="icon-img" src="/icons/ref.jpg" />
  <span class="label" v-if="!collapsed">الإحالات</span>
</router-link>
-->

      <a 
        href="#"
        class="sidebar-link"
        @click.prevent="logout"
      >
        <img class="icon-img" src="/icons/logout.jpg" />
        <span class="label" v-if="!collapsed">تسجيل الخروج</span>
      </a>

    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useSidebar } from "./composables/useSidebar"

const {
  collapsed,
  currentPath,
  firstName,
  toggle,
  logout,
  loadSidebar
} = useSidebar()

loadSidebar()
</script>


<style scoped>
.sidebar {
  width: 240px;
  background: #ffffff;
  border-left: 1px solid #e5e5e5;
  padding: 10px;
  transition: width 0.3s ease;
  direction: rtl;

  height: 95vh;        /* يمنع التمدد */
  overflow-y: auto;     /* سكرول داخلي فقط */
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 700;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #444;
  transition: 0.25s ease;
}

.sidebar-link:hover {
  background: #f5f5f5;
}

.sidebar-link.active {
  background: #e8f0fe;
  color: #1a73e8;
  font-weight: 700;
  border-right: 4px solid #1a73e8;
}

.icon-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.label {
  font-size: 16px;
}

.logout-section {
  margin-top: auto;
  padding-top: 10px;
}

.logout-btn {
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  background: #fa2124;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
}

.logout-btn:hover {
  background: #b6020b;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px; /* بدل 240px */
  }

  .sidebar.collapsed {
    width: 70px; /* بدل 80px */
  }
}

</style>

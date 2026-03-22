import type { RouteRecordRaw } from "vue-router"

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: "/settings",
    component: () => import("../layout/SettingsLayout.vue"), // ← هنا الهيكل + السايدبار
    children: [
      {
        path: "",
        name: "settings",
        component: () => import("../pages/SettingsPage.vue") // ← هنا المحتوى
      }
    ]
  }
]

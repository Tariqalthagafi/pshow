import type { RouteRecordRaw } from "vue-router"

export const screensRoutes: RouteRecordRaw[] = [
  {
    path: "/screens",
    component: () => import("../layout/ScreensLayout.vue"), // ← هنا الهيكل + السايدبار
    children: [
      {
        path: "",
        name: "screens",
        component: () => import("../pages/ScreensPage.vue") // ← هنا المحتوى
      }
    ]
  }
]

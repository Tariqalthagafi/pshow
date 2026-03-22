import type { RouteRecordRaw } from "vue-router"

export const designTasksRoutes: RouteRecordRaw[] = [
  {
    path: "/design-tasks",
    component: () => import("../layout/DesignTasksLayout.vue"), // ← هنا الهيكل + السايدبار
    children: [
      {
        path: "",
        name: "design-tasks",
        component: () => import("../pages/TasksPage.vue") // ← هنا المحتوى
      }
    ]
  }
]

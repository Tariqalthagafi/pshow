import type { RouteRecordRaw } from "vue-router"

export const membershipRoutes: RouteRecordRaw[] = [
  {
    path: "/membership",
    component: () => import("../layout/MembershipLayout.vue"), // ← هنا الهيكل + السايدبار
    children: [
      {
        path: "",
        name: "membership",
        component: () => import("../pages/MembershipPage.vue") // ← هنا المحتوى
      }
    ]
  }
]

import type { RouteRecordRaw } from "vue-router"

export const offersRoutes: RouteRecordRaw[] = [
  {
    path: "/offers",
    component: () => import("../layout/OffersLayout.vue"), // ← هنا السايدبار
    children: [
      {
        path: "",
        name: "offers",
        component: () => import("../pages/OffersPage.vue") // ← هنا المحتوى
      }
    ]
  }
]

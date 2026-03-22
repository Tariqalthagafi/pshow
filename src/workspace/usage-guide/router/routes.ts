import type { RouteRecordRaw } from "vue-router"

export const usageGuideRoutes: RouteRecordRaw[] = [
  {
    path: "/usage-guide",
    component: () => import("../layout/UsageGuideLayout.vue"),
    children: [
      {
        path: "",
        name: "usage-guide",
        component: () => import("../pages/UsageGuidePage.vue")
      }
    ]
  }
]

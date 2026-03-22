import type { RouteRecordRaw } from "vue-router"

export const affiliateRoutes: RouteRecordRaw[] = [
  {
    path: "/affiliate",
    component: () => import("../layout/AffiliateLayout.vue"),
    children: [
      {
        path: "",
        name: "affiliate",
        component: () => import("../pages/AffiliatePage.vue")
      }
    ]
  }
]

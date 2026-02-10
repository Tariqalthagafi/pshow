import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from "@/supabase"

import LandingPage from '@/pages/landing.vue'
import LoginPage from '@/pages/login.vue'

import MainLayout from '@/layouts/MainLayout.vue'
import TasksPage from '@/pages/tasks.vue'
import ScreensPage from '@/pages/screens.vue'
import MembershipPage from '@/pages/membership.vue'
import ContentPage from '@/pages/content.vue'
import AffiliatePage from '@/pages/affiliate.vue'

import DisplayPage from '@/pages/display.vue'   // ← مهم جداً
import ActivatePage from '@/pages/activate.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },

    // صفحة العرض (بدون حماية)
    { path: '/activate', component: ActivatePage },
    { path: '/display', component: DisplayPage },

    {
      path: '/app',
      component: MainLayout,
      children: [
        { path: 'tasks', component: TasksPage },
        { path: 'screens', component: ScreensPage },
        { path: 'membership', component: MembershipPage },
        { path: 'content', component: ContentPage },
        { path: 'affiliate', component: AffiliatePage },
      ]
    }
  ]
})


// ⭐ متغير لحفظ حالة الجلسة بعد تسجيل الدخول
let authReady = false

// ⭐ Supabase يعطي الجلسة فورًا بعد العودة من Google
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    authReady = true
  }
})

// ⭐ حماية مسارات /app
router.beforeEach(async (to, from, next) => {
  if (!to.path.startsWith('/app')) {
    return next()
  }

  // لو Supabase لم يحمّل الجلسة بعد → انتظر
  if (!authReady) {
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session) {
      authReady = true
    }
  }

  // الآن نتحقق
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user

  if (!user) {
    return next('/login')
  }

  next()
})

export default router

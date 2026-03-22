<template>

  <!-- الهيدر -->
  <HeaderBar />

<section class="min-h-screen bg-white flex flex-col items-center py-12 px-6">

    <!-- الوصف -->
    <div class="w-full max-w-5xl mb-16">
      <ProductDescription />
    </div>

    <!-- الباقات -->
    <div class="w-full max-w-4xl mb-12">
      <PricingPlans />
    </div>

    <!-- الفوتر -->
    <div class="w-full max-w-4xl">
      <FooterCopyright />
    </div>

  </section>

</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { supabase } from "@/supabase"

import HeaderBar from "@/mainpage/components/Header/HeaderBar.vue"
import ProductDescription from "@/mainpage/components/description/description.vue"
import PricingPlans from "@/mainpage/components/Pricing/plans.vue"
import FooterCopyright from "@/mainpage/components/footer/copyright.vue"

const router = useRouter()

// 1) عند تحميل الصفحة: إذا المستخدم مسجّل دخول → تحويله مباشرة
onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  if (sessionData.session?.user) {
    router.push("/offers")
  }
})

// 2) عند تسجيل الدخول عبر Google OAuth → Supabase يرسل session هنا
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    router.push("/offers")
  }
})
</script>

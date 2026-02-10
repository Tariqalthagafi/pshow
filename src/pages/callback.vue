<template>
  <div style="padding: 40px; font-size: 20px;">
    جاري تسجيل الدخول...
  </div>
</template>

<script setup>
import { supabase } from "@/supabase"
import { useRouter } from "vue-router"
import { onMounted } from "vue"

const router = useRouter()

onMounted(async () => {
  // 1) فحص الجلسة مباشرة
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    router.push("/app/screens")
    return
  }

  // 2) التقاط حدث تسجيل الدخول
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      router.push("/app/screens")
    }
  })

  // 3) fallback — Supabase أحيانًا يتأخر
  setTimeout(async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      router.push("/app/screens")
    }
  }, 500)
})
</script>

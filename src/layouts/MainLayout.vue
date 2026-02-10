<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from "@/supabase"
import Sidebar from '@/app/components/sidebar/sidebar.vue'

const profile = ref(null)
const loading = ref(true)

onMounted(async () => {
  // جلب الجلسة
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user

  // لو ما فيه مستخدم → فقط اعرض الواجهة بدون بروفايل
  if (!user) {
    loading.value = false
    return
  }

  // جلب البروفايل
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  profile.value = data

  // تحديث آخر نشاط
  await supabase
    .from('profiles')
    .update({ last_active_at: new Date().toISOString() })
    .eq('id', user.id)

  loading.value = false
})
</script>

<template>
  <div v-if="loading" class="loading-screen">
    جاري التحميل...
  </div>

  <div v-else class="layout">
    <Sidebar :profile="profile" />
    <div class="content">
      <router-view :profile="profile" />
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  flex-direction: row-reverse; /* يجعل السايدبار في اليمين */
  height: 100vh;
}

.content {
  flex: 1; /* يجعل المحتوى يأخذ كل المساحة المتبقية */
  padding: 20px;
  overflow-y: auto;
}
</style>

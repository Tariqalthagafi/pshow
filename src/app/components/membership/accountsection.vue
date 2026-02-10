<template>
  <div class="account-card">
    <h2 class="title">معلومات الحساب</h2>

    <div class="grid">
      <div class="item">
        <p class="label">البريد الإلكتروني</p>
        <p class="value">{{ email }}</p>
      </div>
      <div class="item">
  <p class="label">الاسم الكامل</p>
  <input 
    v-model="fullName"
    class="input"
    type="text"
    placeholder="اكتب اسمك"
    @blur="saveFullName"
  />
</div>

      <div class="item">
        <p class="label">تاريخ إنشاء الحساب</p>
        <p class="value">{{ createdAt }}</p>
      </div>

      <div class="item">
        <p class="label">آخر تسجيل دخول</p>
        <p class="value">{{ lastSignIn }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"

const email = ref("")
const createdAt = ref("")
const lastSignIn = ref("")
const fullName = ref("")
const userId = ref("")

onMounted(async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user
  if (!user) return

  userId.value = user.id
  email.value = user.email || ""

  createdAt.value = user.created_at
    ? new Date(user.created_at).toLocaleDateString("ar-SA")
    : "—"

  lastSignIn.value = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString("ar-SA")
    : "—"

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId.value)
    .single()

  fullName.value = profile?.full_name || ""
})

const saveFullName = async () => {
  if (!userId.value) return

  await supabase
    .from("profiles")
    .update({ full_name: fullName.value })
    .eq("id", userId.value)
}

</script>

<style scoped>
.account-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 22px;
  direction: rtl;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);

  max-width: 600px;   /* يمنع التمدد تحت السايدبار */
  width: 100%;
  margin-left: auto;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #111;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 24px;
}

.item {
  display: flex;
  flex-direction: column;
}

.label {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 2px;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.input {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
}

</style>

<template>
  <div v-if="allowed">
    <slot />
  </div>

  <div v-else class="denied">
   لا توجد مهام مسندة لك حالياً.
عند إسناد عرض جديد أو إرسال دعوة من أحد العملاء، ستظهر مهامك هنا مباشرة.

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"

const allowed = ref(false)

onMounted(async () => {
  const { data: session } = await supabase.auth.getSession()
  const user = session?.session?.user

  if (!user) {
    allowed.value = false
    return
  }

  const { data: offers } = await supabase
    .from("offers")
    .select("id")
    .eq("designer_id", user.id)

  allowed.value = offers && offers.length > 0
})
</script>

<style scoped>
.denied {
  padding: 20px;
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 10px;
  text-align: center;
  margin: 20px;
  font-size: 15px;
}
</style>

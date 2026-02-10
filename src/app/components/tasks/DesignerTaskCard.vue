<template>
  <div class="task-card">

    <!-- معلومات العرض -->
    <div class="header">
      <h3>العرض رقم {{ offer?.offer_number }}</h3>
      <p class="owner">{{ ownerEmail }}</p>
    </div>
<button class="finish-btn" @click="finishTask">
  إنهاء المهمة
</button>

    <!-- التبويبات -->
    <div class="tabs">
      <button 
        :class="{ active: activeTab === 'attachments' }"
        @click="activeTab = 'attachments'"
      >
        المرفقات
      </button>

      <button 
        :class="{ active: activeTab === 'effects' }"
        @click="activeTab = 'effects'"
      >
        التأثير
      </button>

      <button 
        :class="{ active: activeTab === 'screen' }"
        @click="activeTab = 'screen'"
      >
        الشاشة
      </button>
    </div>

    <!-- المحتوى -->
    <div class="content">
      <DesignerTaskAttachments 
        v-if="activeTab === 'attachments'" 
        :offerId="offerId" 
      />

      <DesignerTaskEffects 
        v-if="activeTab === 'effects'" 
        :offerId="offerId" 
      />

      <DesignerTaskScreenInfo 
        v-if="activeTab === 'screen'" 
        :offerId="offerId" 
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"

import DesignerTaskAttachments from "./DesignerTaskAttachments.vue"
import DesignerTaskEffects from "./DesignerTaskEffects.vue"
import DesignerTaskScreenInfo from "./DesignerTaskScreenInfo.vue"
import { useRouter } from "vue-router"

const router = useRouter()

async function finishTask() {
  const { error } = await supabase
    .from("offers")
    .update({
      designer_id: null,
      designer_email: null
      // أو status: "done" إذا عندك عمود للحالة
    })
    .eq("id", props.offerId)

  if (!error) {
    router.push("/designer")
  }
}

const props = defineProps({
  offerId: {
    type: String,
    required: true
  }
})

const activeTab = ref("attachments")
const offer = ref(null)
const ownerEmail = ref("AA@A.com")

onMounted(async () => {
  const { data } = await supabase
    .from("offers")
    .select("offer_number, user_id")
    .eq("id", props.offerId)
    .single()

  offer.value = data

  if (data?.user_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", data.user_id)
      .single()

    ownerEmail.value = profile?.email || ""
  }
})
</script>

<style scoped>
.task-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  max-width: 420px;
  margin: 0 auto;
  direction: rtl;
}

.header {
  margin-bottom: 16px;
}

.header h3 {
  font-size: 18px;
  font-weight: 700;
}

.owner {
  font-size: 14px;
  color: #6b7280;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tabs button {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.tabs button.active {
  background: #2563eb;
  color: white;
}

.content {
  background: #f8fafc;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.finish-btn {
  width: 100%;
  background: #10b981;
  color: white;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 12px;
}

.finish-btn:hover {
  background: #059669;
}

</style>

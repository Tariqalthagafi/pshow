<template>
  <div class="screen-box">

    <h3 class="title">مقاس الشاشة</h3>

    <div v-if="loading" class="loading">
      جاري جلب المقاس...
    </div>

    <p v-else class="resolution">
      {{ resolution || "—" }}
    </p>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"

const props = defineProps({
  offerId: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const resolution = ref(null)

onMounted(async () => {
  loading.value = true

  const { data: screen } = await supabase
    .from("screens")
    .select("screen_id")
    .eq("offer_id", props.offerId)
    .single()

  if (!screen) {
    loading.value = false
    return
  }

  const { data: activation } = await supabase
    .from("screen_activation")
    .select("resolution")
    .eq("screen_id", screen.screen_id)
    .single()

  if (activation) {
    resolution.value = activation.resolution
  }

  loading.value = false
})
</script>

<style scoped>
.screen-box {
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 20px;
  direction: rtl;
}

.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.loading {
  font-size: 14px;
  color: #6b7280;
}

.resolution {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
}
</style>

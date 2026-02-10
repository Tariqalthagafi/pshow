<template>
  <div class="effects-box">

    <h3 class="title">التأثير</h3>

    <div class="effects-list">
      <button
        v-for="item in effects"
        :key="item.value"
        :class="{ active: effect === item.value }"
        @click="updateEffect(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="seconds-box">
      <label>مدة الانتقال (ثواني)</label>
      <input 
        type="number" 
        min="1"
        v-model.number="seconds"
        @change="updateSeconds"
        placeholder="مثال: 3"
      />
    </div>

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

const effect = ref("slide-left")
const seconds = ref(3)

const effects = [
  { label: "انزلاق لليسار", value: "slide-left" },
  { label: "انزلاق لليمين", value: "slide-right" },
  { label: "تلاشي", value: "fade" },
  { label: "تكبير", value: "zoom-in" },
  { label: "تصغير", value: "zoom-out" }
]

onMounted(async () => {
  const { data } = await supabase
    .from("offers")
    .select("effect, transition_seconds")
    .eq("id", props.offerId)
    .single()

  if (data) {
    effect.value = data.effect || "slide-left"
    seconds.value = data.transition_seconds || 3
  }
})

async function updateEffect(newEffect) {
  effect.value = newEffect

  await supabase
    .from("offers")
    .update({ effect: newEffect })
    .eq("id", props.offerId)
}

async function updateSeconds() {
  await supabase
    .from("offers")
    .update({ transition_seconds: seconds.value })
    .eq("id", props.offerId)
}
</script>

<style scoped>
.effects-box {
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

.effects-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.effects-list button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.effects-list button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.seconds-box {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.seconds-box input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}
</style>

<template>
  <div class="expand-box">

    <!-- إذا لم يتم اختيار عرض -->
    <div v-if="!screen.offer_id" class="assign-wrapper">

      <!-- زر فتح القائمة -->
      <button class="assign-btn" @click="toggleDropdown">
        اختر عرضًا
      </button>

      <!-- القائمة المنسدلة -->
      <div v-if="dropdownOpen" class="dropdown">
        <p 
          v-for="model in models" 
          :key="model.id" 
          class="dropdown-item"
          @click="selectModel(model)"
        >
          عرض رقم {{ model.offer_number }}
        </p>
      </div>

    </div>

    <!-- إذا تم اختيار عرض -->
    <div v-else class="selected-model">
      <span>عرض رقم {{ selectedOfferNumber }}</span>
      <span class="remove" @click="removeModel">✕</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { supabase } from "@/supabase"

const props = defineProps<{
  screen: {
    id: string
    offer_id: string | null
  }
  models: {
    id: string
    offer_number: number
  }[]
}>()

const emit = defineEmits(["assign", "remove"])

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectedOfferNumber = computed(() => {
  const found = props.models.find(m => m.id === props.screen.offer_id)
  return found ? found.offer_number : props.screen.offer_id
})

const selectModel = async (model: any) => {
  await supabase
    .from("screens")
    .update({ offer_id: model.id })
    .eq("id", props.screen.id)

  dropdownOpen.value = false
  emit("assign", { screen: props.screen, model })
}

const removeModel = async () => {
  await supabase
    .from("screens")
    .update({ offer_id: null })
    .eq("id", props.screen.id)

  emit("remove", props.screen)
}
</script>

<style scoped>
.expand-box {
  background: #ffffff;
  border: 1px solid #d1d5db;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  direction: rtl;
}

/* زر اختيار العرض */
.assign-btn {
  width: 100%;
  background: #ffffff;
  color: #111;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s ease;
}

.assign-btn:hover {
  background: #f3f4f6;
}

/* القائمة المنسدلة */
.dropdown {
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-top: 6px;
  overflow: hidden;
}

.dropdown-item {
  padding: 10px;
  font-size: 13px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  color: #111;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

/* العرض المختار */
.selected-model {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #111;
}

.selected-model .remove {
  cursor: pointer;
  color: #ef4444;
  font-weight: bold;
  font-size: 16px;
  transition: 0.2s ease;
}

.selected-model .remove:hover {
  color: #b91c1c;
}

@media (max-width: 600px) {

  .expand-box {
    padding: 14px;
    border-radius: 10px;
    gap: 12px;
  }

  /* زر اختيار العرض */
  .assign-btn {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 6px;
  }

  /* القائمة المنسدلة */
  .dropdown {
    margin-top: 4px;
    border-radius: 6px;
  }

  .dropdown-item {
    padding: 8px;
    font-size: 12px;
  }

  /* العرض المختار */
  .selected-model {
    padding: 6px 8px;
    font-size: 12px;
    border-radius: 6px;
  }

  .selected-model .remove {
    font-size: 14px;
  }

  /* الرابط */
  .link-box {
    padding: 8px 10px;
  }

  .link-text {
    font-size: 12px;
    word-break: break-all;
  }
}

</style>

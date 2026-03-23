<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { User } from "@supabase/supabase-js"

import ScreenCard from "@/workspace/screens/components/screencard.vue"
import CreateScreensButton from "@/workspace/screens/components/CreateScreensButton.vue"

import { useScreens } from "@/workspace/screens/composables/useScreens"
import { createSingleScreen, getUser } from "@/workspace/screens/services/screens.service"

const {
  screens,
  offers,
  loading,
  openScreenId,
  isLocked,
  toggleScreen,
  assignOffer,
  loadAll
} = useScreens()

// 👈 هنا نحدد النوع الصحيح
const user = ref<User | null>(null)

const handleCreateScreen = async () => {
  if (!user.value) return

  const { data, error } = await createSingleScreen(user.value.id)

  if (error) {
    alert(error)
    return
  }

  alert("تم إنشاء الشاشة بنجاح")
  await loadAll()
}

onMounted(async () => {
  user.value = await getUser()
  await loadAll()
})
</script>

<template>
  <div class="actions">
    <CreateScreensButton @create="handleCreateScreen" />
  </div>

  <div class="screen-list">
    <div v-if="loading">جاري تحميل الشاشات...</div>

    <ScreenCard
      v-for="screen in screens"
      :key="screen.id"
      :screen="screen"
      :locked="isLocked(screen)"
      :openScreenId="openScreenId"
      :models="offers"
      @toggle="toggleScreen"
      @open="openScreenId = $event"
      @assign="assignOffer"
    />
  </div>
</template>

<style>
.actions {
  padding: 20px;
  text-align: right;
}

.screen-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  padding: 20px;
  direction: rtl;
  align-items: start;
}

@media (max-width: 600px) {
  .screen-list {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 12px;
  }
}
</style>

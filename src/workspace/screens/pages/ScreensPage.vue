<script setup lang="ts">
import { onMounted } from "vue"
import ScreenCard from "@/workspace/screens/components/screencard.vue"
import { useScreens } from "@/workspace/screens/composables/useScreens"

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

onMounted(loadAll)
</script>

<template>
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

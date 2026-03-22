<template>
  <div class="effects-box">
    <ContentHeaderRow
      :effect="effect"
      :duration="duration"
      @update:effect="updateEffect"
      @update:duration="updateDuration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  getOfferDetails,
  updateOfferEffect,
  updateOfferDuration
} from "@/workspace/offers/services/offers.service"

import ContentHeaderRow from "@/workspace/offers/components/imgcontent/Effects/contentheaderrow.vue"

const props = defineProps<{
  offerId: string
  userId: string
}>()

/* الحالة */
const effect = ref<string>("slide-left")
const duration = ref<number>(3)

/* تحميل البيانات */
onMounted(async () => {
  const { data: offer } = await getOfferDetails(props.offerId, props.userId)

  if (offer) {
    effect.value = offer.effect || "slide-left"
    duration.value = offer.duration ?? 3
  }
})

/* تحديث التأثير */
const updateEffect = async (newEffect: string) => {
  effect.value = newEffect
  await updateOfferEffect(props.offerId, props.userId, newEffect)
}

/* تحديث المدة */
const updateDuration = async (newDuration: number) => {
  duration.value = newDuration
  await updateOfferDuration(props.offerId, props.userId, newDuration)
}
</script>

<style scoped>
.effects-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

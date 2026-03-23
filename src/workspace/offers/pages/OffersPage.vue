<template>
  <div>
    <!-- شبكة البطاقات -->
    <div class="cards-grid">
      <div v-for="card in cards" :key="card.id">

        <!-- بطاقة صور -->
        <ContentCard
          v-if="card.type === 'images'"
          :cardId="card.id"
          :openCardId="openCardId"
          :offerNumber="card.offer_number"
          @open-card="openCardId = $event"
          @delete="deleteCard"
        />

        <!-- بطاقة فيديو -->
        <VideoCard
          v-else-if="card.type === 'video'"
          :cardId="card.id"
          :offerNumber="card.offer_number"
          :openCardId="openCardId"
          @open-card="openCardId = $event"
          @delete="deleteCard"
        />

      </div>
    </div>

    <!-- زر إضافة بطاقة جديدة -->
    <div class="add-wrapper">
      <button 
        class="add-btn" 
        :class="{ locked }"
        :disabled="locked"
        @click="showTypeSelector = true"
      >
        <span class="add-text">+ إضافة بطاقة عرض جديدة</span>

        <span v-if="locked" class="premium-tag">
          العضوية بريميوم
        </span>
      </button>
    </div>

    <!-- مكوّن اختيار نوع البطاقة -->
    <OfferTypeSelector
      v-if="showTypeSelector"
      @close="showTypeSelector = false"
      @select-image="addImageCard"
      @select-video="addVideoCard"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import ContentCard from "@/workspace/offers/components/imgcontent/contentcard.vue"
import VideoCard from "@/workspace/offers/components/Videocontent/VideoCard.vue"
import OfferTypeSelector from "@/workspace/offers/components/shared/OfferTypeSelector.vue"
import { useOffers } from "../composables/useOffers"

const {
  cards,
  locked,
  openCardId,
  showTypeSelector,
  loadOffers,
  deleteCard,
  addImageCard,
  addVideoCard
} = useOffers()

onMounted(loadOffers)
</script>

<style scoped>

/* شبكة البطاقات */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  padding: 20px;
  direction: rtl;
  align-items: start;
}

/* زر الإضافة */
.add-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.add-btn {
  background: #2563eb;
  color: white;
  padding: 16px 28px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  gap: 14px;
}

.add-btn:hover {
  background: #1d4ed8;
}

.locked {
  opacity: 0.55;
  pointer-events: none;
}

.premium-tag {
  background: #facc15;
  color: #1f2937;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

@media (max-width: 600px) {

  .cards-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    padding: 12px !important;
  }

  .add-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 10px;
    gap: 10px;
  }

  .add-text {
    font-size: 14px;
  }

  .premium-tag {
    font-size: 11px;
    padding: 3px 8px;
  }
}

</style>

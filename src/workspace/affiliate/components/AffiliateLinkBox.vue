<template>
  <div class="ref-box">
    <div class="label">رابط الإحالة الخاص بك</div>

    <div class="ref-row">
      <span class="ref-link">{{ fullReferralLink }}</span>
      <button class="copy-btn" @click="copyLink" :disabled="!fullReferralLink">
        نسخ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAffiliate } from "../composables/useAffiliate"

const { fullReferralLink, copyLink } = useAffiliate()
</script>

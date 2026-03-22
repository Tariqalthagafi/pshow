<template>
  <div class="affiliate-page">
    <AffiliateLinkBox />

    <AffiliateClientsTable />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import AffiliateLinkBox from "../components/AffiliateLinkBox.vue"
import AffiliateClientsTable from "../components/AffiliateClientsTable.vue"
import { useAffiliate } from "../composables/useAffiliate"

const { loadAffiliate } = useAffiliate()

onMounted(() => {
  // لاحقًا ممكن تمرّر userId لو احتجته
  loadAffiliate()
})
</script>

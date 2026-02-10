<template>
  <DesignerProtected>
    <DesignerTaskCard :offerId="offerId" />
  </DesignerProtected>
</template>

<script setup>
import { useRoute } from "vue-router"
import DesignerProtected from "./DesignerProtected.vue"
import DesignerTaskCard from "./DesignerTaskCard.vue"

const route = useRoute()
const offerId = route.query.id
</script>

<template>

  <!-- الهيدر خارج الفلكس كول -->
  <HeaderBar  />

  <section class="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">

    <!-- الصندوق الرئيسي -->
    <div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center mb-12">
      <ProductDescription  />
    </div>

    <!-- الباقات -->
    <div class="w-full max-w-4xl mb-12">
      <PricingPlans  />
    </div>

    <!-- الفوتر -->
    <div class="w-full max-w-4xl">
      <FooterCopyright />
    </div>

  </section>

</template>


<script setup lang="ts">
import HeaderBar from "@/mainpage/HeaderBar.vue"
import ProductDescription from "@/mainpage/productdescription.vue"
import PricingPlans from "@/mainpage/pricingplans.vue"
import FooterCopyright from "@/mainpage/footercopyright.vue"
</script>

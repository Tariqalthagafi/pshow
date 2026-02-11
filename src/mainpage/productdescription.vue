<template>
  <div class="w-full max-w-5xl mx-auto">

    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      navigation
      pagination
      class="mySwiper"
    >
      <SwiperSlide><Slide1 /></SwiperSlide>
      <SwiperSlide><Slide2 /></SwiperSlide>
      <SwiperSlide><Slide3 /></SwiperSlide>
      <SwiperSlide><Slide4 /></SwiperSlide>
      <SwiperSlide><Slide5 /></SwiperSlide>
      <SwiperSlide><Slide6 /></SwiperSlide>
    </Swiper>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// استيراد CSS الخاص بالمكتبة
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Slide1 from "@/mainpage/slider/slide1.vue"
import Slide2 from "@/mainpage/slider/slide2.vue"
import Slide3 from "@/mainpage/slider/slide3.vue"
import Slide4 from "@/mainpage/slider/slide4.vue"
import Slide5 from "@/mainpage/slider/slide5.vue"
import Slide6 from "@/mainpage/slider/slide6.vue"
</script>

<style scoped>
.mySwiper {
  width: 80%;
  margin: 0 auto;
}

</style>

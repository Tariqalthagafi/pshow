<template>
  <div class="slider-container">

    <!-- الصور -->
    <img 
      v-for="(img, index) in items"
      :key="index"
      :src="img.url"
      class="slide-img"
    />

    <!-- المثلث الأبيض بحد أسود -->
    <div class="slice-corner"></div>

  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { runEffect } from "./effectsController.js"

const props = defineProps({
  items: Array,
  pause: Number,
  effect: String
})


const currentIndex = ref(0)
let timer = null

/* تحميل الصور مسبقًا */
function preloadImages(list) {
  return Promise.all(
    list.map(img => {
      return new Promise(resolve => {
        const image = new Image()
        image.src = img.url
        image.onload = resolve
      })
    })
  )
}

onMounted(async () => {
  await preloadImages(props.items)

  const totalTime = props.pause * 1000

  // تفعيل أول صورة
  const images = document.querySelectorAll(".slide-img")
  if (images[0]) images[0].classList.add("active")

  timer = setInterval(() => {
    const oldIndex = currentIndex.value
    const newIndex = (currentIndex.value + 1) % props.items.length

    const images = document.querySelectorAll(".slide-img")

    // إزالة active من كل الصور
    images.forEach(img => img.classList.remove("active"))

    // تفعيل الصورة الجديدة
    images[newIndex].classList.add("active")

        // تطبيق التأثير
    runEffect(props.effect, images, oldIndex, newIndex)

    currentIndex.value = newIndex
  }, totalTime)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style>
.slider-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  perspective: 1200px;
  transform-style: preserve-3d;
}

/* كل الصور فوق بعض */
.slide-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  opacity: 0;      /* ← مخفية افتراضياً */
  z-index: 0;
  transition: opacity 0.3s linear;
  backface-visibility: hidden; 
  transform-style: preserve-3d;
}

/* الصورة الحالية */
.slide-img.active {
  opacity: 1;
  z-index: 2;
}

.slice-corner {
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 60px solid white;   /* لون الزاوية */
  border-right: 60px solid transparent;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-bottom-left-radius: 3px;
  box-shadow: -2px -2px 4px #0008;   /* حدود سوداء خفيفة */
  opacity: 0;
  pointer-events: none;
}

</style>

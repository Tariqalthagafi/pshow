<template>
  <div class="popup-overlay" @click.self="emitClose">
    <div class="popup-box">

      <h3>اختر نوع بطاقة العرض</h3>

      <button class="popup-btn" @click="emitImage">
        عرض صور
      </button>

      <button class="popup-btn" @click="emitVideo">
        عرض فيديو
      </button>

      <button class="close-btn" @click="emitClose">
        إغلاق
      </button>

    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["select-image", "select-video", "close"])

function emitImage() {
  emit("select-image")
}

function emitVideo() {
  emit("select-video")
}

function emitClose() {
  emit("close")
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-box {
  background: white;
  padding: 25px;
  border-radius: 14px;
  width: 320px;
  text-align: center;
  direction: rtl;
}

.popup-btn {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-size: 15px;
}

.close-btn {
  margin-top: 15px;
  background: #aaa;
  color: white;
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>

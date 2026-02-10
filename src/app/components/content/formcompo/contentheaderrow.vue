<template>
  <div class="top-row">

    <div class="field small">
      <label>
        التأثير
        <div class="tooltip-wrapper">
          <span class="tooltip-icon">?</span>
          <span class="tooltip-text">التأثير يطبق فقط على الصور</span>
        </div>
      </label>

      <select
        :value="effect"
        @change="$emit('update:effect', $event.target.value)"
      >
        <option value="slide-left">منزلق من الجانب</option>
        <option value="slide-top">منزلق من الأعلى</option>
        <option value="fade">تلاشي</option>
        <option value="carousel">سلايدر دائري</option>
      </select>
    </div>
<div class="field small">
  <label>
    مدة الانتقال 
    <div class="tooltip-wrapper">
      <span class="tooltip-icon">?</span>
      <span class="tooltip-text">مدة تبديل الصور في السلايدر بالثواني</span>
    </div>
  </label>

  <input
    type="number"
    min="1"
    :value="duration"
    @input="$emit('update:duration', Number($event.target.value))"
  />
</div>

  </div>
</template>

<script setup>
defineProps({
  effect: {
    type: String,
    default: "slide-left"
  },
  duration: {
    type: Number,
    default: 3 // 3 ثواني افتراضيًا
  }
})

defineEmits(["update:effect", "update:duration"])

</script>

<style scoped>
.top-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.field.small {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (max-width: 640px) {
  .top-row {
    grid-template-columns: 1fr;
  }
}

/* القائمة المنسدلة */
.field.small select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 13px;
  width: fit-content;
  min-width: 120px;
  height: 34px;
  cursor: pointer;
  transition: 0.2s ease;
}

/* Tooltip */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
  margin-top: 6px;
}

.tooltip-icon {
  background: #e5e7eb;
  color: #374151;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.tooltip-icon:hover {
  background: #d1d5db;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  right: 26px;
  top: 0;
  background: #111827;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.field.small input {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 13px;
  width: 80px;
  height: 20px;
  text-align: center;
}

</style>

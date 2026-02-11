<template>
  <div class="content-item">

    <button class="remove-btn" @click="$emit('remove')">✕</button>

    <div class="preview">
      <img v-if="isImage" :src="fileURL" />
      <video v-else muted>
        <source :src="fileURL" />
      </video>
    </div>

    <div class="info">

      <p class="name">{{ displayName }}</p>

      <div class="info-row">
        <span class="pill">{{ meta.format || extractFormat }}</span>
        <span class="pill">{{ formatSize(meta.bytes || file.size) }}</span>

        <span v-if="meta.width" class="pill">
          {{ meta.width }}×{{ meta.height }}
        </span>

        <span v-if="!isImage && meta.duration" class="pill">
          {{ meta.duration.toFixed(1) }}s
        </span>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const props = defineProps({
  file: Object
})

const meta = ref({
  format: null,
  bytes: null,
  width: null,
  height: null,
  duration: null
})

const fileURL = computed(() => {
  if (props.file.url) return props.file.url
  if (!(props.file instanceof File)) return ""
  return URL.createObjectURL(props.file)
})

const isImage = computed(() => props.file.type?.startsWith("image"))

const extractFormat = computed(() => {
  return meta.value.format ||
    props.file.name?.split(".").pop().toLowerCase() ||
    "?"
})

const displayName = computed(() => {
  return (
    props.file.original_filename ||
    props.file.file_name ||
    props.file.name ||
    "ملف"
  )
})

const formatSize = (bytes) => {
  if (!bytes) return "-"
  if (bytes < 1024) return bytes + "B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "KB"
  return (bytes / (1024 * 1024)).toFixed(1) + "MB"
}

onMounted(() => {
  meta.value = {
    format: props.file.format || null,
    bytes: props.file.bytes || null,
    width: props.file.width || null,
    height: props.file.height || null,
    duration: props.file.duration || null
  }
})

</script>

<style>
.content-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  width: 100%;
  box-sizing: border-box;
}

.preview img,
.preview video {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: none;
  background: none;
  box-shadow: none;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  direction: rtl;
  min-width: 0;
}

.name {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  background: #f3f4f6;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.remove-btn {
  position: absolute;
  top: 4px;
  left: 4px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {

  .content-item {
    padding: 8px 10px;
    gap: 8px;
  }

  .preview img,
  .preview video {
    width: 50px;
    height: 50px;
  }

  .name {
    font-size: 11px;
    white-space: normal; /* مهم للجوال */
  }

  .pill {
    font-size: 10px;
    padding: 2px 6px;
  }

  .remove-btn {
    width: 22px;
    height: 22px;
    font-size: 12px;
    top: 3px;
    left: 3px;
  }
}

</style>

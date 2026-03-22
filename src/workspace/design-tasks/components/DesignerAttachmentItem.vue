<template>
  <div class="content-item">

    <button class="remove-btn" @click="$emit('remove')">✕</button>

    <div class="preview">
      <img v-if="isImage" :src="file.url" />
      <video v-else muted>
        <source :src="file.url" />
      </video>
    </div>

    <div class="info">

      <p class="name">{{ file.original_filename }}</p>

      <div class="info-row">
        <span class="pill">{{ file.format }}</span>
        <span class="pill">{{ formatSize(file.bytes) }}</span>

        <span v-if="file.width" class="pill">
          {{ file.width }}×{{ file.height }}
        </span>

        <span v-if="!isImage && file.duration" class="pill">
          {{ file.duration.toFixed(1) }}s
        </span>
      </div>

    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  file: Object
})

const isImage = computed(() => props.file.type?.startsWith("image"))

function formatSize(bytes) {
  if (!bytes) return "-"
  if (bytes < 1024) return bytes + "B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "KB"
  return (bytes / (1024 * 1024)).toFixed(1) + "MB"
}
</script>

<style scoped>
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
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  direction: rtl;
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
}
</style>

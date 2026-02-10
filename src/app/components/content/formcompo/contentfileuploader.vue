<script setup>
import { ref } from "vue"
import { supabase } from "@/supabase"
import ContentItem from "./contentitem.vue"

const props = defineProps({
  files: Array,
  userId: String,
  offerId: String
})

const emit = defineEmits(["add", "remove"])

const fileInput = ref(null)

const message = ref("")
const messageType = ref("")

const showMessage = (text, type = "error") => {
  message.value = text
  messageType.value = type
  setTimeout(() => (message.value = ""), 3000)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFilesSelected = async (e) => {
  if (!props.userId) {
    showMessage("الرجاء الانتظار حتى يتم تحميل بيانات المستخدم")
    return
  }

  const selected = Array.from(e.target.files)
  const newType = selected[0].type.startsWith("video") ? "video" : "image"

  if (props.files.length > 0) {
    const existingType = props.files[0].type.startsWith("video") ? "video" : "image"
    if (existingType !== newType) {
      showMessage("لا يمكنك رفع صور وفيديو معًا. احذف الملفات الحالية أولاً.")
      return
    }
  }

  if (newType === "video") {
    if (props.files.length > 0 || selected.length > 1) {
      showMessage("يمكنك رفع فيديو واحد فقط.")
      return
    }
  }

  if (newType === "image") {
    if (props.files.length + selected.length > 10) {
      showMessage("يمكنك رفع 10 صور كحد أقصى.")
      return
    }
  }

  const uploaded = []

  for (const file of selected) {
    const isVideo = file.type.startsWith("video")

    const endpoint = isVideo ? "video/upload" : "image/upload"
    const preset = isVideo ? "proshow_videos" : "proshow_images"

    const folder = isVideo
      ? `clients/${props.userId}/offers/${props.offerId}/video`
      : `clients/${props.userId}/offers/${props.offerId}/images`

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", preset)
    formData.append("folder", folder)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dfslg0ne9/${endpoint}`,
      {
        method: "POST",
        body: formData
      }
    )

    const data = await res.json()

    if (!data.secure_url) {
      showMessage("حدث خطأ أثناء رفع الملف. حاول مرة أخرى.")
      continue
    }

    const fileObj = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: data.secure_url,
      public_id: data.public_id,
      original_filename: data.original_filename,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      duration: data.duration
    }

    uploaded.push(fileObj)

    await supabase.from("offer_items").insert({
      offer_id: props.offerId,
      user_id: props.userId,
      public_id: data.public_id,
      secure_url: data.secure_url,
      type: file.type,
      file_name: data.original_filename,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      duration: data.duration
    })
  }

  emit("add", uploaded)
}


</script>

<template>
  <div class="file-uploader">

    <div v-if="message" :class="['msg-box', messageType]">
      {{ message }}
    </div>

    <div class="top-row">
      <div class="label-row">
        <label>رفع الملفات</label>

        <div class="tooltip-wrapper">
          <span class="tooltip-icon">?</span>
          <span class="tooltip-text">يمكنك رفع حتى 10 صور أو فيديو واحد فقط</span>
        </div>
      </div>

      <button class="upload-btn" @click="triggerFileInput">
        إرفاق الملفات
      </button>
    </div>

    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden-input"
      @change="onFilesSelected"
    />

    <div class="files-list">
      <ContentItem
        v-for="(file, index) in files"
        :key="index"
        :file="file"
        @remove="$emit('remove', index)"
      />
    </div>

  </div>
</template>

<style scoped>
.msg-box {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 12px;
  animation: fadeIn 0.3s ease;
}

.msg-box.error {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.msg-box.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.upload-btn {
  background: #2563eb;
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.upload-btn:hover {
  background: #1e4fc7;
}

.hidden-input {
  display: none;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
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
  right: 0;
  top: 26px;
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

@media (max-width: 480px) {
  .upload-btn {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>

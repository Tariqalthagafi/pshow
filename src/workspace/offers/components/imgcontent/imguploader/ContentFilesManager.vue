<template>
  <div class="files-manager" v-if="userId">
    <!-- رفع الملفات -->
    <ContentFileUploader
      :files="files"
      :userId="userId"
      :offerId="offerId"
      @add="addFiles"
      @remove="removeFile"
    />

    <!-- عرض الملفات -->
    <div class="files-list">
      <ContentItem
        v-for="(file, index) in files"
        :key="file.public_id || index"
        :file="file"
        @remove="removeFile(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { supabase } from "@/supabase"
import ContentFileUploader from "./contentfileuploader.vue"
import ContentItem from "./contentitem.vue"

const props = defineProps({
  offerId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false   // ← لم يعد required
  }
})

const files = ref([])

/* جلب الملفات من Supabase */
const loadFiles = async () => {
  if (!props.userId) return        // ← أهم سطر
  if (files.value.length > 0) return

  const { data } = await supabase
    .from("offer_items")
    .select("*")
    .eq("offer_id", props.offerId)
    .eq("user_id", props.userId)

  if (data) {
    files.value = data.map(item => ({
      url: item.secure_url,
      public_id: item.public_id,
      type: item.type,
      original_filename: item.file_name,
      format: item.format,
      bytes: item.bytes,
      width: item.width,
      height: item.height,
      duration: item.duration
    }))
  }
}

onMounted(loadFiles)

/* إعادة التحميل إذا وصل userId متأخر */
watch(
  () => props.userId,
  () => loadFiles()
)

/* إضافة ملفات جديدة */
const addFiles = (uploaded) => {
  files.value.push(...uploaded)
}

/* حذف ملف */
const removeFile = async (index) => {
  const file = files.value[index]

  await supabase
    .from("offer_items")
    .delete()
    .eq("public_id", file.public_id)
    .eq("offer_id", props.offerId)

  files.value.splice(index, 1)
}
</script>

<style scoped>
.files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}
</style>

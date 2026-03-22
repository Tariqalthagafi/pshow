<template>
  <div class="attachments-box">

    <h3 class="title">المرفقات</h3>

    <div class="upload-area">
      <input type="file" multiple @change="uploadFiles" />
    </div>

    <div v-if="files.length === 0" class="empty">
      لا توجد مرفقات حالياً
    </div>

    <div v-else class="files-list">
      <DesignerAttachmentItem
        v-for="(file, index) in files"
        :key="file.public_id"
        :file="file"
        @remove="removeFile(index)"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { supabase } from "@/supabase"
import DesignerAttachmentItem from "./DesignerAttachmentItem.vue"

const props = defineProps({
  offerId: {
    type: String,
    required: true
  }
})

const files = ref([])

onMounted(async () => {
  const { data } = await supabase
    .from("offer_items")
    .select("*")
    .eq("offer_id", props.offerId)

  if (data) {
    files.value = data.map(item => ({
      url: item.secure_url,
      public_id: item.public_id,
      original_filename: item.file_name,
      type: item.type,
      format: item.format,
      bytes: item.bytes,
      width: item.width,
      height: item.height,
      duration: item.duration
    }))
  }
})

async function uploadFiles(event) {
  const selected = Array.from(event.target.files)

  for (const file of selected) {
    const fileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from("offers")
      .upload(fileName, file)

    if (uploadError) continue

    const publicUrl = supabase.storage
      .from("offers")
      .getPublicUrl(fileName).data.publicUrl

    const fileRecord = {
      offer_id: props.offerId,
      file_name: file.name,
      public_id: fileName,
      secure_url: publicUrl,
      type: file.type,
      format: file.type.split("/")[1],
      bytes: file.size,
      width: null,
      height: null,
      duration: null
    }

    const { error: insertError } = await supabase
      .from("offer_items")
      .insert(fileRecord)

    if (!insertError) {
      files.value.push(fileRecord)
    }
  }
}

async function removeFile(index) {
  const file = files.value[index]

  const { error } = await supabase
    .from("offer_items")
    .delete()
    .eq("public_id", file.public_id)
    .eq("offer_id", props.offerId)

  if (!error) {
    files.value.splice(index, 1)
  }
}
</script>

<style scoped>
.attachments-box {
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 20px;
  direction: rtl;
}

.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.upload-area input {
  padding: 8px;
}

.empty {
  color: #6b7280;
  font-size: 14px;
  padding: 10px 0;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

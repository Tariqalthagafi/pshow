<template>
  <div class="models-list" v-if="models.length > 0">

    <div 
      class="model-box"
      v-for="(model, index) in models"
      :key="model.id"
    >
      <h3>عرض رقم {{ model.id }}</h3>

      <p>عدد الملفات: {{ model.files.length }}</p>
      <p>نوع العرض: {{ model.type === 'images' ? 'صور' : 'فيديو' }}</p>
      <p>التأثير: {{ model.effect }}</p>

      <p v-if="model.designer" class="designer-label">
        المصمم: {{ model.designer.email }}
        <span v-if="model.designer.status === 'pending'" class="pending">
          (بانتظار القبول)
        </span>
      </p>

      <div class="actions">
        <button @click="$emit('edit', index)">تعديل</button>
        <button class="delete" @click="$emit('delete', index)">حذف</button>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  models: {
    type: Array,
    required: true
  }
})

defineEmits(["edit", "delete"])
</script>

<style scoped>
.models-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.model-box {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  transition: 0.2s ease;
}

.model-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.model-box h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.model-box p {
  margin: 4px 0;
  font-size: 14px;
  color: #374151;
}

.designer-label {
  margin-top: 8px;
  font-size: 14px;
  color: #1f2937;
}

.pending {
  color: #d97706;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.delete {
  background: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s ease;
}

.delete:hover {
  background: #fecaca;
}
</style>

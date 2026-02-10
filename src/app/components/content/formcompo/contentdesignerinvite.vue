<template>
  <div class="designer-box">

    <!-- العنوان + Tooltip -->
    <div class="label-row">
      <label>دعوة مصمم</label>

      <div class="tooltip-wrapper">
        <span class="tooltip-icon">?</span>
        <span class="tooltip-text">يمكنك دعوة مصمم لإضافة أو تعديل المحتوى</span>
      </div>
    </div>

    <!-- حقل الإيميل + زر الدعوة/الإلغاء -->
    <div class="designer-input">
      <input 
        type="email" 
        :value="email"
        @input="$emit('update:email', $event.target.value)"
        placeholder="بريد المصمم"
        :disabled="disabledMode || designerId"
      />

      <button 
        class="invite-btn" 
        @click="$emit(designerId ? 'cancel' : 'invite', email)"
        :disabled="disabledMode"
      >
        {{ designerId ? 'إلغاء الدعوة' : 'دعوة' }}
      </button>

      <!-- تاق العضوية -->
      <span v-if="disabledMode" class="premium-tag">العضوية بريميوم</span>
    </div>

    <!-- حالة الدعوة -->
    <p v-if="designerId" class="designer-status">
      تم دعوة المصمم
    </p>

  </div>
</template>

<script setup>
defineProps({
  email: String,
  disabledMode: Boolean,
  designerId: String // ← الأساس الجديد للتحكم في الزر
})

defineEmits(["update:email", "invite", "cancel"])
</script>

<style scoped>
.designer-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: transparent;
  border: none;
  width: 100%;
  max-width: 100%;
  padding: 0;
}

.label-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.label-row label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.designer-input {
  display: flex;
  gap: 10px;
  align-items: center;
}

.designer-input input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.invite-btn {
  background: #10b981;
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: 0.2s ease;
}

.invite-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.premium-tag {
  background: #facc15;
  color: #1f2937;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.designer-status {
  font-size: 13px;
  color: #059669;
  background: #ecfdf5;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #a7f3d0;
  width: fit-content;
}

/* Tooltip */
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
</style>

<template>
  <div class="actions">

    <button 
  v-if="!hideDelete && !confirmDelete"
  class="delete"
  @click="confirmDelete = true"
>
  ✕
</button>


    <div 
  v-if="!hideDelete && confirmDelete"
  class="confirm-box shake"
>
  <span class="confirm-text">تأكيد الحذف؟</span>

  <button class="yes-btn" @click="emit('delete', cardId)">نعم</button>
  <button class="no-btn" @click="confirmDelete = false">لا</button>
</div>


  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  cardId: String,
  hideDelete: Boolean
})

const emit = defineEmits(["delete"])

const confirmDelete = ref(false)
</script>


<style scoped>
.actions {
  display: flex;
  justify-content: flex-start;
}

.delete {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  transition: 0.25s ease;
}

.delete:hover {
  background: #b91c1c;
}

.confirm-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fee2e2;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  animation: expand 0.25s ease;
}

.confirm-text {
  font-size: 13px;
  color: #b91c1c;
  font-weight: 600;
}

.yes-btn {
  background: #dc2626;
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.yes-btn:hover {
  background: #b91c1c;
}

.no-btn {
  background: #e5e7eb;
  color: #374151;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.no-btn:hover {
  background: #d1d5db;
}

@keyframes expand {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.shake {
  animation: shake 0.35s ease;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

@media (max-width: 600px) {

  .actions {
    justify-content: flex-start;
  }

  .delete {
    padding: 6px 10px;
    font-size: 14px;
  }

  .confirm-box {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 10px;
  }

  .confirm-text {
    font-size: 12px;
    text-align: center;
  }

  .yes-btn,
  .no-btn {
    width: 100%;
    padding: 8px;
    font-size: 12px;
  }
}

</style>

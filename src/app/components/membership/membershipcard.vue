<template>
  <div class="card" :class="{ active: active }" @click="$emit('select')">

    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>

    <ul class="features">
      <li v-for="(f, i) in features" :key="i">
        <span class="icon" :class="{ off: !f.allowed }">
          {{ f.allowed ? "✔" : "✖" }}
        </span>
        <span :class="{ offText: !f.allowed }">{{ f.text }}</span>
      </li>
    </ul>

    <button class="action-btn" :class="{ activeBtn: active }">
      {{ buttonText }}
    </button>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  features: Array,
  active: Boolean,
  buttonText: String
})

defineEmits(["select"])
</script>

<style scoped>
.card {
  width: 280px;
  padding: 22px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  transition: 0.25s ease;
  direction: rtl;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}

.card.active {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #2563eb33;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}

.description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.features li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 14px;
  color: #10b981;
  font-weight: 700;
}

.icon.off {
  color: #dc2626;
}

.offText {
  color: #9ca3af;
  text-decoration: line-through;
}

.action-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.action-btn:hover {
  background: #1e4fc7;
}

.activeBtn {
  background: #10b981 !important;
}
</style>

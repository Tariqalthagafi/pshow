<template>
  <div class="logo">
    <span class="pro">Pro</span>
    <span class="show">Show</span>
  </div>
</template>

<script setup>
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
}

/* الجزء الأول: Pro */
.pro {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #111;
}

/* الجزء الثاني: Show */
.show {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.5px;

  /* Gradient احترافي */
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Stroke خفيف يعطي عمق */
  text-shadow: 0 1px 2px rgba(0,0,0,0.08);
}

/* Hover أنيق */
.logo:hover .pro,
.logo:hover .show {
  transform: translateY(-1px);
  transition: 0.25s ease;
}
</style>

<template>
  <div class="google-wrapper">
    <button class="google-btn" @click="loginWithGoogle">
  <span>{{ label }}</span>
  <img src="/google-icon.png" alt="Google" class="google-icon" />
</button>

  </div>
</template>

<script setup>
import { supabase } from "@/supabase"

const props = defineProps({
  label: {
    type: String,
    default: "تسجيل الدخول"
  }
})

async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://pshow.vercel.app/app/content"
    }
  })

  if (error) {
    console.error("Google Auth Error:", error)
  }
}
</script>

<style scoped>
.google-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* زر Google */
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .75rem;

  background: #ffffff;
  color: #444;
  border: 1px solid #e5e7eb;
  border-radius: .75rem;

  padding: .9rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;

  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);

  flex-direction: row-reverse;
}

.google-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.google-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.google-icon {
  width: 22px;
  height: 22px;
}
</style>

<template>
  <div class="activate-container">

    <div class="box">

      <h2 class="title">تفعيل الشاشة</h2>

      <div class="field">
        <label>رمز الشاشه</label>
        <input
          type="text"
          v-model="screenIdInput"
          placeholder="أدخل رمز الشاشه"
          inputmode="text"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
        />
      </div>

      <div class="field">
        <label>كود التفعيل</label>
        <input
          type="text"
          v-model="activationCode"
          maxlength="4"
          placeholder="أدخل الكود المكوّن من 4 أرقام"
          inputmode="numeric"
        />
      </div>

      <button class="activate-btn" @click="activateScreen">
        تفعيل الشاشة
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { supabase } from "@/supabase"

const screenIdInput = ref("")
const activationCode = ref("")
const errorMessage = ref("")

async function activateScreen() {
  errorMessage.value = ""

  const shortId = String(screenIdInput.value).trim()   // الرقم القصير
  const code = String(activationCode.value).trim()

  if (!shortId || !code) {
    errorMessage.value = "يرجى إدخال screen_id وكود التفعيل"
    return
  }

  // البحث بالرقم القصير
  const { data, error } = await supabase
    .from("screens")
    .select("id, activation_code")   // id = UUID
    .eq("screen_id", shortId)
    .single()

  if (error || !data) {
    errorMessage.value = "لم يتم العثور على هذه الشاشة"
    return
  }

  if (String(data.activation_code) !== code) {
    errorMessage.value = "كود التفعيل غير صحيح"
    return
  }

  const realScreenId = data.id   // UUID الحقيقي
  localStorage.setItem("active_screen_id", realScreenId)

  const fingerprint = await createFingerprint()
  localStorage.setItem("device_fingerprint", fingerprint)

  const deviceInfo = {
    id: realScreenId,              // UUID ← الآن في عمود id
    screen_id: Number(shortId),    // الرقم القصير ← الآن في عمود screen_id
    user_id: null,
    device_id: fingerprint,
    resolution: `${screen.width}x${screen.height}`,
    orientation: screen.width > screen.height ? "landscape" : "portrait",
    app_version: "1.0.0",
    os_version: navigator.userAgent,
    ip_address: null,
    last_seen: new Date().toISOString()
  }

  const { error: activationError } = await supabase
    .from("screen_activation")
    .upsert(deviceInfo, {
      onConflict: "id",        // UUID هو المفتاح الآن
      returning: "minimal"
    })

  if (activationError) {
    console.log("SUPABASE ERROR:", JSON.stringify(activationError, null, 2))
    errorMessage.value = activationError.message || "حدث خطأ أثناء تفعيل الشاشة"
    return
  }

  window.location.href = "/display"
}

async function createFingerprint() {
  const ua = navigator.userAgent
  const res = `${screen.width}x${screen.height}`
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const random = crypto.randomUUID()

  const raw = ua + res + tz + random
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw))

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
</script>

<style scoped>
.activate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f1f5f9;
}

.box {
  background: white;
  padding: 30px;
  width: 350px;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}

.field {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #444;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.activate-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.activate-btn:hover {
  background: #1e4fcf;
}

.error {
  margin-top: 12px;
  color: #d00;
  text-align: center;
}
</style>

<template>
  <div class="affiliate-page">

    <!-- رابط الإحالة -->
    <div class="ref-box">
      <div class="label">رابط الإحالة الخاص بك</div>

      <div class="ref-row">
        <span class="ref-link">{{ fullReferralLink }}</span>
        <button class="copy-btn" @click="copyLink">نسخ</button>
      </div>
    </div>

    <!-- جدول العملاء -->
    <div class="clients-box">
      <h3>العملاء المستقطبون</h3>

      <table>
        <thead>
          <tr>
            <th>رقم العميل</th>
            <th>البريد</th>
            <th>الحالة</th>
            <th>تاريخ التسجيل</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.email }}</td>
            <td>
              <span :class="['status', client.status]">
                {{ translateStatus(client.status) }}
              </span>
            </td>
            <td>{{ client.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// كود الإحالة (لاحقًا يأتي من Supabase)
const affiliateCode = "AFF123"

// رابط الإحالة الكامل
const fullReferralLink = computed(() =>
  `https://yourapp.com/?ref=${affiliateCode}`
)

// قائمة العملاء (بيانات وهمية الآن)
const clients = ref([
  { id: 101, email: "user1@mail.com", status: "free", created_at: "2024-01-10" },
  { id: 102, email: "user2@mail.com", status: "paid", created_at: "2024-01-12" },
  { id: 103, email: "user3@mail.com", status: "cancelled", created_at: "2024-01-15" }
])

// ترجمة الحالة
const translateStatus = (s) => {
  return {
    free: "مجاني",
    paid: "مدفوع",
    cancelled: "ملغي"
  }[s]
}

// نسخ الرابط
const copyLink = () => {
  navigator.clipboard.writeText(fullReferralLink.value)
  alert("تم نسخ رابط الإحالة")
}
</script>

<style>
.affiliate-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
}

/* رابط الإحالة */
.ref-box {
  background: #fff;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.ref-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f9fc;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e3e6ea;
}

.ref-link {
  direction: ltr;
  font-size: 13px;
  color: #333;
}

.copy-btn {
  background: #1a73e8;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}

/* جدول العملاء */
.clients-box {
  background: #fff;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: white;
}

.status.free {
  background: #6b7280;
}

.status.paid {
  background: #16a34a;
}

.status.cancelled {
  background: #dc2626;
}
</style>

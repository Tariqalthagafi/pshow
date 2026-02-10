<template>
  <div class="affiliates-list">

    <div 
      v-for="affiliate in affiliatesWithReferrals" 
      :key="affiliate.id" 
      class="affiliate-row"
    >
      <!-- الاسم والإيميل -->
      <div class="info">
        <h3>{{ affiliate.name }}</h3>
        <p>{{ affiliate.email }}</p>
      </div>

      <!-- قائمة الإحالات -->
      <div class="referrals">
        <h4>الإحالات:</h4>
        <ul>
          <li v-for="ref in affiliate.referrals" :key="ref.id">
            {{ ref.name }} — {{ ref.email }}

            <!-- حالة الحساب للمستقطَب -->
            <span class="ref-status" :class="ref.accountType">
              {{ ref.accountType === 'paid' ? 'مدفوع' : 'مجاني' }}
            </span>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script setup>
// لاحقًا تربطها بـ Supabase
const affiliates = [
  {
    id: 1,
    name: "منى",
    email: "mona@test.com",
    accountType: "paid",
    referrals: [
      { id: 101, name: "أحمد", email: "ahmed@test.com", accountType: "free" },
      { id: 102, name: "زنيقط", email: "zoniqud@test.com", accountType: "paid" },
    ]
  },
  {
    id: 2,
    name: "خالد",
    email: "khaled@test.com",
    accountType: "free",
    referrals: []
  },
  {
    id: 3,
    name: "طارق",
    email: "tariq@test.com",
    accountType: "paid",
    referrals: [
      { id: 201, name: "عبدالله", email: "abdullah@test.com", accountType: "free" },
    ]
  }
]

// نعرض فقط اللي عندهم إحالات
const affiliatesWithReferrals = affiliates.filter(a => a.referrals.length > 0)
</script>

<style scoped>
.affiliates-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.affiliate-row {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  direction: rtl;
}

.info h3 {
  font-size: 18px;
  font-weight: 700;
}

.info p {
  font-size: 14px;
  color: #666;
}

.referrals {
  margin-top: 12px;
}

.referrals h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
}

.referrals ul {
  padding-right: 16px;
}

.referrals li {
  font-size: 14px;
  padding: 4px 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* شارة حالة الحساب */
.ref-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
}

.ref-status.paid {
  background: #05966922;
  color: #059669;
}

.ref-status.free {
  background: #d9770622;
  color: #d97706;
}
</style>

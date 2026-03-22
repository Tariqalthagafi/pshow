// الخطط المتاحة
export const MEMBERSHIP_PLANS = ["free", "pro"] as const

// مدة الاشتراك الافتراضية
export const MEMBERSHIP_DEFAULT_BILLING = "monthly"

// أسعار افتراضية (يمكن تعديلها لاحقًا من Supabase)
export const MEMBERSHIP_PRICES = {
  monthly: 19,
  yearly: 199
}

// عدد الشاشات المتاحة لكل خطة
export const MEMBERSHIP_SCREEN_LIMITS = {
  free: 1,
  pro: 10
}

// رابط الأساس المستخدم لإنشاء رابط الإحالة
export const AFFILIATE_BASE_URL = "https://yourapp.com"

// بادئة كود الإحالة (لو احتجت توليد أكواد جديدة)
export const AFFILIATE_CODE_PREFIX = "AFF"

// عدد العملاء المعروضين في الصفحة الواحدة (لو أضفت pagination)
export const AFFILIATE_PAGE_SIZE = 20

// الحالات المسموح بها للعملاء
export const AFFILIATE_ALLOWED_STATUSES = ["free", "paid", "cancelled"] as const

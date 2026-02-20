<template>
  <div class="usage-guide">

    <h1>دليل الاستخدام</h1>

    <!-- تشغيل الشاشة لأول مرة -->
    <section>
      <h2>١. تشغيل الشاشة لأول مرة</h2>

      <div class="alert-box">
        <strong>تنبيه مهم:</strong>
        يجب فتح المتصفح من خلال <strong>الجهاز المتصل بالشاشة</strong>  
        مثل:
        <ul>
          <li>الشاشة الذكية (Smart TV)</li>
          <li>جهاز X96 Mini أو أي Android TV Box</li>
          <li>جهاز بث مثل Chromecast أو Fire TV Stick</li>
          <li>الرسيفر الذي يحتوي على متصفح</li>
        </ul>
        لا تفتح الرابط من جوالك أو لابتوبك، يجب أن يكون من نفس الجهاز الذي سيعرض المحتوى.
      </div>

      <ul>
        <li>شبّك الجهاز على الشاشة عبر HDMI (إن وجد).</li>
        <li>شغّل الجهاز واتصل بالإنترنت.</li>
        <li>افتح المتصفح داخل الجهاز.</li>
        <li>ادخل رابط العرض الخاص بك:</li>
      </ul>

      <div class="url-box">
        <code>{{ displayUrl }}</code>
      </div>

      <p class="note">
        ملاحظة: إعداد الشاشة الأولى هو الأهم.  
        بعد ذلك، أي شاشة إضافية يتم إعدادها بنفس الخطوات تمامًا  
        لكن باستخدام جهاز مختلف ورمز شاشة مختلف.
      </p>
    </section>

    <!-- إضافة شاشة جديدة -->
    <section>
      <h2>٢. إضافة شاشة جديدة</h2>
      <p>من لوحة التحكم → الشاشات → إضافة شاشة جديدة.</p>
      <ul>
        <li>اختر اسم الشاشة.</li>
        <li>انسخ رمز الربط (Screen Token).</li>
        <li>الصقه في صفحة العرض داخل الجهاز.</li>
      </ul>
    </section>

    <!-- إضافة عرض جديد -->
    <section>
      <h2>٣. إضافة عرض جديد</h2>
      <ul>
        <li>من لوحة التحكم → العروض.</li>
        <li>اضغط "إضافة عرض".</li>
        <li>ارفع الصور أو الفيديوهات.</li>
        <li>اختر مدة العرض.</li>
        <li>اربط العرض بالشاشات.</li>
      </ul>
    </section>

    <!-- تحديث المحتوى -->
    <section>
      <h2>٤. تحديث المحتوى</h2>
      <p>التحديث يتم تلقائيًا عبر Supabase Realtime.</p>
      <p>لا تحتاج إعادة تشغيل الجهاز.</p>
    </section>

    <!-- الأجهزة المدعومة -->
    <section>
      <h2>٥. الأجهزة المدعومة</h2>
      <ul>
        <li>X96 Mini</li>
        <li>Chromecast with Google TV</li>
        <li>Fire TV Stick</li>
        <li>أي Android TV Box</li>
      </ul>
    </section>

  </div>
</template>

<script setup>
const displayUrl = "https://yourdomain.com/display"
</script>

<style scoped>
.usage-guide {
  direction: rtl;
  text-align: right;
  max-width: 850px;
  margin: auto;
  padding: 20px;
  line-height: 1.9;
}

.alert-box {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.url-box {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 15px;
}

.note {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>

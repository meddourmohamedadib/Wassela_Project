// تحديد اللغة الافتراضية (المحفوظة أو العربية)
let currentLang = localStorage.getItem('siteLang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    // تغيير اتجاه الصفحة تلقائياً (RTL للعربي، LTR للبقية)
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // المرور على كل عنصر يحمل خاصية data-i18n وتغيير محتواه
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // تحديث شكل قائمة اختيار اللغات إن وجدت
    const langSelect = document.getElementById('custom-lang-select');
    if (langSelect) {
        langSelect.value = lang;
    }
}

// تنفيذ الترجمة فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // ربط الحدث بقائمة اختيار اللغة (إذا أردت إضافة قائمة منسدلة مستقبلاً)
    const langSelect = document.getElementById('custom-lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    
});
// كود تشغيل وإغلاق نافذة الاشتراكات
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openPricingModal');
    const closeBtn = document.getElementById('closePricingModal');
    const modal = document.getElementById('pricingModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
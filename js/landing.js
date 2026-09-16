// --- ملف الأنيميشن والتفاعل الخاص بصفحة العرض (landing.js) ---
document.addEventListener("DOMContentLoaded", function() {
    
    // مراقب التمرير (Intersection Observer) لتفعيل الأنيميشن بسلاسة عند ظهور العناصر على الشاشة
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // إذا أردت أن يعمل الأنيميشن مرة واحدة فقط لكل عنصر، قم بإلغاء التعليق عن السطر التالي:
                // observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // تحديد جميع العناصر التي تحمل كلاسات الأنيميشن
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
    revealElements.forEach(el => observer.observe(el));

});

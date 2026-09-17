/* --- الجافاسكريفت الخاصة بصفحة استكشاف الدورات والدروس - منصة وصلة --- */

document.addEventListener('DOMContentLoaded', () => {
    initSidePanelEvents();
    initSearchAndFilterEvents();
});

/* ================= 1. إدارة اللوحة الجانبية (Side Panel) ================= */
function initSidePanelEvents() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closePanelBtn = document.getElementById('close-panel-btn');
    const overlay = document.getElementById('side-panel-overlay');
    const sidePanel = document.getElementById('side-panel');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openSidePanel);
    }

    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', closeSidePanel);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidePanel);
    }

    // إغلاق اللوحة بشرط الضغط على زر Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidePanel();
            closeCoursePreview();
            closeFeatureModal();
        }
    });
}

function openSidePanel() {
    const overlay = document.getElementById('side-panel-overlay');
    const sidePanel = document.getElementById('side-panel');
    if (overlay && sidePanel) {
        overlay.classList.add('active');
        sidePanel.classList.add('open');
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }
}

function closeSidePanel() {
    const overlay = document.getElementById('side-panel-overlay');
    const sidePanel = document.getElementById('side-panel');
    if (overlay && sidePanel) {
        overlay.classList.remove('active');
        sidePanel.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// التبديل بين أوضاع المعاينة باللوحة الجانبية (زائر / طالب / أستاذ)
function switchSidePanelRole(role) {
    const rolePills = document.querySelectorAll('.role-pill');
    rolePills.forEach(pill => {
        if (pill.dataset.role === role) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    const roleSections = document.querySelectorAll('.panel-role-section');
    roleSections.forEach(section => {
        if (section.classList.contains(`panel-role-${role}`)) {
            section.classList.add('active-role-view');
        } else {
            section.classList.remove('active-role-view');
        }
    });
}


/* ================= 2. شريط البحث والتصفية للدروس للدورات ================= */
function initSearchAndFilterEvents() {
    const searchInput = document.getElementById('course-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const topCategorySelect = document.getElementById('top-category-select');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'block' : 'none';
            }
            applyFilters();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                applyFilters();
            }
        });
    }

    if (topCategorySelect) {
        topCategorySelect.addEventListener('change', (e) => {
            const category = e.target.value;
            // تحديث حالة أزرار Chips بالهيرو
            updateChipActiveState(category);
            applyFilters();
        });
    }
}

function filterCoursesByCategory(category) {
    const topCategorySelect = document.getElementById('top-category-select');
    if (topCategorySelect) {
        topCategorySelect.value = category;
    }
    updateChipActiveState(category);
    applyFilters();
}

function updateChipActiveState(category) {
    const chipBtns = document.querySelectorAll('.chip-btn');
    chipBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function applyFilters() {
    const query = (document.getElementById('course-search-input')?.value || '').trim().toLowerCase();
    const selectedCategory = document.getElementById('top-category-select')?.value || 'all';
    
    const courseCards = document.querySelectorAll('.course-card');
    let visibleCount = 0;

    courseCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const textContent = card.textContent.toLowerCase();

        const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
        const matchesQuery = (query === '' || textContent.includes(query));

        if (matchesCategory && matchesQuery) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // تحديث نص نتائج البحث
    const resultStatus = document.getElementById('search-result-status');
    if (resultStatus) {
        if (query.length > 0) {
            resultStatus.textContent = `تم العثور على ${visibleCount} دورة مطابقة للبحث "${query}"`;
        } else if (selectedCategory !== 'all') {
            resultStatus.textContent = `عرض ${visibleCount} دورة في التصنيف المختار`;
        } else {
            resultStatus.textContent = `عرض جميع الدورات المتاحة (${visibleCount} دورة)`;
        }
    }
}

// ترتيب الدورات القائمة
function sortCoursesList(sortBy) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    const cardsArray = Array.from(grid.querySelectorAll('.course-card'));

    cardsArray.sort((a, b) => {
        if (sortBy === 'popular') {
            return (parseInt(b.dataset.popularity) || 0) - (parseInt(a.dataset.popularity) || 0);
        } else if (sortBy === 'rating') {
            return (parseFloat(b.dataset.rating) || 0) - (parseFloat(a.dataset.rating) || 0);
        } else if (sortBy === 'price-low') {
            return (parseInt(a.dataset.price) || 0) - (parseInt(b.dataset.price) || 0);
        } else {
            return 0;
        }
    });

    cardsArray.forEach(card => grid.appendChild(card));
}


/* ================= 3. بيانات ومعاينة نافذة الدورة (Course Preview Modal) ================= */
const coursesData = {
    phys_bac: {
        badge: "تعليم ثانوي - بكالوريا (BAC)",
        title: "المراجعة الشاملة في الفيزياء للبكالوريا",
        teacher: "د. بلقاسم بن عيسى",
        lessonsCount: "42 درساً",
        duration: "38 ساعة فيديو",
        price: "3,500 د.ج",
        lessons: [
            { title: "المتابعة الزمنية لتحول كيميائي في وسط مائي", time: "1:45:00", pdf: true },
            { title: "التحولات النووية وحساب كتل الطاقة وتناقص النوى", time: "2:10:00", pdf: true },
            { title: "دروس وحلول تمارين ظواهر الكهربائية (RC & RL)", time: "3:00:00", pdf: true },
            { title: "تطور جملة كيميائية نحو حالة التوازن (الأحماض والأسس)", time: "2:30:00", pdf: true },
            { title: "تطور جملة ميكانيكية وحركة الكواكب والأقمار", time: "3:15:00", pdf: true }
        ]
    },
    math_bac: {
        badge: "تعليم ثانوي - بكالوريا (BAC)",
        title: "سلسلة التميز في الدوال والمتتاليات والاحتمالات",
        teacher: "أ. أديب مدور",
        lessonsCount: "50 درساً",
        duration: "45 ساعة فيديو",
        price: "4,000 د.ج",
        lessons: [
            { title: "الدوال العددية والنهايات والاشتقاقية بالتفصيل", time: "2:50:00", pdf: true },
            { title: "الدوال الأسية واللوغاريتمية النيبيرية مع مسائل كاملة", time: "3:40:00", pdf: true },
            { title: "المتتاليات العددية والبرهان بالتراجع والتقارب", time: "2:20:00", pdf: true },
            { title: "الاحتمالات الشرطية والمتغير العشوائي والعد", time: "2:15:00", pdf: true }
        ]
    },
    cs_asd: {
        badge: "تعليم جامعي - LMD",
        title: "Algorithmique et Structure de Données (ASD1 & ASD2)",
        teacher: "م. محمد أمين",
        lessonsCount: "36 درساً",
        duration: "30 ساعة فيديو",
        price: "مجاناً 🔥",
        lessons: [
            { title: "Introduction aux algorithmes & Variables et Types", time: "1:10:00", pdf: true },
            { title: "Les Structures Conditionnelles et Boucles (Iteratives)", time: "1:40:00", pdf: true },
            { title: "Les Tableaux (1D & 2D) et les Chaines de caractères", time: "2:05:00", pdf: true },
            { title: "Pointeurs, Allocation Dynamique & Listes Chaînées", time: "2:50:00", pdf: true },
            { title: "Les Piles (Stacks), Files (Queues) et Arbres (Trees)", time: "3:10:00", pdf: true }
        ]
    },
    ai_ml: {
        badge: "الذكاء الاصطناعي والتقنية",
        title: "أساسيات تعلم الآلة والشبكات العصبية باستخدام Python",
        teacher: "د. سعاد سايحي",
        lessonsCount: "28 درساً",
        duration: "26 ساعة فيديو",
        price: "5,500 د.ج",
        lessons: [
            { title: "مقدمة في الذكاء الاصطناعي ومكتبة NumPy & Pandas", time: "1:30:00", pdf: true },
            { title: "Supervised Learning: Linear & Logistic Regression", time: "2:15:00", pdf: true },
            { title: "Decision Trees, Random Forest & Support Vector Machines", time: "2:40:00", pdf: true },
            { title: "Neural Networks Fundamentals with PyTorch", time: "3:20:00", pdf: true }
        ]
    },
    med_anat: {
        badge: "العلوم الطبـية",
        title: "Anatomie Humaine & Physiologie",
        teacher: "د. مريم القاسمي",
        lessonsCount: "32 درساً",
        duration: "34 ساعة فيديو",
        price: "6,000 د.ج",
        lessons: [
            { title: "Système Cardiovasculaire et Anatomie du Cœur", time: "2:00:00", pdf: true },
            { title: "Système Nerveux Central et Périphérique", time: "2:30:00", pdf: true },
            { title: "Appareil Respiratoire et Échanges Gazeux", time: "1:50:00", pdf: true }
        ]
    },
    ge_math: {
        badge: "المدارس العليا (Grandes Écoles)",
        title: "Analyse 1 & Algèbre 1 (Classes Préparatoires)",
        teacher: "د. طارق الحكيم",
        lessonsCount: "40 درساً",
        duration: "42 ساعة فيديو",
        price: "4,500 د.ج",
        lessons: [
            { title: "Suites Réelles et Fonctions Continues", time: "2:20:00", pdf: true },
            { title: "Développement Limité et Intégration de Riemann", time: "2:45:00", pdf: true },
            { title: "Espaces Vectoriels et Applications Linéaires", time: "3:10:00", pdf: true }
        ]
    }
};

function openCoursePreview(courseKey) {
    const data = coursesData[courseKey];
    if (!data) return;

    document.getElementById('modal-course-badge').textContent = data.badge;
    document.getElementById('modal-course-title').textContent = data.title;
    document.getElementById('modal-course-teacher').innerHTML = `<i class="fa-solid fa-chalkboard-user"></i> الأستاذ: ${data.teacher}`;
    document.getElementById('modal-lessons-count').textContent = data.lessonsCount;
    document.getElementById('modal-course-duration').textContent = data.duration;
    document.getElementById('modal-course-price').textContent = data.price;

    const accordion = document.getElementById('modal-lessons-accordion');
    accordion.innerHTML = '';

    data.lessons.forEach((lesson, idx) => {
        const item = document.createElement('div');
        item.className = 'lesson-item';
        item.innerHTML = `
            <div>
                <i class="fa-solid fa-circle-play"></i>
                <strong>الدرس ${idx + 1}:</strong> ${lesson.title}
            </div>
            <div class="lesson-duration">
                <i class="fa-regular fa-clock"></i> ${lesson.time}
            </div>
        `;
        accordion.appendChild(item);
    });

    const modal = document.getElementById('coursePreviewModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeCoursePreview() {
    const modal = document.getElementById('coursePreviewModal');
    if (modal) {
        modal.classList.remove('active');
    }
}


/* ================= 4. عرض خيارات وميزات القائمة الجانبية (Feature Modal) ================= */
function openPanelFeature(featureKey) {
    closeSidePanel(); // إغلاق السايد بار وإظهار النافذة التفاعلية

    const modal = document.getElementById('featureDisplayModal');
    const titleEl = document.getElementById('feature-modal-title');
    const subTitleEl = document.getElementById('feature-modal-subtitle');
    const bodyEl = document.getElementById('feature-modal-body');

    if (!modal || !bodyEl) return;

    if (featureKey === 'teacher-dashboard') {
        titleEl.innerHTML = `<i class="fa-solid fa-gauge-high"></i> لوحة التحكم والإحصائيات (الأستاذ)`;
        subTitleEl.textContent = `تحليلات مباشرة لمبيعات الدورات ومتابعة الطلاب`;
        bodyEl.innerHTML = `
            <div class="stat-cards-grid">
                <div class="dashboard-card">
                    <h5>إجمالي الإيرادات</h5>
                    <strong>145,000 د.ج</strong>
                </div>
                <div class="dashboard-card">
                    <h5>عدد الطلاب المشتركين</h5>
                    <strong>320 طالب</strong>
                </div>
                <div class="dashboard-card">
                    <h5>التقييم العام للدورات</h5>
                    <strong>4.9 / 5 ⭐</strong>
                </div>
                <div class="dashboard-card">
                    <h5>نسبة إكمال الدروس</h5>
                    <strong>88%</strong>
                </div>
            </div>
            <h4 style="margin-top: 15px; font-weight: 800;"><i class="fa-solid fa-chart-simple"></i> ملخص مبيعات الدورات هذا الشهر:</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>الدورة التعليمية</th>
                        <th>المشتركين</th>
                        <th>الإيرادات</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>الفيزياء للبكالوريا</td>
                        <td>180 طالب</td>
                        <td>90,000 د.ج</td>
                        <td><span class="badge-green">نشط</span></td>
                    </tr>
                    <tr>
                        <td>مراجعة الوحدات النهائية</td>
                        <td>140 طالب</td>
                        <td>55,000 د.ج</td>
                        <td><span class="badge-green">نشط</span></td>
                    </tr>
                </tbody>
            </table>
        `;
    } 
    else if (featureKey === 'teacher-earnings') {
        titleEl.innerHTML = `<i class="fa-solid fa-sack-dollar"></i> الأرباح والسحوبات (الأستاذ)`;
        subTitleEl.textContent = `إدارة الرصيد والسحب عبر CCP أو BaridiMob`;
        bodyEl.innerHTML = `
            <div class="dashboard-card" style="background: var(--light-emerald-bg); margin-bottom: 20px;">
                <h5>الرصيد المتاح للسحب</h5>
                <strong style="font-size: 28px; color: var(--primary-emerald);">145,000 د.ج</strong>
            </div>
            <h4 style="font-weight: 800; margin-bottom: 10px;"><i class="fa-solid fa-money-bill-transfer"></i> طلب سحب جديد:</h4>
            <div style="display: flex; flex-direction: column; gap: 12px; background: #f8faf9; padding: 15px; border-radius: 12px; border: 1px solid var(--border-color);">
                <label style="font-size: 13px; font-weight: 700;">طريقة السحب:</label>
                <select style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-weight: 700;">
                    <option>الحساب البريدي الجاري (CCP)</option>
                    <option>بريدي موب (BaridiMob)</option>
                </select>
                <label style="font-size: 13px; font-weight: 700;">المبلغ المراد سحبه (د.ج):</label>
                <input type="number" placeholder="أدخل المبلغ..." value="50000" style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-weight: 700;">
                <button class="panel-btn panel-btn-primary" onclick="alert('تم إرسال طلب السحب بنجاح إلى الإدارة!')" style="margin-top: 10px;">
                    <i class="fa-solid fa-paper-plane"></i> تأكيد طلب السحب
                </button>
            </div>
        `;
    }
    else if (featureKey === 'student-courses') {
        titleEl.innerHTML = `<i class="fa-solid fa-book-open"></i> دوراتي المسجلة (الطالب)`;
        subTitleEl.textContent = `قائمة الدورات التي قمت بالاشتراك فيها`;
        bodyEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="lesson-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                    <strong style="font-size: 15px;"><i class="fa-solid fa-atom"></i> المراجعة الشاملة في الفيزياء للبكالوريا</strong>
                    <div style="width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="width: 85%; background: var(--primary-emerald); height: 100%;"></div>
                    </div>
                    <small style="color: var(--text-muted); font-weight: 700;">تم إكمال 85% من محتوى الدورة</small>
                </div>
                <div class="lesson-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                    <strong style="font-size: 15px;"><i class="fa-solid fa-calculator"></i> سلسلة التميز في الرياضيات</strong>
                    <div style="width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="width: 60%; background: var(--accent-emerald); height: 100%;"></div>
                    </div>
                    <small style="color: var(--text-muted); font-weight: 700;">تم إكمال 60% من محتوى الدورة</small>
                </div>
            </div>
        `;
    }
    else if (featureKey === 'student-progress') {
        titleEl.innerHTML = `<i class="fa-solid fa-chart-line"></i> تقدّمي الدراسي (الطالب)`;
        subTitleEl.textContent = `ملخص التقييم والتمارين والتفوق الدراسي`;
        bodyEl.innerHTML = `
            <div class="stat-cards-grid">
                <div class="dashboard-card">
                    <h5>إجمالي الساعات المشاهدة</h5>
                    <strong>64 ساعة</strong>
                </div>
                <div class="dashboard-card">
                    <h5>التمارين والمواضيع المحلولة</h5>
                    <strong>48 تمرين</strong>
                </div>
            </div>
            <h4 style="margin-top: 15px; font-weight: 800;"><i class="fa-solid fa-medal"></i> شهادات وإنجازات الفصل:</h4>
            <div class="lesson-item">
                <span><i class="fa-solid fa-certificate" style="color: #f59e0b;"></i> شهادة تفوق وحدة الميكانيك</span>
                <span class="badge-green">مكتملة</span>
            </div>
        `;
    }
    else if (featureKey === 'student-purchases') {
        titleEl.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> سجل مشترياتي`;
        subTitleEl.textContent = `فواتير واشتراكات الدورات المسجلة`;
        bodyEl.innerHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>رقم الفاتورة</th>
                        <th>الدورة</th>
                        <th>التاريخ</th>
                        <th>المبلغ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#INV-2026-091</td>
                        <td>دورة الفيزياء</td>
                        <td>2026/09/10</td>
                        <td>3,500 د.ج</td>
                    </tr>
                    <tr>
                        <td>#INV-2026-044</td>
                        <td>دورة الرياضيات</td>
                        <td>2026/08/28</td>
                        <td>4,000 د.ج</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    else if (featureKey === 'teacher-courses') {
        titleEl.innerHTML = `<i class="fa-solid fa-chalkboard-user"></i> إدارة دوراتي كأستاذ`;
        subTitleEl.textContent = `إضافة دورات جديدة وتعديل المحتوى الحالي`;
        bodyEl.innerHTML = `
            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 15px;">الدورات المنشورة (6 دورات):</strong>
                <button class="panel-btn panel-btn-primary" onclick="alert('سيتم فتح نموذج إضافة دورة جديدة!')">
                    <i class="fa-solid fa-plus"></i> إضافة دورة جديدة
                </button>
            </div>
            <div class="lesson-item" style="justify-content: space-between;">
                <div><strong>الفيزياء للبكالوريا (جميع الوحدات)</strong></div>
                <div><span class="menu-badge badge-green">180 طالب</span></div>
            </div>
            <div class="lesson-item" style="justify-content: space-between;">
                <div><strong>سلسلة التمارين الشاملة في الكهرباء</strong></div>
                <div><span class="menu-badge badge-green">140 طالب</span></div>
            </div>
        `;
    }
    else if (featureKey === 'settings') {
        titleEl.innerHTML = `<i class="fa-solid fa-gear"></i> إعدادات الحساب`;
        subTitleEl.textContent = `تعديل تفضيلات الإشعارات واللغة وكلمة المرور`;
        bodyEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <label style="font-size: 14px; font-weight: 700;">
                    <input type="checkbox" checked> تفعيل إشعارات الدروس والبثوث المباشرة
                </label>
                <label style="font-size: 14px; font-weight: 700;">
                    <input type="checkbox" checked> استقبال ملخص التمارين الأسبوعي على البريد الإلكتروني
                </label>
            </div>
        `;
    }
    else if (featureKey === 'profile') {
        titleEl.innerHTML = `<i class="fa-solid fa-user"></i> الملف الشخصي`;
        subTitleEl.textContent = `المعلومات الشخصية والتعليمية المسجلة`;
        bodyEl.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <i class="fa-solid fa-circle-user" style="font-size: 60px; color: var(--primary-emerald);"></i>
                <h3 style="margin-top: 8px;">حساب منصة وصلة</h3>
                <p style="color: var(--text-muted); font-size: 13px;">البريد الإلكتروني: user@wassla.dz</p>
            </div>
        `;
    }

    modal.classList.add('active');
}

function closeFeatureModal() {
    const modal = document.getElementById('featureDisplayModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

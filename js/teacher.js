/* =========================================================
WASSLA — TEACHER DASHBOARD
Frontend Prototype
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
"use strict";

```
/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

const showToast = (message) => {
    const toast = $("#toast");
    const toastMessage = $("#toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.wasslaToastTimer);

    window.wasslaToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
};

/* =========================================================
   ELEMENTS
   ========================================================= */

const sidebar = $("#teacherSidebar");
const overlay = $("#sidebarOverlay");
const mobileMenuBtn = $("#mobileMenuBtn");
const pageTitle = $("#pageTitle");

const navItems = $$(".nav-item[data-section]");
const sectionButtons = $$("[data-section-target]");
const sections = $$("section.page-section");

const searchBtn = $("#searchBtn");
const notificationBtn = $("#notificationBtn");
const languageSelect = $("#languageSelect");
const studentSearch = $("#studentSearch");

const courseForm = $("#courseForm");
const previewCourseBtn = $("#previewCourseBtn");
const previewModal = $("#coursePreviewModal");
const closePreviewBtn = $("#closeCoursePreview");

const compactSidebarToggle =
    $("#compactSidebarToggle");

const courseGrid = $(".course-grid");

/* =========================================================
   SECTION TITLES
   ========================================================= */

const sectionTitles = {
    dashboard: "Dashboard",
    courses: "My Courses",
    "create-course": "Create Course",
    students: "Students",
    progress: "Student Progress",
    "live-sessions": "Live Sessions",
    resources: "Resources",
    settings: "Settings"
};

/* =========================================================
   LANGUAGE SYSTEM
   ========================================================= */

const languageData = {
    en: {
        dir: "ltr",

        Dashboard: "Dashboard",
        "My Courses": "My Courses",
        "Create Course": "Create Course",
        Students: "Students",
        "Student Progress": "Student Progress",
        "Live Sessions": "Live Sessions",
        Resources: "Resources",
        Settings: "Settings",

        "Teacher Space": "Teacher Space",
        Teacher: "Teacher",
        Instructor: "Instructor",

        MAIN: "MAIN",
        STUDENTS: "STUDENTS",
        TEACHING: "TEACHING",

        "Teacher Dashboard": "Teacher Dashboard",
        "Welcome back,": "Welcome back,",
        "Keep your courses organized, follow your students' progress, and create a better learning experience.":
            "Keep your courses organized, follow your students' progress, and create a better learning experience.",

        "Create a Course": "Create a Course",
        "Total Courses": "Total Courses",
        "Total Students": "Total Students",
        "Average Progress": "Average Progress",
        "Course Performance": "Course Performance",
        "View all": "View all",
        "Student Insights": "Student Insights",
        "Needs attention": "Needs attention",
        "Positive progress": "Positive progress",
        "View Student Progress": "View Student Progress",
        "Recent Student Activity": "Recent Student Activity",
        "View students": "View students",

        "My Students": "My Students",
        "A quick overview of students learning with you.":
            "A quick overview of students learning with you.",
        "Student List": "Student List",
        "Search students...": "Search students...",

        Analytics: "Analytics",
        "Understand how students are progressing through your courses.":
            "Understand how students are progressing through your courses.",
        Overall: "Overall",
        "Learning Progress": "Learning Progress",
        "Course analysis": "Course analysis",
        "Progress by Course": "Progress by Course",

        "Organize upcoming learning sessions with your students.":
            "Organize upcoming learning sessions with your students.",
        "New Session": "New Session",
        Upcoming: "Upcoming",
        View: "View",

        Library: "Library",
        "Keep your teaching materials organized.":
            "Keep your teaching materials organized.",
        "Add Resource": "Add Resource",

        Preferences: "Preferences",
        "Customize your teacher workspace.":
            "Customize your teacher workspace.",
        "Teacher Profile": "Teacher Profile",
        Notifications: "Notifications",
        "Receive updates about student activity.":
            "Receive updates about student activity.",
        "AI Insights": "AI Insights",
        "Show learning insights on your dashboard.":
            "Show learning insights on your dashboard.",
        "Compact Sidebar": "Compact Sidebar",
        "Use a smaller navigation sidebar.":
            "Use a smaller navigation sidebar.",

        Teaching: "Teaching",
        Create: "Create",
        "Build a new learning experience for your students.":
            "Build a new learning experience for your students.",

        "Manage the courses you are teaching on Wassla.":
            "Manage the courses you are teaching on Wassla.",

        "Course Title": "Course Title",
        Category: "Category",
        Level: "Level",
        Description: "Description",
        "Number of Lessons": "Number of Lessons",
        "Estimated Duration": "Estimated Duration",

        "Select category": "Select category",
        "Select level": "Select level",

        "Artificial Intelligence": "Artificial Intelligence",
        Programming: "Programming",
        Mathematics: "Mathematics",
        "Computer Science": "Computer Science",
        Other: "Other",

        Beginner: "Beginner",
        Intermediate: "Intermediate",
        Advanced: "Advanced",

        Preview: "Preview",
        "Course Preview": "Course Preview",
        Lessons: "Lessons",
        "Student progress": "Student progress",

        "Back to Login": "Back to Login"
    },

    fr: {
        dir: "ltr",

        Dashboard: "Tableau de bord",
        "My Courses": "Mes cours",
        "Create Course": "Créer un cours",
        Students: "Étudiants",
        "Student Progress": "Progression des étudiants",
        "Live Sessions": "Sessions en direct",
        Resources: "Ressources",
        Settings: "Paramètres",

        "Teacher Space": "Espace enseignant",
        Teacher: "Enseignant",
        Instructor: "Formateur",

        MAIN: "PRINCIPAL",
        STUDENTS: "ÉTUDIANTS",
        TEACHING: "ENSEIGNEMENT",

        "Teacher Dashboard": "Tableau de bord enseignant",
        "Welcome back,": "Bon retour,",
        "Keep your courses organized, follow your students' progress, and create a better learning experience.":
            "Organisez vos cours, suivez la progression de vos étudiants et créez une meilleure expérience d'apprentissage.",

        "Create a Course": "Créer un cours",
        "Total Courses": "Total des cours",
        "Total Students": "Total des étudiants",
        "Average Progress": "Progression moyenne",
        "Course Performance": "Performance des cours",
        "View all": "Voir tout",
        "Student Insights": "Analyse des étudiants",
        "Needs attention": "À surveiller",
        "Positive progress": "Progression positive",
        "View Student Progress": "Voir la progression",
        "Recent Student Activity": "Activité récente des étudiants",
        "View students": "Voir les étudiants",

        "My Students": "Mes étudiants",
        "A quick overview of students learning with you.":
            "Un aperçu rapide des étudiants qui apprennent avec vous.",
        "Student List": "Liste des étudiants",
        "Search students...": "Rechercher des étudiants...",

        Analytics: "Analytique",
        "Understand how students are progressing through your courses.":
            "Suivez la progression des étudiants dans vos cours.",
        Overall: "Global",
        "Learning Progress": "Progression d'apprentissage",
        "Course analysis": "Analyse des cours",
        "Progress by Course": "Progression par cours",

        "Organize upcoming learning sessions with your students.":
            "Organisez les prochaines sessions avec vos étudiants.",
        "New Session": "Nouvelle session",
        Upcoming: "À venir",
        View: "Voir",

        Library: "Bibliothèque",
        "Keep your teaching materials organized.":
            "Organisez vos supports pédagogiques.",
        "Add Resource": "Ajouter une ressource",

        Preferences: "Préférences",
        "Customize your teacher workspace.":
            "Personnalisez votre espace enseignant.",
        "Teacher Profile": "Profil enseignant",
        Notifications: "Notifications",
        "Receive updates about student activity.":
            "Recevez les mises à jour sur l'activité des étudiants.",
        "AI Insights": "Analyses IA",
        "Show learning insights on your dashboard.":
            "Afficher les analyses d'apprentissage.",
        "Compact Sidebar": "Barre latérale compacte",
        "Use a smaller navigation sidebar.":
            "Utiliser une barre latérale plus petite.",

        Teaching: "Enseignement",
        Create: "Créer",
        "Build a new learning experience for your students.":
            "Créez une nouvelle expérience d'apprentissage.",

        "Manage the courses you are teaching on Wassla.":
            "Gérez les cours que vous enseignez sur Wassla.",

        "Course Title": "Titre du cours",
        Category: "Catégorie",
        Level: "Niveau",
        Description: "Description",
        "Number of Lessons": "Nombre de leçons",
        "Estimated Duration": "Durée estimée",

        "Select category": "Sélectionner une catégorie",
        "Select level": "Sélectionner un niveau",

        "Artificial Intelligence": "Intelligence artificielle",
        Programming: "Programmation",
        Mathematics: "Mathématiques",
        "Computer Science": "Informatique",
        Other: "Autre",

        Beginner: "Débutant",
        Intermediate: "Intermédiaire",
        Advanced: "Avancé",

        Preview: "Aperçu",
        "Course Preview": "Aperçu du cours",
        Lessons: "Leçons",
        "Student progress": "Progression des étudiants",

        "Back to Login": "Retour à la connexion"
    },

    ar: {
        dir: "rtl",

        Dashboard: "لوحة التحكم",
        "My Courses": "دوراتي",
        "Create Course": "إنشاء دورة",
        Students: "الطلاب",
        "Student Progress": "تقدم الطلاب",
        "Live Sessions": "الجلسات المباشرة",
        Resources: "الموارد",
        Settings: "الإعدادات",

        "Teacher Space": "مساحة الأستاذ",
        Teacher: "الأستاذ",
        Instructor: "المدرّس",

        MAIN: "الرئيسية",
        STUDENTS: "الطلاب",
        TEACHING: "التدريس",

        "Teacher Dashboard": "لوحة تحكم الأستاذ",
        "Welcome back,": "مرحبًا بعودتك،",
        "Keep your courses organized, follow your students' progress, and create a better learning experience.":
            "نظّم دوراتك، تابع تقدم طلابك، وأنشئ تجربة تعليمية أفضل.",

        "Create a Course": "إنشاء دورة",
        "Total Courses": "إجمالي الدورات",
        "Total Students": "إجمالي الطلاب",
        "Average Progress": "متوسط التقدم",
        "Course Performance": "أداء الدورات",
        "View all": "عرض الكل",
        "Student Insights": "تحليلات الطلاب",
        "Needs attention": "يحتاج إلى متابعة",
        "Positive progress": "تقدم إيجابي",
        "View Student Progress": "عرض تقدم الطلاب",
        "Recent Student Activity": "أحدث نشاط للطلاب",
        "View students": "عرض الطلاب",

        "My Students": "طلابي",
        "A quick overview of students learning with you.":
            "نظرة سريعة على الطلاب الذين يتعلمون معك.",
        "Student List": "قائمة الطلاب",
        "Search students...": "البحث عن الطلاب...",

        Analytics: "التحليلات",
        "Understand how students are progressing through your courses.":
            "تابع كيفية تقدم الطلاب في دوراتك.",
        Overall: "الإجمالي",
        "Learning Progress": "تقدم التعلم",
        "Course analysis": "تحليل الدورات",
        "Progress by Course": "التقدم حسب الدورة",

        "Organize upcoming learning sessions with your students.":
            "نظّم الجلسات التعليمية القادمة مع طلابك.",
        "New Session": "جلسة جديدة",
        Upcoming: "قادمة",
        View: "عرض",

        Library: "المكتبة",
        "Keep your teaching materials organized.":
            "نظّم موادك التعليمية.",
        "Add Resource": "إضافة مورد",

        Preferences: "التفضيلات",
        "Customize your teacher workspace.":
            "خصص مساحة الأستاذ الخاصة بك.",
        "Teacher Profile": "ملف الأستاذ",
        Notifications: "الإشعارات",
        "Receive updates about student activity.":
            "تلقي تحديثات حول نشاط الطلاب.",
        "AI Insights": "تحليلات الذكاء الاصطناعي",
        "Show learning insights on your dashboard.":
            "عرض تحليلات التعلم في لوحة التحكم.",
        "Compact Sidebar": "الشريط الجانبي المصغّر",
        "Use a smaller navigation sidebar.":
            "استخدم شريطًا جانبيًا أصغر.",

        Teaching: "التدريس",
        Create: "إنشاء",
        "Build a new learning experience for your students.":
            "أنشئ تجربة تعليمية جديدة لطلابك.",

        "Manage the courses you are teaching on Wassla.":
            "إدارة الدورات التي تدرّسها على Wassla.",

        "Course Title": "عنوان الدورة",
        Category: "التصنيف",
        Level: "المستوى",
        Description: "الوصف",
        "Number of Lessons": "عدد الدروس",
        "Estimated Duration": "المدة المتوقعة",

        "Select category": "اختر التصنيف",
        "Select level": "اختر المستوى",

        "Artificial Intelligence": "الذكاء الاصطناعي",
        Programming: "البرمجة",
        Mathematics: "الرياضيات",
        "Computer Science": "علوم الحاسوب",
        Other: "أخرى",

        Beginner: "مبتدئ",
        Intermediate: "متوسط",
        Advanced: "متقدم",

        Preview: "معاينة",
        "Course Preview": "معاينة الدورة",
        Lessons: "الدروس",
        "Student progress": "تقدم الطلاب",

        "Back to Login": "العودة إلى تسجيل الدخول"
    }
};

/* =========================================================
   LANGUAGE ELEMENT MAP
   ========================================================= */

const languageElements = [
    [".sidebar-brand .brand-text strong", "Wassla"],
    [".sidebar-brand .brand-text span", "Teacher Space"],
    [".profile-info strong", "Teacher"],
    [".profile-info span", "Instructor"],

    [".nav-label:nth-of-type(1)", "MAIN"],
    [".nav-label:nth-of-type(2)", "STUDENTS"],
    [".nav-label:nth-of-type(3)", "TEACHING"],

    ['[data-section="dashboard"] span', "Dashboard"],
    ['[data-section="courses"] span', "My Courses"],
    ['[data-section="create-course"] span', "Create Course"],
    ['[data-section="students"] span', "Students"],
    ['[data-section="progress"] span', "Student Progress"],
    ['[data-section="live-sessions"] span', "Live Sessions"],
    ['[data-section="resources"] span', "Resources"],
    ['[data-section="settings"] span', "Settings"],

    [".welcome-badge", "Teacher Dashboard"],
    [".welcome-content h2", "Welcome back,"],

    [".stat-card:nth-child(1) .stat-info span", "Total Courses"],
    [".stat-card:nth-child(2) .stat-info span", "Total Students"],
    [".stat-card:nth-child(3) .stat-info span", "Average Progress"],

    [".course-performance-card h3", "Course Performance"],
    [".course-performance-card .text-btn", "View all"],
    [".ai-insights-card h3", "Student Insights"],

    [".ai-insight:nth-of-type(1) strong", "Needs attention"],
    [".ai-insight:nth-of-type(2) strong", "Positive progress"],

    [".ai-insights-card .full-btn", "View Student Progress"],
    [".recent-activity-card h3", "Recent Student Activity"],

    ['#students .section-intro h2', "My Students"],
    ['#students .section-intro p', "A quick overview of students learning with you."],
    ["#students .card-header h3", "Student List"],

    ['#progress .section-intro .page-kicker', "Analytics"],
    ['#progress .section-intro h2', "Student Progress"],
    ['#progress .section-intro p', "Understand how students are progressing through your courses."],
    [".progress-main-card .card-kicker", "Overall"],
    [".progress-main-card h3", "Learning Progress"],
    [".progress-main-card p", "Average progress across your active courses."],
    [".progress-course-list + *", "Course analysis"],

    ['#live-sessions .section-intro .page-kicker', "Teaching"],
    ['#live-sessions .section-intro h2', "Live Sessions"],
    ['#live-sessions .section-intro p', "Organize upcoming learning sessions with your students."],
    ["#createSessionBtn", "New Session"],

    ['#resources .section-intro .page-kicker', "Library"],
    ['#resources .section-intro h2', "Resources"],
    ['#resources .section-intro p', "Keep your teaching materials organized."],
    ["#uploadResourceBtn", "Add Resource"],

    ['#settings .section-intro .page-kicker', "Preferences"],
    ['#settings .section-intro h2', "Settings"],
    ['#settings .section-intro p', "Customize your teacher workspace."],
    [".settings-profile h3", "Teacher Profile"],

    ['.setting-row:nth-of-type(1) strong', "Notifications"],
    ['.setting-row:nth-of-type(2) strong', "AI Insights"],
    ['.setting-row:nth-of-type(3) strong', "Compact Sidebar"],

    ['#courses .section-intro .page-kicker', "Teaching"],
    ['#courses .section-intro h2', "My Courses"],
    ['#courses .section-intro p', "Manage the courses you are teaching on Wassla."],

    ['#create-course .section-intro .page-kicker', "Create"],
    ['#create-course .section-intro h2', "Create a Course"],
    ['#create-course .section-intro p', "Build a new learning experience for your students."],

    ['label[for="courseTitle"]', "Course Title"],
    ['label[for="courseCategory"]', "Category"],
    ['label[for="courseLevel"]', "Level"],
    ['label[for="courseDescription"]', "Description"],
    ['label[for="lessonCount"]', "Number of Lessons"],
    ['label[for="courseDuration"]', "Estimated Duration"],

    ["#previewCourseBtn", "Preview"],
    [".modal-card .page-kicker", "Course Preview"],
    [".preview-details div:nth-child(1) span", "Category"],
    [".preview-details div:nth-child(2) span", "Level"],
    [".preview-details div:nth-child(3) span", "Lessons"],
    [".preview-details div:nth-child(4) span", "Duration"],

    [".logout-item span", "Back to Login"]
];

const originalLanguageTexts = new Map();

function translateElement(element, originalText, lang) {
    if (!element) return;

    if (!originalLanguageTexts.has(element)) {
        originalLanguageTexts.set(
            element,
            originalText
        );
    }

    const source =
        originalLanguageTexts.get(element);

    const translated =
        languageData[lang]?.[source];

    if (translated) {
        element.textContent = translated;
    } else {
        element.textContent = source;
    }
}

function translateInterface(lang) {
    const data =
        languageData[lang] ||
        languageData.en;

    document.documentElement.lang = lang;
    document.documentElement.dir = data.dir;

    document.body.dir = data.dir;

    if (lang === "ar") {
        document.body.classList.add("rtl-mode");
    } else {
        document.body.classList.remove("rtl-mode");
    }

    languageElements.forEach(
        ([selector, originalText]) => {
            const elements =
                $$(selector);

            elements.forEach((element) => {
                translateElement(
                    element,
                    originalText,
                    lang
                );
            });
        }
    );

    /* =========================
       FORM PLACEHOLDERS
    ========================== */

    const placeholders = {
        en: {
            courseTitle:
                "e.g. Machine Learning Fundamentals",
            courseDescription:
                "Describe what students will learn...",
            lessonCount: "10",
            courseDuration:
                "e.g. 6 weeks",
            studentSearch:
                "Search students..."
        },

        fr: {
            courseTitle:
                "ex. Fondamentaux du Machine Learning",
            courseDescription:
                "Décrivez ce que les étudiants vont apprendre...",
            lessonCount: "10",
            courseDuration:
                "ex. 6 semaines",
            studentSearch:
                "Rechercher des étudiants..."
        },

        ar: {
            courseTitle:
                "مثال: أساسيات تعلم الآلة",
            courseDescription:
                "صف ما سيتعلمه الطلاب...",
            lessonCount: "10",
            courseDuration:
                "مثال: 6 أسابيع",
            studentSearch:
                "البحث عن الطلاب..."
        }
    };

    const p =
        placeholders[lang];

    if ($("#courseTitle"))
        $("#courseTitle").placeholder =
            p.courseTitle;

    if ($("#courseDescription"))
        $("#courseDescription").placeholder =
            p.courseDescription;

    if ($("#lessonCount"))
        $("#lessonCount").placeholder =
            p.lessonCount;

    if ($("#courseDuration"))
        $("#courseDuration").placeholder =
            p.courseDuration;

    if ($("#studentSearch"))
        $("#studentSearch").placeholder =
            p.studentSearch;

    /* =========================
       SELECT OPTIONS
    ========================== */

    const categoryOptions = {
        en: [
            "Select category",
            "Artificial Intelligence",
            "Programming",
            "Mathematics",
            "Computer Science",
            "Other"
        ],
        fr: [
            "Sélectionner une catégorie",
            "Intelligence artificielle",
            "Programmation",
            "Mathématiques",
            "Informatique",
            "Autre"
        ],
        ar: [
            "اختر التصنيف",
            "الذكاء الاصطناعي",
            "البرمجة",
            "الرياضيات",
            "علوم الحاسوب",
            "أخرى"
        ]
    };

    const levelOptions = {
        en: [
            "Select level",
            "Beginner",
            "Intermediate",
            "Advanced"
        ],
        fr: [
            "Sélectionner un niveau",
            "Débutant",
            "Intermédiaire",
            "Avancé"
        ],
        ar: [
            "اختر المستوى",
            "مبتدئ",
            "متوسط",
            "متقدم"
        ]
    };

    function updateOptions(select, values) {
        if (!select) return;

        const currentValue =
            select.value;

        Array.from(
            select.options
        ).forEach((option, index) => {
            if (values[index]) {
                option.textContent =
                    values[index];
            }
        });

        select.value =
            currentValue;
    }

    updateOptions(
        $("#courseCategory"),
        categoryOptions[lang]
    );

    updateOptions(
        $("#courseLevel"),
        levelOptions[lang]
    );

    /* =========================
       PAGE TITLE
    ========================== */

    const activeSection =
        $(".page-section.active-section");

    if (activeSection && pageTitle) {
        const originalTitle =
            sectionTitles[
                activeSection.id
            ] || "Dashboard";

        pageTitle.textContent =
            languageData[lang]?.[
                originalTitle
            ] || originalTitle;
    }

    localStorage.setItem(
        "wassla_teacher_language",
        lang
    );
}

/* =========================================================
   LANGUAGE SELECT EVENT
   ========================================================= */

if (languageSelect) {
    const savedLanguage =
        localStorage.getItem(
            "wassla_teacher_language"
        ) || "en";

    languageSelect.value =
        ["en", "fr", "ar"].includes(
            savedLanguage
        )
            ? savedLanguage
            : "en";

    languageSelect.addEventListener(
        "change",
        () => {
            const selectedLanguage =
                languageSelect.value;

            translateInterface(
                selectedLanguage
            );

            if (
                selectedLanguage === "ar"
            ) {
                showToast(
                    "تم تغيير اللغة إلى العربية."
                );
            } else if (
                selectedLanguage === "fr"
            ) {
                showToast(
                    "La langue a été changée en français."
                );
            } else {
                showToast(
                    "Language changed to English."
                );
            }
        }
    );
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function closeSidebar() {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("show");
    overlay?.classList.remove("active");
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener(
        "click",
        () => {
            if (!sidebar) return;

            sidebar.classList.toggle("open");

            overlay?.classList.toggle("show");
            overlay?.classList.toggle("active");
        }
    );
}

overlay?.addEventListener(
    "click",
    closeSidebar
);

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionId) {
    if (!sectionId) return;

    const target =
        document.getElementById(sectionId);

    if (!target) return;

    sections.forEach((section) => {
        section.classList.remove(
            "active-section"
        );
        section.style.display = "none";
    });

    target.classList.add(
        "active-section"
    );

    target.style.display = "block";

    navItems.forEach((item) => {
        item.classList.toggle(
            "active",
            item.dataset.section ===
                sectionId
        );
    });

    const lang =
        languageSelect?.value || "en";

    const title =
        sectionTitles[sectionId] ||
        "Dashboard";

    if (pageTitle) {
        pageTitle.textContent =
            languageData[lang]?.[title] ||
            title;
    }

    closeSidebar();

    if (
        window.location.hash !==
        `#${sectionId}`
    ) {
        history.replaceState(
            null,
            "",
            `#${sectionId}`
        );
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navItems.forEach((item) => {
    item.addEventListener(
        "click",
        (event) => {
            event.preventDefault();

            showSection(
                item.dataset.section
            );
        }
    );
});

sectionButtons.forEach((button) => {
    button.addEventListener(
        "click",
        (event) => {
            event.preventDefault();

            showSection(
                button.dataset.sectionTarget
            );
        }
    );
});

function loadInitialSection() {
    const hash =
        window.location.hash.replace(
            "#",
            ""
        );

    if (
        hash &&
        document.getElementById(hash)
    ) {
        showSection(hash);
    } else {
        showSection("dashboard");
    }
}

window.addEventListener(
    "hashchange",
    loadInitialSection
);

/* =========================================================
   SEARCH
   ========================================================= */

searchBtn?.addEventListener(
    "click",
    () => {
        showSection("students");

        setTimeout(() => {
            studentSearch?.focus();
        }, 200);
    }
);

studentSearch?.addEventListener(
    "input",
    () => {
        const value =
            studentSearch.value
                .trim()
                .toLowerCase();

        $$(".students-table tbody tr")
            .forEach((row) => {
                row.style.display =
                    row.textContent
                        .toLowerCase()
                        .includes(value)
                        ? ""
                        : "none";
            });
    }
);

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

notificationBtn?.addEventListener(
    "click",
    () => {
        const lang =
            languageSelect?.value ||
            "en";

        if (lang === "ar") {
            showToast(
                "لديك إشعارات جديدة."
            );
        } else if (lang === "fr") {
            showToast(
                "Vous avez de nouvelles notifications."
            );
        } else {
            showToast(
                "You have new notifications."
            );
        }
    }
);

/* =========================================================
   COURSE STORAGE
   ========================================================= */

const STORAGE_KEY =
    "wassla_teacher_courses";

function getCourses() {
    try {
        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        return saved
            ? JSON.parse(saved)
            : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

function saveCourses(courses) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(courses)
        );
    } catch (error) {
        console.error(error);
    }
}

/* =========================================================
   COURSE ICON
   ========================================================= */

function getCourseIcon(category) {
    const value =
        String(category || "")
            .toLowerCase();

    if (
        value.includes("artificial") ||
        value.includes("intelligence") ||
        value.includes("ذكاء")
    ) {
        return "fa-brain";
    }

    if (
        value.includes("program") ||
        value.includes("programm") ||
        value.includes("برمج")
    ) {
        return "fa-code";
    }

    if (
        value.includes("math") ||
        value.includes("mathématique") ||
        value.includes("رياض")
    ) {
        return "fa-calculator";
    }

    if (
        value.includes("computer") ||
        value.includes("informatique") ||
        value.includes("حاسوب")
    ) {
        return "fa-laptop-code";
    }

    return "fa-book-open";
}

/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {
    const div =
        document.createElement("div");

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;
}

/* =========================================================
   COURSE CARD
   ========================================================= */

function createCourseCard(course) {
    const article =
        document.createElement("article");

    article.className =
        "course-card";

    article.dataset.courseId =
        course.id;

    const icon =
        getCourseIcon(
            course.category
        );

    article.innerHTML = `
        <div class="course-card-icon">
            <i class="fa-solid ${icon}"></i>
        </div>

        <div class="course-card-body">

            <span class="course-category">
                ${escapeHTML(course.category)}
            </span>

            <h3>
                ${escapeHTML(course.title)}
            </h3>

            <p>
                ${escapeHTML(course.description)}
            </p>

            <div class="course-meta">
                <span>
                    <i class="fa-solid fa-users"></i>
                    0 students
                </span>

                <span>
                    <i class="fa-solid fa-layer-group"></i>
                    ${escapeHTML(
                        String(
                            course.lessons ||
                                "—"
                        )
                    )} lessons
                </span>
            </div>

            <div class="course-progress">
                <div>
                    <span>Student progress</span>
                    <strong>0%</strong>
                </div>

                <div class="progress-bar">
                    <span style="width:0%;"></span>
                </div>
            </div>

            <small class="course-duration">
                <i class="fa-regular fa-clock"></i>
                ${escapeHTML(
                    String(
                        course.duration ||
                            "—"
                    )
                )}
            </small>

        </div>

        <button
            class="course-action"
            type="button"
            aria-label="Course options"
        >
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
    `;

    $(".course-action", article)
        ?.addEventListener(
            "click",
            () => {
                startEditingCourse(
                    course
                );
            }
        );

    return article;
}

/* =========================================================
   LOAD SAVED COURSES
   ========================================================= */

function loadSavedCourses() {
    if (!courseGrid) return;

    getCourses().forEach(
        (course) => {
            courseGrid.appendChild(
                createCourseCard(course)
            );
        }
    );
}

/* =========================================================
   COURSE COUNT
   ========================================================= */

function updateCourseCount() {
    const total =
        3 + getCourses().length;

    const element =
        document.querySelector(
            ".stats-grid .stat-card:first-child .stat-info strong"
        );

    if (element) {
        element.textContent =
            total;
    }
}

/* =========================================================
   FORM DATA
   ========================================================= */

function getCourseFormData() {
    return {
        title:
            $("#courseTitle")
                ?.value.trim() || "",

        category:
            $("#courseCategory")
                ?.value || "",

        level:
            $("#courseLevel")
                ?.value || "",

        description:
            $("#courseDescription")
                ?.value.trim() || "",

        lessons:
            $("#lessonCount")
                ?.value || "",

        duration:
            $("#courseDuration")
                ?.value.trim() || ""
    };
}

/* =========================================================
   PREVIEW
   ========================================================= */

function openPreview() {
    if (!previewModal) return;

    const course =
        getCourseFormData();

    if (!course.title) {
        showToast(
            "Please enter a course title."
        );
        $("#courseTitle")?.focus();
        return;
    }

    $("#previewTitle").textContent =
        course.title;

    $("#previewDescription").textContent =
        course.description ||
        "No description provided.";

    $("#previewCategory").textContent =
        course.category || "—";

    $("#previewLevel").textContent =
        course.level || "—";

    $("#previewLessons").textContent =
        course.lessons
            ? `${course.lessons} lessons`
            : "—";

    $("#previewDuration").textContent =
        course.duration || "—";

    previewModal.classList.add("show");

    previewModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closePreview() {
    previewModal?.classList.remove(
        "show"
    );

    previewModal?.setAttribute(
        "aria-hidden",
        "true"
    );
}

previewCourseBtn?.addEventListener(
    "click",
    openPreview
);

closePreviewBtn?.addEventListener(
    "click",
    closePreview
);

previewModal?.addEventListener(
    "click",
    (event) => {
        if (
            event.target ===
            previewModal
        ) {
            closePreview();
        }
    }
);

/* =========================================================
   EDIT COURSE
   ========================================================= */

let editingCourseId = null;

function setFormMode(editing) {
    const button =
        courseForm?.querySelector(
            'button[type="submit"]'
        );

    if (!button) return;

    if (editing) {
        button.innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Save Changes';
    } else {
        button.innerHTML =
            '<i class="fa-solid fa-plus"></i> Create Course';
    }
}

function startEditingCourse(course) {
    editingCourseId =
        Number(course.id);

    $("#courseTitle").value =
        course.title || "";

    $("#courseCategory").value =
        course.category || "";

    $("#courseLevel").value =
        course.level || "";

    $("#courseDescription").value =
        course.description || "";

    $("#lessonCount").value =
        course.lessons || "";

    $("#courseDuration").value =
        course.duration || "";

    setFormMode(true);

    showSection(
        "create-course"
    );

    showToast(
        "Course loaded for editing."
    );
}

/* =========================================================
   CREATE / UPDATE COURSE
   ========================================================= */

courseForm?.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        const course =
            getCourseFormData();

        if (!course.title) {
            showToast(
                "Please enter a course title."
            );
            $("#courseTitle")?.focus();
            return;
        }

        if (!course.category) {
            showToast(
                "Please select a category."
            );
            $("#courseCategory")?.focus();
            return;
        }

        if (!course.level) {
            showToast(
                "Please select a level."
            );
            $("#courseLevel")?.focus();
            return;
        }

        if (!course.description) {
            showToast(
                "Please enter a course description."
            );
            $("#courseDescription")?.focus();
            return;
        }

        if (!course.lessons) {
            showToast(
                "Please enter the number of lessons."
            );
            $("#lessonCount")?.focus();
            return;
        }

        if (!course.duration) {
            showToast(
                "Please enter the estimated duration."
            );
            $("#courseDuration")?.focus();
            return;
        }

        const courses =
            getCourses();

        /* UPDATE */

        if (editingCourseId !== null) {
            const index =
                courses.findIndex(
                    (item) =>
                        Number(item.id) ===
                        Number(
                            editingCourseId
                        )
                );

            if (index !== -1) {
                courses[index] = {
                    ...courses[index],
                    ...course,
                    updatedAt:
                        new Date().toISOString()
                };

                saveCourses(courses);

                const oldCard =
                    courseGrid?.querySelector(
                        `[data-course-id="${editingCourseId}"]`
                    );

                oldCard?.replaceWith(
                    createCourseCard(
                        courses[index]
                    )
                );

                editingCourseId = null;

                setFormMode(false);

                courseForm.reset();

                closePreview();

                showToast(
                    "Course updated successfully!"
                );

                setTimeout(() => {
                    showSection(
                        "courses"
                    );
                }, 500);

                return;
            }
        }

        /* CREATE */

        const newCourse = {
            id: Date.now(),
            ...course,
            createdAt:
                new Date().toISOString()
        };

        courses.push(newCourse);

        saveCourses(courses);

        courseGrid?.appendChild(
            createCourseCard(
                newCourse
            )
        );

        updateCourseCount();

        courseForm.reset();

        closePreview();

        setFormMode(false);

        showToast(
            "Course created successfully!"
        );

        setTimeout(() => {
            showSection("courses");
        }, 600);
    }
);

/* =========================================================
   STATIC COURSE BUTTONS
   ========================================================= */

$$(".course-grid .course-card")
    .forEach((card) => {
        if (card.dataset.courseId)
            return;

        $(".course-action", card)
            ?.addEventListener(
                "click",
                () => {
                    showToast(
                        "This sample course is part of the prototype."
                    );
                }
            );
    });

/* =========================================================
   LIVE SESSIONS
   ========================================================= */

$("#createSessionBtn")
    ?.addEventListener(
        "click",
        () => {
            showToast(
                "New session creation is ready."
            );
        }
    );

/* =========================================================
   RESOURCES
   ========================================================= */

$("#uploadResourceBtn")
    ?.addEventListener(
        "click",
        () => {
            showToast(
                "Add Resource selected."
            );
        }
    );

/* =========================================================
   COMPACT SIDEBAR
   ========================================================= */

compactSidebarToggle?.addEventListener(
    "change",
    () => {
        sidebar?.classList.toggle(
            "compact",
            compactSidebarToggle.checked
        );

        showToast(
            compactSidebarToggle.checked
                ? "Compact sidebar enabled."
                : "Compact sidebar disabled."
        );
    }
);

/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Escape") {
            closeSidebar();
            closePreview();
        }
    }
);

/* =========================================================
   INITIALIZE
   ========================================================= */

loadSavedCourses();
updateCourseCount();
loadInitialSection();

const initialLanguage =
    languageSelect?.value || "en";

translateInterface(
    initialLanguage
);

console.log(
    "Wassla Teacher Dashboard initialized successfully."
);
```

});

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
   LANGUAGE
   ========================================================= */

const translations = {
    en: {
        "Dashboard": "Dashboard",
        "My Courses": "My Courses",
        "Create Course": "Create Course",
        "Students": "Students",
        "Student Progress": "Student Progress",
        "Live Sessions": "Live Sessions",
        "Resources": "Resources",
        "Settings": "Settings",

        "Teacher Space": "Teacher Space",
        "Teacher": "Teacher",
        "Instructor": "Instructor",
        "MAIN": "MAIN",
        "STUDENTS": "STUDENTS",
        "TEACHING": "TEACHING",

        "Welcome back,": "Welcome back,",
        "Teacher Dashboard": "Teacher Dashboard",
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

        "Analytics": "Analytics",
        "Understand how students are progressing through your courses.":
            "Understand how students are progressing through your courses.",
        "Learning Progress": "Learning Progress",
        "Overall": "Overall",
        "Course analysis": "Course analysis",
        "Progress by Course": "Progress by Course",

        "Organize upcoming learning sessions with your students.":
            "Organize upcoming learning sessions with your students.",
        "New Session": "New Session",
        "Upcoming": "Upcoming",
        "View": "View",

        "Library": "Library",
        "Keep your teaching materials organized.":
            "Keep your teaching materials organized.",
        "Add Resource": "Add Resource",

        "Preferences": "Preferences",
        "Customize your teacher workspace.":
            "Customize your teacher workspace.",
        "Teacher Profile": "Teacher Profile",
        "Notifications": "Notifications",
        "Receive updates about student activity.":
            "Receive updates about student activity.",
        "AI Insights": "AI Insights",
        "Show learning insights on your dashboard.":
            "Show learning insights on your dashboard.",
        "Compact Sidebar": "Compact Sidebar",
        "Use a smaller navigation sidebar.":
            "Use a smaller navigation sidebar.",

        "Teaching": "Teaching",
        "Manage the courses you are teaching on Wassla.":
            "Manage the courses you are teaching on Wassla.",
        "Create": "Create",
        "Build a new learning experience for your students.":
            "Build a new learning experience for your students.",

        "Course Title": "Course Title",
        "Category": "Category",
        "Level": "Level",
        "Description": "Description",
        "Number of Lessons": "Number of Lessons",
        "Estimated Duration": "Estimated Duration",
        "Preview": "Preview",

        "Select category": "Select category",
        "Select level": "Select level",

        "Artificial Intelligence": "Artificial Intelligence",
        "Programming": "Programming",
        "Mathematics": "Mathematics",
        "Computer Science": "Computer Science",
        "Other": "Other",

        "Beginner": "Beginner",
        "Intermediate": "Intermediate",
        "Advanced": "Advanced",

        "Course Preview": "Course Preview",
        "Lessons": "Lessons",
        "Student progress": "Student progress",

        "Back to Login": "Back to Login"
    },

    fr: {
        "Dashboard": "Tableau de bord",
        "My Courses": "Mes cours",
        "Create Course": "Créer un cours",
        "Students": "Étudiants",
        "Student Progress": "Progression des étudiants",
        "Live Sessions": "Sessions en direct",
        "Resources": "Ressources",
        "Settings": "Paramètres",

        "Teacher Space": "Espace enseignant",
        "Teacher": "Enseignant",
        "Instructor": "Formateur",
        "MAIN": "PRINCIPAL",
        "STUDENTS": "ÉTUDIANTS",
        "TEACHING": "ENSEIGNEMENT",

        "Welcome back,": "Bon retour,",
        "Teacher Dashboard": "Tableau de bord enseignant",
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
        "Student List": "Liste des étudiants",
        "Search students...": "Rechercher des étudiants...",

        "Analytics": "Analytique",
        "Learning Progress": "Progression d'apprentissage",
        "Overall": "Global",
        "Course analysis": "Analyse des cours",
        "Progress by Course": "Progression par cours",

        "Teaching": "Enseignement",
        "New Session": "Nouvelle session",
        "Upcoming": "À venir",
        "View": "Voir",

        "Library": "Bibliothèque",
        "Add Resource": "Ajouter une ressource",

        "Preferences": "Préférences",
        "Customize your teacher workspace.":
            "Personnalisez votre espace enseignant.",
        "Teacher Profile": "Profil enseignant",
        "Notifications": "Notifications",
        "AI Insights": "Analyses IA",
        "Compact Sidebar": "Barre latérale compacte",

        "Create": "Créer",
        "Course Title": "Titre du cours",
        "Category": "Catégorie",
        "Level": "Niveau",
        "Description": "Description",
        "Number of Lessons": "Nombre de leçons",
        "Estimated Duration": "Durée estimée",
        "Preview": "Aperçu",

        "Select category": "Sélectionner une catégorie",
        "Select level": "Sélectionner un niveau",

        "Artificial Intelligence": "Intelligence artificielle",
        "Programming": "Programmation",
        "Mathematics": "Mathématiques",
        "Computer Science": "Informatique",
        "Other": "Autre",

        "Beginner": "Débutant",
        "Intermediate": "Intermédiaire",
        "Advanced": "Avancé",

        "Course Preview": "Aperçu du cours",
        "Lessons": "Leçons",
        "Student progress": "Progression des étudiants",

        "Back to Login": "Retour à la connexion"
    },

    ar: {
        "Dashboard": "لوحة التحكم",
        "My Courses": "دوراتي",
        "Create Course": "إنشاء دورة",
        "Students": "الطلاب",
        "Student Progress": "تقدم الطلاب",
        "Live Sessions": "الجلسات المباشرة",
        "Resources": "الموارد",
        "Settings": "الإعدادات",

        "Teacher Space": "مساحة الأستاذ",
        "Teacher": "الأستاذ",
        "Instructor": "المدرّس",
        "MAIN": "الرئيسية",
        "STUDENTS": "الطلاب",
        "TEACHING": "التدريس",

        "Welcome back,": "مرحبًا بعودتك،",
        "Teacher Dashboard": "لوحة تحكم الأستاذ",
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
        "Student List": "قائمة الطلاب",
        "Search students...": "البحث عن الطلاب...",

        "Analytics": "التحليلات",
        "Learning Progress": "تقدم التعلم",
        "Overall": "الإجمالي",
        "Course analysis": "تحليل الدورات",
        "Progress by Course": "التقدم حسب الدورة",

        "Teaching": "التدريس",
        "New Session": "جلسة جديدة",
        "Upcoming": "قادمة",
        "View": "عرض",

        "Library": "المكتبة",
        "Add Resource": "إضافة مورد",

        "Preferences": "التفضيلات",
        "Customize your teacher workspace.":
            "خصص مساحة الأستاذ الخاصة بك.",
        "Teacher Profile": "ملف الأستاذ",
        "Notifications": "الإشعارات",
        "AI Insights": "تحليلات الذكاء الاصطناعي",
        "Compact Sidebar": "الشريط الجانبي المصغّر",

        "Create": "إنشاء",
        "Course Title": "عنوان الدورة",
        "Category": "التصنيف",
        "Level": "المستوى",
        "Description": "الوصف",
        "Number of Lessons": "عدد الدروس",
        "Estimated Duration": "المدة المتوقعة",
        "Preview": "معاينة",

        "Select category": "اختر التصنيف",
        "Select level": "اختر المستوى",

        "Artificial Intelligence": "الذكاء الاصطناعي",
        "Programming": "البرمجة",
        "Mathematics": "الرياضيات",
        "Computer Science": "علوم الحاسوب",
        "Other": "أخرى",

        "Beginner": "مبتدئ",
        "Intermediate": "متوسط",
        "Advanced": "متقدم",

        "Course Preview": "معاينة الدورة",
        "Lessons": "الدروس",
        "Student progress": "تقدم الطلاب",

        "Back to Login": "العودة إلى تسجيل الدخول"
    }
};

const originalTexts = new WeakMap();

function translateElement(element, lang) {
    if (!element) return;

    if (!originalTexts.has(element)) {
        originalTexts.set(
            element,
            element.textContent.trim()
        );
    }

    const original =
        originalTexts.get(element);

    if (
        translations[lang] &&
        translations[lang][original]
    ) {
        element.textContent =
            translations[lang][original];
    } else if (lang === "en") {
        element.textContent = original;
    }
}

function translateTextNodes(lang) {
    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
        const parent = node.parentElement;

        if (!parent) return;

        if (
            ["SCRIPT", "STYLE", "OPTION"].includes(
                parent.tagName
            )
        ) {
            return;
        }

        const original =
            node.nodeValue.trim();

        if (!original) return;

        if (!node._wasslaOriginal) {
            node._wasslaOriginal = original;
        }

        const source =
            node._wasslaOriginal;

        const translated =
            translations[lang]?.[source];

        if (translated) {
            node.nodeValue =
                node.nodeValue.replace(
                    source,
                    translated
                );
        } else if (lang === "en") {
            node.nodeValue =
                node.nodeValue.replace(
                    source,
                    source
                );
        }
    });

    translatePlaceholders(lang);
}

function translatePlaceholders(lang) {
    const placeholderTranslations = {
        fr: {
            "Search students...":
                "Rechercher des étudiants...",
            "e.g. Machine Learning Fundamentals":
                "ex. Fondamentaux du Machine Learning",
            "Describe what students will learn...":
                "Décrivez ce que les étudiants vont apprendre...",
            "10": "10",
            "e.g. 6 weeks": "ex. 6 semaines"
        },
        ar: {
            "Search students...":
                "البحث عن الطلاب...",
            "e.g. Machine Learning Fundamentals":
                "مثال: أساسيات تعلم الآلة",
            "Describe what students will learn...":
                "صف ما سيتعلمه الطلاب...",
            "10": "10",
            "e.g. 6 weeks": "مثال: 6 أسابيع"
        }
    };

    $$("[placeholder]").forEach((element) => {
        const original =
            element.dataset.wasslaPlaceholder ||
            element.getAttribute("placeholder");

        element.dataset.wasslaPlaceholder =
            original;

        const translated =
            placeholderTranslations[lang]?.[original];

        element.setAttribute(
            "placeholder",
            translated || original
        );
    });
}

function applyLanguage(lang) {
    if (!translations[lang]) {
        lang = "en";
    }

    document.documentElement.lang = lang;

    if (lang === "ar") {
        document.documentElement.dir = "rtl";
        document.body.classList.add("rtl-mode");
    } else {
        document.documentElement.dir = "ltr";
        document.body.classList.remove("rtl-mode");
    }

    translateTextNodes(lang);

    if (pageTitle) {
        const activeSection =
            $(".page-section.active-section");

        if (activeSection) {
            const id = activeSection.id;
            const original =
                sectionTitles[id] || "Dashboard";

            pageTitle.textContent =
                translations[lang]?.[original] ||
                original;
        }
    }

    localStorage.setItem(
        "wassla_teacher_language",
        lang
    );
}

if (languageSelect) {
    const savedLanguage =
        localStorage.getItem(
            "wassla_teacher_language"
        ) || "en";

    languageSelect.value =
        translations[savedLanguage]
            ? savedLanguage
            : "en";

    languageSelect.addEventListener(
        "change",
        () => {
            applyLanguage(
                languageSelect.value
            );

            const languageName = {
                en: "English",
                fr: "Français",
                ar: "العربية"
            };

            showToast(
                languageSelect.value === "ar"
                    ? "تم تغيير اللغة إلى العربية."
                    : languageSelect.value === "fr"
                    ? "La langue a été changée en français."
                    : "Language changed to English."
            );
        }
    );
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
        overlay.classList.remove("active");
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        if (!sidebar) return;

        sidebar.classList.toggle("open");

        if (overlay) {
            overlay.classList.toggle("show");
            overlay.classList.toggle("active");
        }
    });
}

if (overlay) {
    overlay.addEventListener(
        "click",
        closeSidebar
    );
}

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionId) {
    if (!sectionId) return;

    const target =
        document.getElementById(sectionId);

    if (!target) {
        console.warn(
            "Wassla: section not found:",
            sectionId
        );
        return;
    }

    sections.forEach((section) => {
        section.classList.remove(
            "active-section"
        );
        section.style.display = "none";
    });

    target.classList.add("active-section");
    target.style.display = "block";

    navItems.forEach((item) => {
        item.classList.toggle(
            "active",
            item.dataset.section === sectionId
        );
    });

    const currentLanguage =
        languageSelect?.value || "en";

    const title =
        sectionTitles[sectionId] ||
        "Teacher Dashboard";

    if (pageTitle) {
        pageTitle.textContent =
            translations[currentLanguage]?.[title] ||
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
                item.getAttribute(
                    "data-section"
                )
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
                button.getAttribute(
                    "data-section-target"
                )
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

if (searchBtn) {
    searchBtn.addEventListener(
        "click",
        () => {
            showSection("students");

            setTimeout(() => {
                if (studentSearch) {
                    studentSearch.focus();
                }
            }, 200);
        }
    );
}

if (studentSearch) {
    studentSearch.addEventListener(
        "input",
        () => {
            const value =
                studentSearch.value
                    .trim()
                    .toLowerCase();

            const rows =
                $$(".students-table tbody tr");

            rows.forEach((row) => {
                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(value)
                        ? ""
                        : "none";
            });
        }
    );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

if (notificationBtn) {
    notificationBtn.addEventListener(
        "click",
        () => {
            const lang =
                languageSelect?.value || "en";

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
}

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
        console.error(
            "Wassla: could not load courses.",
            error
        );

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
        console.error(
            "Wassla: could not save courses.",
            error
        );
    }
}

/* =========================================================
   COURSE ICON
   ========================================================= */

function getCourseIcon(category) {
    const value =
        String(category || "").toLowerCase();

    if (value.includes("artificial")) {
        return "fa-brain";
    }

    if (value.includes("program")) {
        return "fa-code";
    }

    if (value.includes("math")) {
        return "fa-calculator";
    }

    if (value.includes("computer")) {
        return "fa-laptop-code";
    }

    return "fa-book-open";
}

/* =========================================================
   EDIT MODE
   ========================================================= */

let editingCourseId = null;

function setFormMode(isEditing) {
    const submitButton =
        courseForm?.querySelector(
            'button[type="submit"]'
        );

    if (!submitButton) return;

    if (isEditing) {
        submitButton.innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Save Changes';
    } else {
        submitButton.innerHTML =
            '<i class="fa-solid fa-plus"></i> Create Course';
    }
}

function startEditingCourse(course) {
    if (!courseForm) return;

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

    showSection("create-course");

    setTimeout(() => {
        $("#courseTitle")?.focus();
    }, 250);

    showToast(
        "Course loaded for editing."
    );
}

function cancelEditing() {
    editingCourseId = null;

    if (courseForm) {
        courseForm.reset();
    }

    setFormMode(false);
}

/* =========================================================
   CREATE COURSE CARD
   ========================================================= */

function createCourseCard(course) {
    const article =
        document.createElement("article");

    article.className = "course-card";

    article.dataset.courseId =
        course.id;

    const icon =
        getCourseIcon(course.category);

    const lessons =
        course.lessons || "—";

    const duration =
        course.duration || "—";

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
                        String(lessons)
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
                    String(duration)
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

    const actionButton =
        $(".course-action", article);

    if (actionButton) {
        actionButton.addEventListener(
            "click",
            () => {
                startEditingCourse(course);
            }
        );
    }

    return article;
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
   LOAD SAVED COURSES
   ========================================================= */

function loadSavedCourses() {
    if (!courseGrid) return;

    const courses =
        getCourses();

    courses.forEach((course) => {
        courseGrid.appendChild(
            createCourseCard(course)
        );
    });
}

/* =========================================================
   UPDATE COURSE COUNT
   ========================================================= */

function updateCourseCount() {
    const savedCourses =
        getCourses();

    const defaultCourses = 3;

    const total =
        defaultCourses +
        savedCourses.length;

    const totalCoursesElement =
        document.querySelector(
            ".stats-grid .stat-card:first-child .stat-info strong"
        );

    if (totalCoursesElement) {
        totalCoursesElement.textContent =
            total;
    }
}

/* =========================================================
   COURSE PREVIEW
   ========================================================= */

function getCourseFormData() {
    return {
        title:
            $("#courseTitle")?.value.trim() ||
            "",

        category:
            $("#courseCategory")?.value ||
            "",

        level:
            $("#courseLevel")?.value ||
            "",

        description:
            $("#courseDescription")?.value.trim() ||
            "",

        lessons:
            $("#lessonCount")?.value ||
            "",

        duration:
            $("#courseDuration")?.value.trim() ||
            ""
    };
}

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
    if (!previewModal) return;

    previewModal.classList.remove(
        "show"
    );

    previewModal.setAttribute(
        "aria-hidden",
        "true"
    );
}

if (previewCourseBtn) {
    previewCourseBtn.addEventListener(
        "click",
        openPreview
    );
}

if (closePreviewBtn) {
    closePreviewBtn.addEventListener(
        "click",
        closePreview
    );
}

if (previewModal) {
    previewModal.addEventListener(
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
}

/* =========================================================
   CREATE / UPDATE COURSE
   ========================================================= */

if (courseForm) {
    courseForm.addEventListener(
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

            /* =========================
               UPDATE EXISTING COURSE
            ========================== */

            if (editingCourseId !== null) {
                const index =
                    courses.findIndex(
                        (item) =>
                            Number(item.id) ===
                            Number(editingCourseId)
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

                    if (oldCard) {
                        oldCard.replaceWith(
                            createCourseCard(
                                courses[index]
                            )
                        );
                    }

                    editingCourseId =
                        null;

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

            /* =========================
               CREATE NEW COURSE
            ========================== */

            const newCourse = {
                id: Date.now(),
                ...course,
                createdAt:
                    new Date().toISOString()
            };

            courses.push(newCourse);

            saveCourses(courses);

            if (courseGrid) {
                courseGrid.appendChild(
                    createCourseCard(
                        newCourse
                    )
                );
            }

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
}

/* =========================================================
   EXISTING STATIC COURSE ACTIONS
   ========================================================= */

$$(".course-grid .course-card").forEach(
    (card) => {
        if (
            card.dataset.courseId
        ) {
            return;
        }

        const button =
            $(".course-action", card);

        if (!button) return;

        button.addEventListener(
            "click",
            () => {
                showToast(
                    "This sample course is part of the prototype."
                );
            }
        );
    }
);

/* =========================================================
   LIVE SESSIONS
   ========================================================= */

const createSessionBtn =
    $("#createSessionBtn");

if (createSessionBtn) {
    createSessionBtn.addEventListener(
        "click",
        () => {
            showToast(
                "New session creation is ready."
            );
        }
    );
}

/* =========================================================
   RESOURCE
   ========================================================= */

const uploadResourceBtn =
    $("#uploadResourceBtn");

if (uploadResourceBtn) {
    uploadResourceBtn.addEventListener(
        "click",
        () => {
            showToast(
                "Add Resource selected."
            );
        }
    );
}

/* =========================================================
   COMPACT SIDEBAR
   ========================================================= */

if (compactSidebarToggle) {
    compactSidebarToggle.addEventListener(
        "change",
        () => {
            if (sidebar) {
                sidebar.classList.toggle(
                    "compact",
                    compactSidebarToggle.checked
                );
            }

            showToast(
                compactSidebarToggle.checked
                    ? "Compact sidebar enabled."
                    : "Compact sidebar disabled."
            );
        }
    );
}

/* =========================================================
   KEYBOARD
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

applyLanguage(
    languageSelect?.value || "en"
);

console.log(
    "Wassla Teacher Dashboard initialized successfully."
);
```

});

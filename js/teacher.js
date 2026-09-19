/* =========================================================
   WASSLA — TEACHER DASHBOARD
   Frontend Prototype
   EN / FR / AR Language Switching
   Course Creation + Preview + LocalStorage
   No Delete
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

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
       LANGUAGE SYSTEM
       ========================================================= */

    const LANGUAGE_KEY = "wassla_teacher_language";

    const translations = {

        /* ---------------- ENGLISH ---------------- */

        en: {
            "Dashboard": "Dashboard",
            "My Courses": "My Courses",
            "Create Course": "Create Course",
            "Students": "Students",
            "Student Progress": "Student Progress",
            "Live Sessions": "Live Sessions",
            "Resources": "Resources",
            "Settings": "Settings",

            "Teacher Dashboard": "Teacher Dashboard",
            "Welcome back, Teacher!": "Welcome back, Teacher!",
            "Keep your courses organized and track your students' progress.":
                "Keep your courses organized and track your students' progress.",

            "Create a Course": "Create a Course",
            "Teacher / Instructor": "Teacher / Instructor",

            "Average Progress": "Average Progress",
            "Total Students": "Total Students",
            "Total Courses": "Total Courses",

            "Course Title": "Course Title",
            "Category": "Category",
            "Level": "Level",
            "Description": "Description",
            "Number of Lessons": "Number of Lessons",
            "Duration": "Duration",

            "Programming": "Programming",
            "Artificial Intelligence": "Artificial Intelligence",
            "Mathematics": "Mathematics",
            "Computer Science": "Computer Science",

            "Beginner": "Beginner",
            "Intermediate": "Intermediate",
            "Advanced": "Advanced",

            "Preview": "Preview",
            "Create Course": "Create Course",
            "Cancel": "Cancel",
            "Save Changes": "Save Changes",

            "Course options": "Course options",
            "Course Options": "Course Options",
            "Edit Course": "Edit Course",

            "0 students": "0 students",
            "students": "students",
            "lessons": "lessons",

            "Student progress": "Student progress",
            "Average progress": "Average progress",

            "Create Session": "Create Session",
            "Add Resource": "Add Resource",
            "Profile": "Profile",
            "Notifications": "Notifications",
            "Language": "Language",
            "Logout": "Logout",

            "Search students...": "Search students...",

            "No description provided.": "No description provided.",

            "Please enter a course title.":
                "Please enter a course title.",

            "Please select a category.":
                "Please select a category.",

            "Please select a level.":
                "Please select a level.",

            "Please enter a course description.":
                "Please enter a course description.",

            "Please enter the number of lessons.":
                "Please enter the number of lessons.",

            "Please enter the estimated duration.":
                "Please enter the estimated duration.",

            "Course created successfully!":
                "Course created successfully!",

            "You have new notifications.":
                "You have new notifications.",

            "Course options selected.":
                "Course options selected.",

            "New session creation is ready.":
                "New session creation is ready.",

            "Add Resource selected.":
                "Add Resource selected.",

            "Compact sidebar enabled.":
                "Compact sidebar enabled.",

            "Compact sidebar disabled.":
                "Compact sidebar disabled.",

            "Language changed to":
                "Language changed to",

            "Course is ready to manage.":
                "Course is ready to manage."
        },

        /* ---------------- FRENCH ---------------- */

        fr: {
            "Dashboard": "Tableau de bord",
            "My Courses": "Mes cours",
            "Create Course": "Créer un cours",
            "Students": "Étudiants",
            "Student Progress": "Progression des étudiants",
            "Live Sessions": "Sessions en direct",
            "Resources": "Ressources",
            "Settings": "Paramètres",

            "Teacher Dashboard": "Tableau de bord enseignant",
            "Welcome back, Teacher!":
                "Bon retour, enseignant !",

            "Keep your courses organized and track your students' progress.":
                "Organisez vos cours et suivez la progression de vos étudiants.",

            "Create a Course": "Créer un cours",
            "Teacher / Instructor": "Enseignant / Formateur",

            "Average Progress": "Progression moyenne",
            "Total Students": "Nombre total d'étudiants",
            "Total Courses": "Nombre total de cours",

            "Course Title": "Titre du cours",
            "Category": "Catégorie",
            "Level": "Niveau",
            "Description": "Description",
            "Number of Lessons": "Nombre de leçons",
            "Duration": "Durée",

            "Programming": "Programmation",
            "Artificial Intelligence": "Intelligence artificielle",
            "Mathematics": "Mathématiques",
            "Computer Science": "Informatique",

            "Beginner": "Débutant",
            "Intermediate": "Intermédiaire",
            "Advanced": "Avancé",

            "Preview": "Aperçu",
            "Cancel": "Annuler",
            "Save Changes": "Enregistrer les modifications",

            "Course options": "Options du cours",
            "Course Options": "Options du cours",
            "Edit Course": "Modifier le cours",

            "0 students": "0 étudiants",
            "students": "étudiants",
            "lessons": "leçons",

            "Student progress": "Progression des étudiants",
            "Average progress": "Progression moyenne",

            "Create Session": "Créer une session",
            "Add Resource": "Ajouter une ressource",
            "Profile": "Profil",
            "Notifications": "Notifications",
            "Language": "Langue",
            "Logout": "Déconnexion",

            "Search students...": "Rechercher des étudiants...",

            "No description provided.":
                "Aucune description fournie.",

            "Please enter a course title.":
                "Veuillez saisir le titre du cours.",

            "Please select a category.":
                "Veuillez sélectionner une catégorie.",

            "Please select a level.":
                "Veuillez sélectionner un niveau.",

            "Please enter a course description.":
                "Veuillez saisir une description du cours.",

            "Please enter the number of lessons.":
                "Veuillez saisir le nombre de leçons.",

            "Please enter the estimated duration.":
                "Veuillez saisir la durée estimée.",

            "Course created successfully!":
                "Cours créé avec succès !",

            "You have new notifications.":
                "Vous avez de nouvelles notifications.",

            "Course options selected.":
                "Options du cours sélectionnées.",

            "New session creation is ready.":
                "La création d'une nouvelle session est prête.",

            "Add Resource selected.":
                "Ajout de ressource sélectionné.",

            "Compact sidebar enabled.":
                "Barre latérale compacte activée.",

            "Compact sidebar disabled.":
                "Barre latérale compacte désactivée.",

            "Language changed to":
                "Langue changée en",

            "Course is ready to manage.":
                "Le cours est prêt à être géré."
        },

        /* ---------------- ARABIC ---------------- */

        ar: {
            "Dashboard": "لوحة التحكم",
            "My Courses": "دوراتي",
            "Create Course": "إنشاء دورة",
            "Students": "الطلاب",
            "Student Progress": "تقدم الطلاب",
            "Live Sessions": "الجلسات المباشرة",
            "Resources": "الموارد",
            "Settings": "الإعدادات",

            "Teacher Dashboard": "لوحة تحكم المعلم",

            "Welcome back, Teacher!":
                "مرحبًا بعودتك، أيها المعلم!",

            "Keep your courses organized and track your students' progress.":
                "نظّم دوراتك وتابع تقدم طلابك.",

            "Create a Course": "إنشاء دورة",

            "Teacher / Instructor":
                "المعلم / المدرّس",

            "Average Progress":
                "متوسط التقدم",

            "Total Students":
                "إجمالي الطلاب",

            "Total Courses":
                "إجمالي الدورات",

            "Course Title":
                "عنوان الدورة",

            "Category":
                "الفئة",

            "Level":
                "المستوى",

            "Description":
                "الوصف",

            "Number of Lessons":
                "عدد الدروس",

            "Duration":
                "المدة",

            "Programming":
                "البرمجة",

            "Artificial Intelligence":
                "الذكاء الاصطناعي",

            "Mathematics":
                "الرياضيات",

            "Computer Science":
                "علوم الحاسوب",

            "Beginner":
                "مبتدئ",

            "Intermediate":
                "متوسط",

            "Advanced":
                "متقدم",

            "Preview":
                "معاينة",

            "Cancel":
                "إلغاء",

            "Save Changes":
                "حفظ التغييرات",

            "Course options":
                "خيارات الدورة",

            "Course Options":
                "خيارات الدورة",

            "Edit Course":
                "تعديل الدورة",

            "0 students":
                "0 طالب",

            "students":
                "طلاب",

            "lessons":
                "دروس",

            "Student progress":
                "تقدم الطلاب",

            "Average progress":
                "متوسط التقدم",

            "Create Session":
                "إنشاء جلسة",

            "Add Resource":
                "إضافة مورد",

            "Profile":
                "الملف الشخصي",

            "Notifications":
                "الإشعارات",

            "Language":
                "اللغة",

            "Logout":
                "تسجيل الخروج",

            "Search students...":
                "ابحث عن الطلاب...",

            "No description provided.":
                "لم يتم تقديم وصف.",

            "Please enter a course title.":
                "يرجى إدخال عنوان الدورة.",

            "Please select a category.":
                "يرجى اختيار الفئة.",

            "Please select a level.":
                "يرجى اختيار المستوى.",

            "Please enter a course description.":
                "يرجى إدخال وصف الدورة.",

            "Please enter the number of lessons.":
                "يرجى إدخال عدد الدروس.",

            "Please enter the estimated duration.":
                "يرجى إدخال المدة المتوقعة.",

            "Course created successfully!":
                "تم إنشاء الدورة بنجاح!",

            "You have new notifications.":
                "لديك إشعارات جديدة.",

            "Course options selected.":
                "تم اختيار خيارات الدورة.",

            "New session creation is ready.":
                "إنشاء جلسة جديدة جاهز.",

            "Add Resource selected.":
                "تم اختيار إضافة مورد.",

            "Compact sidebar enabled.":
                "تم تفعيل الشريط الجانبي المصغر.",

            "Compact sidebar disabled.":
                "تم إلغاء الشريط الجانبي المصغر.",

            "Language changed to":
                "تم تغيير اللغة إلى",

            "Course is ready to manage.":
                "الدورة جاهزة للإدارة."
        }
    };

    /* =========================================================
       BUILD REVERSE TRANSLATION MAP
       This prevents EN/FR/AR mixing.
       ========================================================= */

    const translationLookup = {};

    Object.keys(translations).forEach((language) => {
        Object.keys(translations[language]).forEach((key) => {

            const englishText =
                translations.en[key] || key;

            if (!translationLookup[englishText]) {
                translationLookup[englishText] = {};
            }

            translationLookup[englishText][language] =
                translations[language][key];

        });
    });

    /* =========================================================
       GET CURRENT LANGUAGE
       ========================================================= */

    let currentLanguage =
        localStorage.getItem(LANGUAGE_KEY) || "en";

    if (!translations[currentLanguage]) {
        currentLanguage = "en";
    }

    /* =========================================================
       TRANSLATION HELPERS
       ========================================================= */

    function normalizeText(text) {
        return String(text || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getCanonicalKey(text) {

        const normalized =
            normalizeText(text);

        if (!normalized) return null;

        const languages =
            Object.keys(translations);

        for (const language of languages) {

            const dictionary =
                translations[language];

            for (const key of Object.keys(dictionary)) {

                if (
                    normalizeText(dictionary[key]) ===
                    normalized
                ) {
                    return key;
                }

                if (
                    normalizeText(key) ===
                    normalized
                ) {
                    return key;
                }
            }
        }

        return null;
    }

    function translateText(text) {

        const key =
            getCanonicalKey(text);

        if (!key) {
            return text;
        }

        return (
            translations[currentLanguage][key] ||
            translations.en[key] ||
            text
        );
    }

    /* =========================================================
       TRANSLATE STATIC PAGE
       ========================================================= */

    function translateStaticPage() {

        /*
         * We only translate elements whose complete text
         * matches a known interface phrase.
         *
         * This protects user content such as:
         * C++ Programming
         * course descriptions
         * teacher names
         */

        const allElements =
            $$("body *");

        allElements.forEach((element) => {

            if (
                element.children.length > 0
            ) {
                return;
            }

            if (
                element.closest(
                    ".course-card"
                )
            ) {
                return;
            }

            const text =
                normalizeText(element.textContent);

            if (!text) return;

            const translated =
                translateText(text);

            if (
                translated !== text
            ) {
                element.textContent =
                    translated;
            }
        });

        /* ---------------- PLACEHOLDERS ---------------- */

        if (studentSearch) {
            studentSearch.placeholder =
                currentLanguage === "fr"
                    ? "Rechercher des étudiants..."
                    : currentLanguage === "ar"
                        ? "ابحث عن الطلاب..."
                        : "Search students...";
        }

        if ($("#courseTitle")) {
            $("#courseTitle").placeholder =
                currentLanguage === "fr"
                    ? "Titre du cours"
                    : currentLanguage === "ar"
                        ? "عنوان الدورة"
                        : "Course Title";
        }

        if ($("#courseDescription")) {
            $("#courseDescription").placeholder =
                currentLanguage === "fr"
                    ? "Description"
                    : currentLanguage === "ar"
                        ? "وصف الدورة"
                        : "Description";
        }

        if ($("#courseDuration")) {
            $("#courseDuration").placeholder =
                currentLanguage === "fr"
                    ? "Durée estimée"
                    : currentLanguage === "ar"
                        ? "المدة المتوقعة"
                        : "Estimated duration";
        }

        /* ---------------- SELECT OPTIONS ---------------- */

        translateSelectOptions(
            "#courseCategory",
            {
                "Programming": {
                    en: "Programming",
                    fr: "Programmation",
                    ar: "البرمجة"
                },
                "Artificial Intelligence": {
                    en: "Artificial Intelligence",
                    fr: "Intelligence artificielle",
                    ar: "الذكاء الاصطناعي"
                },
                "Mathematics": {
                    en: "Mathematics",
                    fr: "Mathématiques",
                    ar: "الرياضيات"
                },
                "Computer Science": {
                    en: "Computer Science",
                    fr: "Informatique",
                    ar: "علوم الحاسوب"
                }
            }
        );

        translateSelectOptions(
            "#courseLevel",
            {
                "Beginner": {
                    en: "Beginner",
                    fr: "Débutant",
                    ar: "مبتدئ"
                },
                "Intermediate": {
                    en: "Intermediate",
                    fr: "Intermédiaire",
                    ar: "متوسط"
                },
                "Advanced": {
                    en: "Advanced",
                    fr: "Avancé",
                    ar: "متقدم"
                }
            }
        );

        /* ---------------- HTML DIRECTION ---------------- */

        document.documentElement.lang =
            currentLanguage;

        document.documentElement.dir =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";

        document.body.classList.toggle(
            "rtl",
            currentLanguage === "ar"
        );

        /* ---------------- LANGUAGE SELECT ---------------- */

        if (languageSelect) {
            languageSelect.value =
                currentLanguage;
        }

        /* ---------------- PAGE TITLE ---------------- */

        updatePageTitle();
    }

    /* =========================================================
       TRANSLATE SELECT OPTIONS
       ========================================================= */

    function translateSelectOptions(
        selector,
        optionMap
    ) {

        const select =
            $(selector);

        if (!select) return;

        $$("option", select).forEach((option) => {

            const original =
                option.dataset.originalText ||
                normalizeText(option.textContent);

            option.dataset.originalText =
                original;

            let key = null;

            Object.keys(optionMap).forEach((mapKey) => {

                const values =
                    optionMap[mapKey];

                if (
                    Object.values(values)
                        .some(
                            (value) =>
                                normalizeText(value) ===
                                normalizeText(original)
                        )
                ) {
                    key = mapKey;
                }
            });

            if (key && optionMap[key]) {
                option.textContent =
                    optionMap[key][currentLanguage];
            }
        });
    }

    /* =========================================================
       PAGE TITLES
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

    function updatePageTitle() {

        if (!pageTitle) return;

        const sectionId =
            pageTitle.dataset.currentSection ||
            "dashboard";

        const title =
            sectionTitles[sectionId] ||
            "Teacher Dashboard";

        pageTitle.textContent =
            translateText(title);
    }

    /* =========================================================
       APPLY LANGUAGE
       ========================================================= */

    function applyLanguage(language) {

        if (!translations[language]) {
            language = "en";
        }

        currentLanguage =
            language;

        localStorage.setItem(
            LANGUAGE_KEY,
            currentLanguage
        );

        translateStaticPage();

        /*
         * Rebuild dynamic course cards so that
         * "students", "lessons", and "progress"
         * also follow the selected language.
         */
        refreshCourseCards();

        console.log(
            `Wassla language: ${currentLanguage}`
        );
    }

    /* =========================================================
       LANGUAGE SELECT EVENT
       ========================================================= */

    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            () => {

                const selected =
                    languageSelect.value;

                applyLanguage(selected);

                const selectedLabel =
                    languageSelect.options[
                        languageSelect.selectedIndex
                    ]?.text || "";

                showToast(
                    `${translateText("Language changed to")} ${selectedLabel}.`
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

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                if (!sidebar) return;

                sidebar.classList.toggle(
                    "open"
                );

                if (overlay) {

                    overlay.classList.toggle(
                        "show"
                    );

                    overlay.classList.toggle(
                        "active"
                    );
                }
            }
        );
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

        sections.forEach(
            (section) => {

                section.classList.remove(
                    "active-section"
                );

                section.style.display =
                    "none";
            }
        );

        target.classList.add(
            "active-section"
        );

        target.style.display =
            "block";

        navItems.forEach(
            (item) => {

                item.classList.toggle(
                    "active",
                    item.dataset.section ===
                        sectionId
                );
            }
        );

        if (pageTitle) {

            pageTitle.dataset.currentSection =
                sectionId;

            const title =
                sectionTitles[sectionId] ||
                "Teacher Dashboard";

            pageTitle.textContent =
                translateText(title);
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

    navItems.forEach(
        (item) => {

            item.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    const sectionId =
                        item.getAttribute(
                            "data-section"
                        );

                    showSection(
                        sectionId
                    );
                }
            );
        }
    );

    sectionButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    const sectionId =
                        button.getAttribute(
                            "data-section-target"
                        );

                    showSection(
                        sectionId
                    );
                }
            );
        }
    );

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

                showSection(
                    "students"
                );

                setTimeout(
                    () => {

                        if (studentSearch) {
                            studentSearch.focus();
                        }

                    },
                    200
                );
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

                rows.forEach(
                    (row) => {

                        const text =
                            row.textContent
                                .toLowerCase();

                        row.style.display =
                            text.includes(value)
                                ? ""
                                : "none";
                    }
                );
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

                showToast(
                    translateText(
                        "You have new notifications."
                    )
                );
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
            value.includes("mathématiques") ||
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
            document.createElement(
                "div"
            );

        div.textContent =
            value == null
                ? ""
                : String(value);

        return div.innerHTML;
    }

    /* =========================================================
       COURSE LABELS
       ========================================================= */

    function getCourseLabel(
        englishKey
    ) {

        return (
            translations[currentLanguage][
                englishKey
            ] ||
            translations.en[
                englishKey
            ] ||
            englishKey
        );
    }

    /* =========================================================
       CREATE COURSE CARD
       ========================================================= */

    function createCourseCard(course) {

        const article =
            document.createElement(
                "article"
            );

        article.className =
            "course-card";

        const icon =
            getCourseIcon(
                course.category
            );

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
                        0 ${escapeHTML(
                            getCourseLabel("students")
                        )}
                    </span>

                    <span>
                        <i class="fa-solid fa-layer-group"></i>
                        ${escapeHTML(
                            String(lessons)
                        )}
                        ${escapeHTML(
                            getCourseLabel("lessons")
                        )}
                    </span>

                </div>

                <div class="course-progress">

                    <div>
                        <span>
                            ${escapeHTML(
                                getCourseLabel(
                                    "Student progress"
                                )
                            )}
                        </span>

                        <strong>0%</strong>
                    </div>

                    <div class="progress-bar">
                        <span
                            style="width:0%;">
                        </span>
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
                aria-label="${escapeHTML(
                    getCourseLabel(
                        "Course options"
                    )
                )}"
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

                    showToast(
                        `${course.title} ${
                            getCourseLabel(
                                "Course is ready to manage."
                            )
                        }`
                    );
                }
            );
        }

        return article;
    }

    /* =========================================================
       REFRESH COURSE CARDS
       ========================================================= */

    function refreshCourseCards() {

        if (!courseGrid) return;

        const savedCourses =
            getCourses();

        /*
         * Remove only dynamically-created courses.
         * Existing HTML demo cards stay untouched.
         */
        $$(".course-card[data-wassla-course]", courseGrid)
            .forEach(
                (card) => card.remove()
            );

        savedCourses.forEach(
            (course) => {

                const card =
                    createCourseCard(
                        course
                    );

                card.dataset.wasslaCourse =
                    "true";

                courseGrid.appendChild(
                    card
                );
            }
        );
    }

    /* =========================================================
       LOAD SAVED COURSES
       ========================================================= */

    function loadSavedCourses() {

        if (!courseGrid) return;

        const courses =
            getCourses();

        courses.forEach(
            (course) => {

                const card =
                    createCourseCard(
                        course
                    );

                card.dataset.wasslaCourse =
                    "true";

                courseGrid.appendChild(
                    card
                );
            }
        );
    }

    /* =========================================================
       UPDATE COURSE COUNT
       ========================================================= */

    function updateCourseCount() {

        const savedCourses =
            getCourses();

        const defaultCourses =
            3;

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
                $("#courseTitle")
                    ?.value
                    .trim() || "",

            category:
                $("#courseCategory")
                    ?.value || "",

            level:
                $("#courseLevel")
                    ?.value || "",

            description:
                $("#courseDescription")
                    ?.value
                    .trim() || "",

            lessons:
                $("#lessonCount")
                    ?.value || "",

            duration:
                $("#courseDuration")
                    ?.value
                    .trim() || ""
        };
    }

    function openPreview() {

        if (!previewModal) return;

        const course =
            getCourseFormData();

        if (!course.title) {

            showToast(
                translateText(
                    "Please enter a course title."
                )
            );

            $("#courseTitle")?.focus();

            return;
        }

        if ($("#previewTitle")) {
            $("#previewTitle").textContent =
                course.title;
        }

        if ($("#previewDescription")) {
            $("#previewDescription").textContent =
                course.description ||
                translateText(
                    "No description provided."
                );
        }

        if ($("#previewCategory")) {
            $("#previewCategory").textContent =
                course.category || "—";
        }

        if ($("#previewLevel")) {
            $("#previewLevel").textContent =
                course.level || "—";
        }

        if ($("#previewLessons")) {

            $("#previewLessons").textContent =
                course.lessons
                    ? `${course.lessons} ${getCourseLabel(
                        "lessons"
                    )}`
                    : "—";
        }

        if ($("#previewDuration")) {

            $("#previewDuration").textContent =
                course.duration || "—";
        }

        previewModal.classList.add(
            "show"
        );

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
       CREATE COURSE
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
                        translateText(
                            "Please enter a course title."
                        )
                    );

                    $("#courseTitle")?.focus();

                    return;
                }

                if (!course.category) {

                    showToast(
                        translateText(
                            "Please select a category."
                        )
                    );

                    $("#courseCategory")?.focus();

                    return;
                }

                if (!course.level) {

                    showToast(
                        translateText(
                            "Please select a level."
                        )
                    );

                    $("#courseLevel")?.focus();

                    return;
                }

                if (!course.description) {

                    showToast(
                        translateText(
                            "Please enter a course description."
                        )
                    );

                    $("#courseDescription")?.focus();

                    return;
                }

                if (!course.lessons) {

                    showToast(
                        translateText(
                            "Please enter the number of lessons."
                        )
                    );

                    $("#lessonCount")?.focus();

                    return;
                }

                if (!course.duration) {

                    showToast(
                        translateText(
                            "Please enter the estimated duration."
                        )
                    );

                    $("#courseDuration")?.focus();

                    return;
                }

                const courses =
                    getCourses();

                const newCourse = {

                    id: Date.now(),

                    ...course,

                    createdAt:
                        new Date().toISOString()
                };

                courses.push(
                    newCourse
                );

                saveCourses(
                    courses
                );

                if (courseGrid) {

                    const card =
                        createCourseCard(
                            newCourse
                        );

                    card.dataset.wasslaCourse =
                        "true";

                    courseGrid.appendChild(
                        card
                    );
                }

                updateCourseCount();

                courseForm.reset();

                closePreview();

                showToast(
                    translateText(
                        "Course created successfully!"
                    )
                );

                setTimeout(
                    () => {
                        showSection(
                            "courses"
                        );
                    },
                    600
                );
            }
        );
    }

    /* =========================================================
       EXISTING COURSE ACTIONS
       ========================================================= */

    $$(".course-action").forEach(
        (button) => {

            /*
             * Only attach if the button
             * was not created by our dynamic
             * course-card system.
             */

            if (
                button.closest(
                    ".course-card[data-wassla-course]"
                )
            ) {
                return;
            }

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        translateText(
                            "Course options selected."
                        )
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
                    translateText(
                        "New session creation is ready."
                    )
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
                    translateText(
                        "Add Resource selected."
                    )
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
                        ? translateText(
                            "Compact sidebar enabled."
                        )
                        : translateText(
                            "Compact sidebar disabled."
                        )
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

            if (
                event.key ===
                "Escape"
            ) {

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

    /*
     * Apply saved language AFTER the page
     * has been initialized.
     */
    applyLanguage(
        currentLanguage
    );

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );
});

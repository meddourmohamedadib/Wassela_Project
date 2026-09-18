/* =========================================================
   WASSLA — TEACHER DASHBOARD
   FIXED VERSION
   - EN / FR / AR language switching
   - RTL for Arabic
   - Edit teacher-created courses
   - No delete
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

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
       SETTINGS
       ========================================================= */

    const STORAGE_KEY = "wassla_teacher_courses";
    const LANGUAGE_KEY = "wassla_teacher_language";

    let editingCourseId = null;

    let currentLanguage =
        localStorage.getItem(LANGUAGE_KEY) || "en";

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
       TRANSLATIONS
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
            "Teacher Dashboard": "Teacher Dashboard",

            "Student progress": "Student progress",
            "0 students": "0 students",
            "Course options": "Course options",
            "lessons": "lessons",

            "Edit Course": "Edit Course",
            "Save Changes": "Save Changes",

            "Course created successfully!":
                "Course created successfully!",

            "Course updated successfully!":
                "Course updated successfully!",

            "You have new notifications.":
                "You have new notifications.",

            "New session creation is ready.":
                "New session creation is ready.",

            "Add Resource selected.":
                "Add Resource selected.",

            "Compact sidebar enabled.":
                "Compact sidebar enabled.",

            "Compact sidebar disabled.":
                "Compact sidebar disabled.",

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

            "No description provided.":
                "No description provided."
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
            "Teacher Dashboard": "Espace enseignant",

            "Student progress":
                "Progression des étudiants",

            "0 students":
                "0 étudiants",

            "Course options":
                "Options du cours",

            "lessons":
                "leçons",

            "Edit Course":
                "Modifier le cours",

            "Save Changes":
                "Enregistrer les modifications",

            "Course created successfully!":
                "Cours créé avec succès !",

            "Course updated successfully!":
                "Cours mis à jour avec succès !",

            "You have new notifications.":
                "Vous avez de nouvelles notifications.",

            "New session creation is ready.":
                "La création d'une nouvelle session est prête.",

            "Add Resource selected.":
                "Ajout de ressource sélectionné.",

            "Compact sidebar enabled.":
                "Barre latérale compacte activée.",

            "Compact sidebar disabled.":
                "Barre latérale compacte désactivée.",

            "Please enter a course title.":
                "Veuillez saisir le titre du cours.",

            "Please select a category.":
                "Veuillez sélectionner une catégorie.",

            "Please select a level.":
                "Veuillez sélectionner le niveau.",

            "Please enter a course description.":
                "Veuillez saisir une description du cours.",

            "Please enter the number of lessons.":
                "Veuillez saisir le nombre de leçons.",

            "Please enter the estimated duration.":
                "Veuillez saisir la durée estimée.",

            "No description provided.":
                "Aucune description fournie."
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
            "Teacher Dashboard": "لوحة المعلم",

            "Student progress":
                "تقدم الطلاب",

            "0 students":
                "0 طالب",

            "Course options":
                "خيارات الدورة",

            "lessons":
                "دروس",

            "Edit Course":
                "تعديل الدورة",

            "Save Changes":
                "حفظ التغييرات",

            "Course created successfully!":
                "تم إنشاء الدورة بنجاح!",

            "Course updated successfully!":
                "تم تحديث الدورة بنجاح!",

            "You have new notifications.":
                "لديك إشعارات جديدة.",

            "New session creation is ready.":
                "إنشاء جلسة جديدة جاهز.",

            "Add Resource selected.":
                "تم اختيار إضافة مورد.",

            "Compact sidebar enabled.":
                "تم تفعيل الشريط الجانبي المصغر.",

            "Compact sidebar disabled.":
                "تم تعطيل الشريط الجانبي المصغر.",

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

            "No description provided.":
                "لم يتم تقديم وصف."
        }
    };

    const t = (text) =>
        translations[currentLanguage]?.[text] || text;

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

        target.classList.add(
            "active-section"
        );

        target.style.display = "block";

        navItems.forEach((item) => {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionId
            );
        });

        if (pageTitle) {

            pageTitle.textContent =
                t(
                    sectionTitles[sectionId] ||
                    "Teacher Dashboard"
                );
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

                showToast(
                    t(
                        "You have new notifications."
                    )
                );
            }
        );
    }

    /* =========================================================
       LANGUAGE SWITCHING
       ========================================================= */

    function translateTextNodes() {

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );

        const nodes = [];

        let node;

        while (
            (node = walker.nextNode())
        ) {

            nodes.push(node);
        }

        nodes.forEach((textNode) => {

            const value =
                textNode.nodeValue || "";

            const trimmed =
                value.trim();

            if (!trimmed) return;

            const translated =
                t(trimmed);

            if (
                translated !== trimmed
            ) {

                textNode.nodeValue =
                    value.replace(
                        trimmed,
                        translated
                    );
            }
        });
    }

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

        document.documentElement.lang =
            currentLanguage;

        document.documentElement.dir =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";

        if (languageSelect) {

            languageSelect.value =
                currentLanguage;
        }

        translateTextNodes();

        const activeSection =
            sections.find(
                (section) =>
                    section.classList.contains(
                        "active-section"
                    )
            );

        if (
            pageTitle &&
            activeSection
        ) {

            pageTitle.textContent =
                t(
                    sectionTitles[
                        activeSection.id
                    ] ||
                    "Teacher Dashboard"
                );
        }

        /* Placeholders */

        if (studentSearch) {

            studentSearch.placeholder = {

                en: "Search students...",
                fr: "Rechercher des étudiants...",
                ar: "ابحث عن الطلاب..."

            }[currentLanguage];
        }

        const courseTitle =
            $("#courseTitle");

        if (courseTitle) {

            courseTitle.placeholder = {

                en: "Enter course title",
                fr: "Saisissez le titre du cours",
                ar: "أدخل عنوان الدورة"

            }[currentLanguage];
        }

        const courseDescription =
            $("#courseDescription");

        if (courseDescription) {

            courseDescription.placeholder = {

                en: "Describe your course...",
                fr: "Décrivez votre cours...",
                ar: "صف دورتك..."

            }[currentLanguage];
        }

        const courseDuration =
            $("#courseDuration");

        if (courseDuration) {

            courseDuration.placeholder = {

                en: "e.g. 6 weeks",
                fr: "ex. 6 semaines",
                ar: "مثال: 6 أسابيع"

            }[currentLanguage];
        }
    }

    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            () => {

                applyLanguage(
                    languageSelect.value
                );
            }
        );
    }

    /* =========================================================
       COURSE STORAGE
       ========================================================= */

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
            String(
                category || ""
            ).toLowerCase();

        if (
            value.includes("artificial") ||
            value.includes("ai")
        ) {
            return "fa-brain";
        }

        if (
            value.includes("program")
        ) {
            return "fa-code";
        }

        if (
            value.includes("math")
        ) {
            return "fa-calculator";
        }

        if (
            value.includes("computer")
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
       CREATE COURSE CARD
       ========================================================= */

    function createCourseCard(course) {

        const article =
            document.createElement("article");

        article.className =
            "course-card";

        article.dataset.courseId =
            course.id;

        article.innerHTML = `

            <div class="course-card-icon">
                <i class="fa-solid ${getCourseIcon(
                    course.category
                )}"></i>
            </div>

            <div class="course-card-body">

                <span class="course-category">
                    ${escapeHTML(
                        course.category
                    )}
                </span>

                <h3>
                    ${escapeHTML(
                        course.title
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        course.description
                    )}
                </p>

                <div class="course-meta">

                    <span>
                        <i class="fa-solid fa-users"></i>
                        ${escapeHTML(
                            t("0 students")
                        )}
                    </span>

                    <span>
                        <i class="fa-solid fa-layer-group"></i>
                        ${escapeHTML(
                            String(
                                course.lessons ||
                                "—"
                            )
                        )}
                        ${escapeHTML(
                            t("lessons")
                        )}
                    </span>

                </div>

                <div class="course-progress">

                    <div>

                        <span>
                            ${escapeHTML(
                                t(
                                    "Student progress"
                                )
                            )}
                        </span>

                        <strong>
                            0%
                        </strong>

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
                aria-label="${escapeHTML(
                    t("Course options")
                )}"
                title="${escapeHTML(
                    t("Course options")
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

                    openEditCourse(
                        course.id
                    );
                }
            );
        }

        return article;
    }

    /* =========================================================
       LOAD COURSES
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

    function renderSavedCourses() {

        if (!courseGrid) return;

        courseGrid
            .querySelectorAll(
                ".course-card[data-course-id]"
            )
            .forEach(
                (card) =>
                    card.remove()
            );

        getCourses().forEach(
            (course) => {

                courseGrid.appendChild(
                    createCourseCard(
                        course
                    )
                );
            }
        );
    }

    /* =========================================================
       COURSE COUNT
       ========================================================= */

    function updateCourseCount() {

        const total =
            3 +
            getCourses().length;

        const totalCoursesElement =
            document.querySelector(
                ".stats-grid .stat-card:first-child .stat-info strong"
            );

        if (
            totalCoursesElement
        ) {

            totalCoursesElement.textContent =
                total;
        }
    }

    /* =========================================================
       COURSE FORM DATA
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

    /* =========================================================
       EDIT MODE
       ========================================================= */

    function setEditMode(isEditing) {

        const submitButton =
            courseForm?.querySelector(
                'button[type="submit"]'
            );

        if (submitButton) {

            submitButton.textContent =
                isEditing
                    ? t("Save Changes")
                    : t("Create Course");
        }

        const heading =
            document.querySelector(
                "#create-course h2"
            );

        if (heading) {

            heading.textContent =
                isEditing
                    ? t("Edit Course")
                    : t("Create Course");
        }
    }

    function openEditCourse(courseId) {

        const courses =
            getCourses();

        const course =
            courses.find(
                (item) =>
                    String(item.id) ===
                    String(courseId)
            );

        if (!course) {

            showToast(
                currentLanguage === "ar"
                    ? "هذه الدورة لا يمكن تعديلها من هنا."
                    : currentLanguage === "fr"
                        ? "Ce cours ne peut pas être modifié ici."
                        : "This course cannot be edited here."
            );

            return;
        }

        editingCourseId =
            course.id;

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

        setEditMode(true);

        showSection(
            "create-course"
        );

        setTimeout(() => {

            $("#courseTitle")?.focus();

        }, 200);
    }

    /* =========================================================
       COURSE PREVIEW
       ========================================================= */

    function openPreview() {

        if (!previewModal) return;

        const course =
            getCourseFormData();

        if (!course.title) {

            showToast(
                t(
                    "Please enter a course title."
                )
            );

            $("#courseTitle")?.focus();

            return;
        }

        $("#previewTitle").textContent =
            course.title;

        $("#previewDescription").textContent =
            course.description ||
            t(
                "No description provided."
            );

        $("#previewCategory").textContent =
            course.category || "—";

        $("#previewLevel").textContent =
            course.level || "—";

        $("#previewLessons").textContent =
            course.lessons
                ? `${course.lessons} ${t(
                    "lessons"
                )}`
                : "—";

        $("#previewDuration").textContent =
            course.duration || "—";

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
                        t(
                            "Please enter a course title."
                        )
                    );

                    $("#courseTitle")?.focus();

                    return;
                }

                if (!course.category) {

                    showToast(
                        t(
                            "Please select a category."
                        )
                    );

                    $("#courseCategory")?.focus();

                    return;
                }

                if (!course.level) {

                    showToast(
                        t(
                            "Please select a level."
                        )
                    );

                    $("#courseLevel")?.focus();

                    return;
                }

                if (!course.description) {

                    showToast(
                        t(
                            "Please enter a course description."
                        )
                    );

                    $("#courseDescription")?.focus();

                    return;
                }

                if (!course.lessons) {

                    showToast(
                        t(
                            "Please enter the number of lessons."
                        )
                    );

                    $("#lessonCount")?.focus();

                    return;
                }

                if (!course.duration) {

                    showToast(
                        t(
                            "Please enter the estimated duration."
                        )
                    );

                    $("#courseDuration")?.focus();

                    return;
                }

                const courses =
                    getCourses();

                /* EDIT */

                if (
                    editingCourseId !==
                    null
                ) {

                    const index =
                        courses.findIndex(
                            (item) =>
                                String(
                                    item.id
                                ) ===
                                String(
                                    editingCourseId
                                )
                        );

                    if (
                        index !== -1
                    ) {

                        courses[index] = {

                            ...courses[index],

                            ...course,

                            updatedAt:
                                new Date()
                                    .toISOString()
                        };

                        saveCourses(
                            courses
                        );

                        renderSavedCourses();

                        updateCourseCount();

                        editingCourseId =
                            null;

                        courseForm.reset();

                        setEditMode(false);

                        closePreview();

                        showToast(
                            t(
                                "Course updated successfully!"
                            )
                        );

                        setTimeout(() => {

                            showSection(
                                "courses"
                            );

                        }, 400);

                        return;
                    }

                    editingCourseId =
                        null;
                }

                /* CREATE */

                const newCourse = {

                    id:
                        Date.now(),

                    ...course,

                    createdAt:
                        new Date()
                            .toISOString()
                };

                courses.push(
                    newCourse
                );

                saveCourses(
                    courses
                );

                if (courseGrid) {

                    courseGrid.appendChild(
                        createCourseCard(
                            newCourse
                        )
                    );
                }

                updateCourseCount();

                courseForm.reset();

                setEditMode(false);

                closePreview();

                showToast(
                    t(
                        "Course created successfully!"
                    )
                );

                setTimeout(() => {

                    showSection(
                        "courses"
                    );

                }, 400);
            }
        );
    }

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
                    t(
                        "New session creation is ready."
                    )
                );
            }
        );
    }

    /* =========================================================
       RESOURCES
       ========================================================= */

    const uploadResourceBtn =
        $("#uploadResourceBtn");

    if (uploadResourceBtn) {

        uploadResourceBtn.addEventListener(
            "click",
            () => {

                showToast(
                    t(
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
                        ? t(
                            "Compact sidebar enabled."
                        )
                        : t(
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

    applyLanguage(
        currentLanguage
    );

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );
});

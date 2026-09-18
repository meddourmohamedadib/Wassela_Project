```javascript
/* =========================================================
   WASSLA — TEACHER DASHBOARD
   Frontend Prototype
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
        overlay.addEventListener("click", closeSidebar);
    }

    /* =========================================================
       SECTION NAVIGATION
       ========================================================= */

    function showSection(sectionId) {
        if (!sectionId) return;

        const target = document.getElementById(sectionId);

        if (!target) {
            console.warn(
                "Wassla: section not found:",
                sectionId
            );
            return;
        }

        sections.forEach((section) => {
            section.classList.remove("active-section");
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

        if (pageTitle) {
            pageTitle.textContent =
                sectionTitles[sectionId] ||
                "Teacher Dashboard";
        }

        closeSidebar();

        if (window.location.hash !== `#${sectionId}`) {
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
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionId =
                item.getAttribute("data-section");

            showSection(sectionId);
        });
    });

    sectionButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionId =
                button.getAttribute(
                    "data-section-target"
                );

            showSection(sectionId);
        });
    });

    function loadInitialSection() {
        const hash =
            window.location.hash.replace("#", "");

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
        searchBtn.addEventListener("click", () => {
            showSection("students");

            setTimeout(() => {
                if (studentSearch) {
                    studentSearch.focus();
                }
            }, 200);
        });
    }

    if (studentSearch) {
        studentSearch.addEventListener("input", () => {
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
        });
    }

    /* =========================================================
       NOTIFICATIONS
       ========================================================= */

    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            showToast(
                "You have new notifications."
            );
        });
    }

    /* =========================================================
       LANGUAGE
       ========================================================= */

    if (languageSelect) {
        languageSelect.addEventListener("change", () => {
            const selected =
                languageSelect.options[
                    languageSelect.selectedIndex
                ]?.text || "Language";

            showToast(
                `Language changed to ${selected}.`
            );
        });
    }

    /* =========================================================
       COURSE STORAGE
       ========================================================= */

    const STORAGE_KEY =
        "wassla_teacher_courses";

    function getCourses() {
        try {
            const saved =
                localStorage.getItem(STORAGE_KEY);

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

        article.className = "course-card";

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
                        ${escapeHTML(String(lessons))}
                        lessons
                    </span>

                </div>

                <div class="course-progress">

                    <div>
                        <span>
                            Student progress
                        </span>

                        <strong>0%</strong>
                    </div>

                    <div class="progress-bar">
                        <span style="width:0%;"></span>
                    </div>

                </div>

                <small class="course-duration">
                    <i class="fa-regular fa-clock"></i>
                    ${escapeHTML(String(duration))}
                </small>

                <button
                    class="delete-course-btn"
                    type="button"
                >
                    <i class="fa-solid fa-trash"></i>
                    Delete Course
                </button>

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
                    showToast(
                        `${course.title} is ready to manage.`
                    );
                }
            );
        }

        const deleteButton =
            $(".delete-course-btn", article);

        if (deleteButton) {
            deleteButton.addEventListener(
                "click",
                () => {
                    const courses =
                        getCourses();

                    const updatedCourses =
                        courses.filter(
                            (savedCourse) =>
                                savedCourse.id !==
                                course.id
                        );

                    saveCourses(updatedCourses);

                    article.remove();

                    updateCourseCount();

                    showToast(
                        `"${course.title}" deleted successfully.`
                    );
                }
            );
        }

        return article;
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

        previewModal.classList.add("active");

        previewModal.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    function closePreview() {
        if (!previewModal) return;

        previewModal.classList.remove("active");

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
                        createCourseCard(newCourse)
                    );
                }

                updateCourseCount();

                courseForm.reset();

                closePreview();

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
       EXISTING COURSE ACTIONS
       ========================================================= */

    $$(".course-action").forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    showToast(
                        "Course options selected."
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
       RESOURCES
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

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );
});
```

    

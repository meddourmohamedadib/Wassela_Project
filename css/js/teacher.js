```javascript
/* =========================================================
   WASSLA — TEACHER DASHBOARD
   teacher.js
   Frontend Prototype
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. ELEMENTS
       ===================================================== */

    const sidebar = document.getElementById("teacherSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const pageTitle = document.getElementById("pageTitle");

    const navItems = document.querySelectorAll(
        ".nav-item[data-section]"
    );

    const pageSections = document.querySelectorAll(
        ".page-section"
    );

    const courseForm = document.getElementById("courseForm");

    const studentSearch = document.getElementById("studentSearch");

    const searchBtn = document.getElementById("searchBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const languageSelect =
        document.getElementById("languageSelect");

    const createSessionBtn =
        document.getElementById("createSessionBtn");

    const uploadResourceBtn =
        document.getElementById("uploadResourceBtn");

    const compactSidebarToggle =
        document.getElementById("compactSidebarToggle");

    /* Preview */
    const previewCourseBtn =
        document.getElementById("previewCourseBtn");

    const coursePreviewModal =
        document.getElementById("coursePreviewModal");

    const closeCoursePreview =
        document.getElementById("closeCoursePreview");

    const previewTitle =
        document.getElementById("previewTitle");

    const previewDescription =
        document.getElementById("previewDescription");

    const previewCategory =
        document.getElementById("previewCategory");

    const previewLevel =
        document.getElementById("previewLevel");

    const previewLessons =
        document.getElementById("previewLessons");

    const previewDuration =
        document.getElementById("previewDuration");

    /* Toast */
    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       2. SECTION TITLES
       ===================================================== */

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


    /* =====================================================
       3. TOAST
       ===================================================== */

    let toastTimer = null;

    function showToast(message) {
        if (!toast) return;

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.remove("active");
        }, 3000);
    }


    /* =====================================================
       4. SIDEBAR
       ===================================================== */

    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add("active");
            sidebar.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("active");
            overlay.classList.add("show");
        }

        if (window.innerWidth <= 900) {
            document.body.style.overflow = "hidden";
        }
    }


    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove("active");
            sidebar.classList.remove("open");
            sidebar.classList.remove("show");
        }

        if (overlay) {
            overlay.classList.remove("active");
            overlay.classList.remove("show");
        }

        document.body.style.overflow = "";
    }


    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            if (
                sidebar &&
                (
                    sidebar.classList.contains("active") ||
                    sidebar.classList.contains("open")
                )
            ) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }


    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }


    /* =====================================================
       5. SHOW SECTION
       ===================================================== */

    function showSection(sectionId, updateHash = true) {
        if (!sectionId) return;

        const targetSection =
            document.getElementById(sectionId);

        if (!targetSection) {
            console.warn(
                `Wassla: section "${sectionId}" not found.`
            );
            return;
        }

        /* Hide every section */
        pageSections.forEach((section) => {
            section.classList.remove("active-section");
        });

        /* Show selected section */
        targetSection.classList.add("active-section");

        /* Update sidebar active item */
        navItems.forEach((item) => {
            item.classList.remove("active");

            if (
                item.dataset.section === sectionId
            ) {
                item.classList.add("active");
            }
        });

        /* Update page title */
        if (
            pageTitle &&
            sectionTitles[sectionId]
        ) {
            pageTitle.textContent =
                sectionTitles[sectionId];
        }

        /* Close mobile sidebar */
        if (window.innerWidth <= 900) {
            closeSidebar();
        }

        /* Update URL */
        if (updateHash) {
            history.replaceState(
                null,
                "",
                `#${sectionId}`
            );
        }

        /* Scroll to top */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       6. SIDEBAR NAVIGATION
       ===================================================== */

    navItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionId =
                item.dataset.section;

            if (sectionId) {
                showSection(sectionId);
            }
        });
    });


    /* =====================================================
       7. ALL DATA-SECTION-TARGET BUTTONS
       ===================================================== */

    const sectionTargetButtons =
        document.querySelectorAll(
            "[data-section-target]"
        );

    sectionTargetButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const target =
                button.dataset.sectionTarget;

            if (
                target &&
                document.getElementById(target)
            ) {
                showSection(target);
            }
        });
    });


    /* =====================================================
       8. INITIAL SECTION
       ===================================================== */

    function initializeSection() {
        const hash =
            window.location.hash
                .replace("#", "")
                .trim();

        if (
            hash &&
            document.getElementById(hash)
        ) {
            showSection(hash, false);
            return;
        }

        const activeSection =
            document.querySelector(
                ".page-section.active-section"
            );

        if (activeSection) {
            showSection(
                activeSection.id,
                false
            );
            return;
        }

        showSection("dashboard", false);
    }


    initializeSection();


    /* =====================================================
       9. HASH CHANGE
       ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {
            const sectionId =
                window.location.hash
                    .replace("#", "")
                    .trim();

            if (
                sectionId &&
                document.getElementById(sectionId)
            ) {
                showSection(
                    sectionId,
                    false
                );
            }
        }
    );


    /* =====================================================
       10. RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 900) {
                closeSidebar();
            }
        }
    );


    /* =====================================================
       11. COURSE FORM
       ===================================================== */

    if (courseForm) {
        courseForm.addEventListener(
            "submit",
            (event) => {
                event.preventDefault();

                const title =
                    document.getElementById(
                        "courseTitle"
                    );

                const category =
                    document.getElementById(
                        "courseCategory"
                    );

                const level =
                    document.getElementById(
                        "courseLevel"
                    );

                const description =
                    document.getElementById(
                        "courseDescription"
                    );

                const lessons =
                    document.getElementById(
                        "lessonCount"
                    );

                const duration =
                    document.getElementById(
                        "courseDuration"
                    );

                const fields = [
                    title,
                    category,
                    level,
                    description,
                    lessons,
                    duration
                ];

                let valid = true;

                fields.forEach((field) => {
                    if (!field) return;

                    if (
                        !field.value.trim()
                    ) {
                        field.style.borderColor =
                            "#ef4444";

                        valid = false;
                    } else {
                        field.style.borderColor =
                            "";
                    }
                });

                if (!valid) {
                    showToast(
                        "Please complete all course fields."
                    );
                    return;
                }

                showToast(
                    `"${title.value.trim()}" created successfully.`
                );

                console.log(
                    "Wassla — Course created:",
                    {
                        title: title.value.trim(),
                        category: category.value,
                        level: level.value,
                        description:
                            description.value.trim(),
                        lessons: lessons.value,
                        duration:
                            duration.value.trim()
                    }
                );

                setTimeout(() => {
                    courseForm.reset();

                    fields.forEach((field) => {
                        if (field) {
                            field.style.borderColor = "";
                        }
                    });

                    showSection("courses");
                }, 900);
            }
        );
    }


    /* =====================================================
       12. REMOVE FORM ERRORS
       ===================================================== */

    if (courseForm) {
        courseForm
            .querySelectorAll(
                "input, select, textarea"
            )
            .forEach((field) => {
                field.addEventListener(
                    "input",
                    () => {
                        field.style.borderColor = "";
                    }
                );

                field.addEventListener(
                    "change",
                    () => {
                        field.style.borderColor = "";
                    }
                );
            });
    }


    /* =====================================================
       13. COURSE PREVIEW
       ===================================================== */

    function openCoursePreview() {
        if (!coursePreviewModal) return;

        const title =
            document.getElementById(
                "courseTitle"
            );

        const category =
            document.getElementById(
                "courseCategory"
            );

        const level =
            document.getElementById(
                "courseLevel"
            );

        const description =
            document.getElementById(
                "courseDescription"
            );

        const lessons =
            document.getElementById(
                "lessonCount"
            );

        const duration =
            document.getElementById(
                "courseDuration"
            );

        if (previewTitle) {
            previewTitle.textContent =
                title && title.value.trim()
                    ? title.value.trim()
                    : "Course Title";
        }

        if (previewDescription) {
            previewDescription.textContent =
                description &&
                description.value.trim()
                    ? description.value.trim()
                    : "Course description will appear here.";
        }

        if (previewCategory) {
            previewCategory.textContent =
                category && category.value
                    ? category.value
                    : "—";
        }

        if (previewLevel) {
            previewLevel.textContent =
                level && level.value
                    ? level.value
                    : "—";
        }

        if (previewLessons) {
            previewLessons.textContent =
                lessons && lessons.value
                    ? lessons.value
                    : "—";
        }

        if (previewDuration) {
            previewDuration.textContent =
                duration &&
                duration.value.trim()
                    ? duration.value.trim()
                    : "—";
        }

        coursePreviewModal.classList.add(
            "active"
        );

        coursePreviewModal.classList.add(
            "show"
        );

        coursePreviewModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeCoursePreviewModal() {
        if (!coursePreviewModal) return;

        coursePreviewModal.classList.remove(
            "active"
        );

        coursePreviewModal.classList.remove(
            "show"
        );

        coursePreviewModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    if (previewCourseBtn) {
        previewCourseBtn.addEventListener(
            "click",
            openCoursePreview
        );
    }


    if (closeCoursePreview) {
        closeCoursePreview.addEventListener(
            "click",
            closeCoursePreviewModal
        );
    }


    if (coursePreviewModal) {
        coursePreviewModal.addEventListener(
            "click",
            (event) => {
                if (
                    event.target ===
                    coursePreviewModal
                ) {
                    closeCoursePreviewModal();
                }
            }
        );
    }


    /* =====================================================
       14. ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key !== "Escape") return;

            closeSidebar();
            closeCoursePreviewModal();
        }
    );


    /* =====================================================
       15. STUDENT SEARCH
       ===================================================== */

    if (studentSearch) {
        studentSearch.addEventListener(
            "input",
            () => {
                const value =
                    studentSearch.value
                        .trim()
                        .toLowerCase();

                const table =
                    document.querySelector(
                        ".students-table"
                    );

                if (!table) return;

                const rows =
                    table.querySelectorAll(
                        "tbody tr"
                    );

                rows.forEach((row) => {
                    const text =
                        row.textContent
                            .toLowerCase();

                    row.style.display =
                        text.includes(value)
                            ? ""
                            : "none";
                });
            }
        );
    }


    /* =====================================================
       16. SEARCH BUTTON
       ===================================================== */

    if (searchBtn) {
        searchBtn.addEventListener(
            "click",
            () => {
                showSection("students");

                setTimeout(() => {
                    if (studentSearch) {
                        studentSearch.focus();
                    }
                }, 250);
            }
        );
    }


    /* =====================================================
       17. NOTIFICATIONS
       ===================================================== */

    if (notificationBtn) {
        notificationBtn.addEventListener(
            "click",
            () => {
                showToast(
                    "You have new student activity."
                );

                const dot =
                    notificationBtn.querySelector(
                        ".notification-dot"
                    );

                if (dot) {
                    dot.style.display = "none";
                }
            }
        );
    }


    /* =====================================================
       18. LANGUAGE
       ===================================================== */

    if (languageSelect) {
        languageSelect.addEventListener(
            "change",
            () => {
                const language =
                    languageSelect.value;

                const messages = {
                    en: "Language set to English.",
                    fr: "Language set to French.",
                    ar: "Language set to Arabic."
                };

                showToast(
                    messages[language] ||
                    "Language changed."
                );
            }
        );
    }


    /* =====================================================
       19. COURSE ACTION BUTTONS
       ===================================================== */

    const courseActionButtons =
        document.querySelectorAll(
            ".course-action"
        );

    courseActionButtons.forEach((button) => {
        button.addEventListener(
            "click",
            (event) => {
                event.preventDefault();

                const card =
                    button.closest(
                        ".course-card"
                    );

                if (!card) return;

                const title =
                    card.querySelector("h3");

                const courseName =
                    title
                        ? title.textContent.trim()
                        : "Course";

                showToast(
                    `${courseName} is ready to manage.`
                );
            }
        );
    });


    /* =====================================================
       20. LIVE SESSION BUTTON
       ===================================================== */

    if (createSessionBtn) {
        createSessionBtn.addEventListener(
            "click",
            () => {
                showToast(
                    "Live session creation will be connected soon."
                );
            }
        );
    }


    /* =====================================================
       21. LIVE SESSION VIEW BUTTONS
       ===================================================== */

    const sessionViewButtons =
        document.querySelectorAll(
            ".session-card .secondary-btn"
        );

    sessionViewButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const card =
                    button.closest(
                        ".session-card"
                    );

                const title =
                    card
                        ? card.querySelector("h3")
                        : null;

                showToast(
                    title
                        ? `${title.textContent.trim()} details are available in the prototype.`
                        : "Session details are available in the prototype."
                );
            }
        );
    });


    /* =====================================================
       22. RESOURCES
       ===================================================== */

    if (uploadResourceBtn) {
        uploadResourceBtn.addEventListener(
            "click",
            () => {
                showToast(
                    "Resource upload will be connected soon."
                );
            }
        );
    }


    const resourceButtons =
        document.querySelectorAll(
            ".resource-card button"
        );

    resourceButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const card =
                    button.closest(
                        ".resource-card"
                    );

                const title =
                    card
                        ? card.querySelector("strong")
                        : null;

                showToast(
                    title
                        ? `${title.textContent.trim()} selected.`
                        : "Resource selected."
                );
            }
        );
    });


    /* =====================================================
       23. SETTINGS TOGGLES
       ===================================================== */

    const toggles =
        document.querySelectorAll(
            ".toggle input"
        );

    toggles.forEach((toggle) => {
        toggle.addEventListener(
            "change",
            () => {
                showToast(
                    toggle.checked
                        ? "Setting enabled."
                        : "Setting disabled."
                );
            }
        );
    });


    /* =====================================================
       24. COMPACT SIDEBAR
       ===================================================== */

    if (compactSidebarToggle) {
        compactSidebarToggle.addEventListener(
            "change",
            () => {
                if (!sidebar) return;

                sidebar.classList.toggle(
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
    }


    /* =====================================================
       25. PROGRESS BARS
       ===================================================== */

    function initializeProgressBars() {
        const progressBars =
            document.querySelectorAll(
                ".progress-bar span, .large-progress-bar span"
            );

        progressBars.forEach((bar) => {
            const inlineWidth =
                bar.style.width;

            if (inlineWidth) {
                const value =
                    parseFloat(
                        inlineWidth
                    );

                if (!Number.isNaN(value)) {
                    bar.style.width = "0%";

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            bar.style.width =
                                `${Math.max(
                                    0,
                                    Math.min(
                                        100,
                                        value
                                    )
                                )}%`;
                        });
                    });
                }
            }
        });
    }


    initializeProgressBars();


    /* =====================================================
       26. BACK TO LOGIN
       ===================================================== */

    const logoutButton =
        document.querySelector(
            ".logout-item"
        );

    if (logoutButton) {
        logoutButton.addEventListener(
            "click",
            () => {
                closeSidebar();

                /*
                 * The HTML href already points to:
                 * index.html
                 *
                 * We intentionally do not prevent
                 * the default navigation.
                 */
            }
        );
    }


    /* =====================================================
       27. PREVENT EMPTY # LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach((link) => {
            link.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );
        });


    /* =====================================================
       28. DEBUG
       ===================================================== */

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );

});
```

   

/* =========================================================
   WASSLA — TEACHER DASHBOARD
   teacher.js
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
    const navItems = document.querySelectorAll(".nav-item[data-section]");
    const pageSections = document.querySelectorAll(".page-section");

    const courseForm = document.getElementById("courseForm");

    const studentSearch = document.getElementById("studentSearch");

    const coursePreviewModal =
        document.getElementById("coursePreviewModal");

    const modalClose =
        document.querySelector(".modal-close");

    const toast = document.getElementById("toast");
    const toastMessage =
        document.getElementById("toastMessage");

    const notificationBtn =
        document.querySelector(".notification-btn");

    const languageSelect =
        document.querySelector(".language-select");


    /* =====================================================
       2. PAGE TITLES
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
       3. SIDEBAR
       ===================================================== */

    function openSidebar() {
        if (!sidebar) return;

        sidebar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {
        if (!sidebar) return;

        sidebar.classList.remove("active");
        sidebar.classList.remove("open");
        sidebar.classList.remove("show");

        if (overlay) {
            overlay.classList.remove("active");
            overlay.classList.remove("show");
        }

        document.body.style.overflow = "";
    }


    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            if (sidebar && sidebar.classList.contains("active")) {
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
       4. NAVIGATION
       ===================================================== */

    function showSection(sectionId) {
        if (!sectionId) return;

        let targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            console.warn(
                `Wassla: Section "${sectionId}" was not found.`
            );
            return;
        }

        /* Hide all sections */
        pageSections.forEach((section) => {
            section.classList.remove("active-section");
        });

        /* Show requested section */
        targetSection.classList.add("active-section");

        /* Update active nav item */
        navItems.forEach((item) => {
            item.classList.remove("active");

            const itemSection = item.dataset.section;

            if (itemSection === sectionId) {
                item.classList.add("active");
            }
        });

        /* Update title */
        if (pageTitle && sectionTitles[sectionId]) {
            pageTitle.textContent = sectionTitles[sectionId];
        }

        /* Close sidebar on mobile */
        if (window.innerWidth <= 900) {
            closeSidebar();
        }

        /* Scroll to top */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /* Update URL hash */
        history.replaceState(
            null,
            "",
            `#${sectionId}`
        );
    }


    navItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionId = item.dataset.section;

            if (sectionId) {
                showSection(sectionId);
            }
        });
    });


    /* =====================================================
       5. INITIAL SECTION
       ===================================================== */

    function initializeSection() {
        const hash = window.location.hash.replace("#", "");

        if (hash && document.getElementById(hash)) {
            showSection(hash);
            return;
        }

        const activeSection =
            document.querySelector(".page-section.active-section");

        if (activeSection) {
            showSection(activeSection.id);
            return;
        }

        showSection("dashboard");
    }


    initializeSection();


    /* =====================================================
       6. WINDOW RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeSidebar();
        }
    });


    /* =====================================================
       7. COURSE FORM
       ===================================================== */

    if (courseForm) {
        courseForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(courseForm);

            const courseName =
                getFormValue(
                    formData,
                    "courseName",
                    "title",
                    "name"
                );

            if (!isFormValid(courseForm)) {
                showToast(
                    "Please complete the required fields."
                );

                return;
            }

            /*
             * Prototype behavior:
             * The course is not sent to a backend yet.
             * This will be connected to the backend later.
             */

            console.log(
                "Wassla — New course:",
                Object.fromEntries(formData.entries())
            );

            showToast(
                courseName
                    ? `"${courseName}" has been created successfully.`
                    : "Course created successfully."
            );

            courseForm.reset();

            setTimeout(() => {
                showSection("courses");
            }, 700);
        });
    }


    /* =====================================================
       8. FORM HELPERS
       ===================================================== */

    function getFormValue(formData, ...possibleNames) {
        for (const name of possibleNames) {
            const value = formData.get(name);

            if (value !== null && String(value).trim() !== "") {
                return String(value).trim();
            }
        }

        return "";
    }


    function isFormValid(form) {
        const requiredFields =
            form.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );

        let valid = true;

        requiredFields.forEach((field) => {
            const value = field.value.trim();

            if (!value) {
                field.style.borderColor = "#ef4444";
                valid = false;
            } else {
                field.style.borderColor = "";
            }
        });

        return valid;
    }


    /* =====================================================
       9. REMOVE FORM ERROR WHEN USER TYPES
       ===================================================== */

    if (courseForm) {
        const fields =
            courseForm.querySelectorAll(
                "input, select, textarea"
            );

        fields.forEach((field) => {
            field.addEventListener("input", () => {
                field.style.borderColor = "";
            });

            field.addEventListener("change", () => {
                field.style.borderColor = "";
            });
        });
    }


    /* =====================================================
       10. STUDENT SEARCH
       ===================================================== */

    if (studentSearch) {
        studentSearch.addEventListener("input", () => {
            const searchValue =
                studentSearch.value
                    .trim()
                    .toLowerCase();

            const table =
                document.querySelector(".students-table");

            if (!table) return;

            const rows =
                table.querySelectorAll("tbody tr");

            rows.forEach((row) => {
                const rowText =
                    row.textContent.toLowerCase();

                row.style.display =
                    rowText.includes(searchValue)
                        ? ""
                        : "none";
            });
        });
    }


    /* =====================================================
       11. COURSE PREVIEW MODAL
       ===================================================== */

    function openModal() {
        if (!coursePreviewModal) return;

        coursePreviewModal.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    function closeModal() {
        if (!coursePreviewModal) return;

        coursePreviewModal.classList.remove("active");
        coursePreviewModal.classList.remove("show");

        document.body.style.overflow = "";
    }


    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }


    if (coursePreviewModal) {
        coursePreviewModal.addEventListener(
            "click",
            (event) => {
                if (
                    event.target === coursePreviewModal
                ) {
                    closeModal();
                }
            }
        );
    }


    /* =====================================================
       12. PREVIEW BUTTONS
       ===================================================== */

    const previewButtons =
        document.querySelectorAll(
            "[data-preview-course]"
        );

    previewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openModal();
        });
    });


    /* =====================================================
       13. ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        closeSidebar();
        closeModal();

        if (document.body.style.overflow === "hidden") {
            document.body.style.overflow = "";
        }
    });


    /* =====================================================
       14. NOTIFICATIONS
       ===================================================== */

    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            showToast(
                "You have new student activity."
            );

            const notificationDot =
                notificationBtn.querySelector(
                    ".notification-dot"
                );

            if (notificationDot) {
                notificationDot.style.display = "none";
            }
        });
    }


    /* =====================================================
       15. LANGUAGE SELECT
       ===================================================== */

    if (languageSelect) {
        languageSelect.addEventListener("change", () => {
            const selectedLanguage =
                languageSelect.value;

            if (!selectedLanguage) return;

            if (
                selectedLanguage.toLowerCase() === "english" ||
                selectedLanguage.toLowerCase() === "en"
            ) {
                showToast("Language set to English.");
            } else {
                showToast(
                    `Language changed to ${selectedLanguage}.`
                );
            }
        });
    }


    /* =====================================================
       16. TEXT BUTTONS
       ===================================================== */

    const textButtons =
        document.querySelectorAll(".text-btn");

    textButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target =
                button.dataset.target;

            if (target && document.getElementById(target)) {
                showSection(target);
                return;
            }

            showToast(
                "This section will be connected soon."
            );
        });
    });


    /* =====================================================
       17. SECONDARY BUTTONS
       ===================================================== */

    const secondaryButtons =
        document.querySelectorAll(".secondary-btn");

    secondaryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target =
                button.dataset.target;

            if (target && document.getElementById(target)) {
                showSection(target);
                return;
            }

            showToast(
                "This action is available in the prototype."
            );
        });
    });


    /* =====================================================
       18. COURSE ACTION BUTTONS
       ===================================================== */

    const courseActionButtons =
        document.querySelectorAll(".course-action");

    courseActionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const courseCard =
                button.closest(".course-card");

            if (!courseCard) {
                showToast(
                    "Course details are not available yet."
                );

                return;
            }

            const titleElement =
                courseCard.querySelector("h3");

            const courseTitle =
                titleElement
                    ? titleElement.textContent.trim()
                    : "This course";

            showToast(
                `${courseTitle} is ready to manage.`
            );
        });
    });


    /* =====================================================
       19. TOAST SYSTEM
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
       20. PROGRESS BARS
       ===================================================== */

    function initializeProgressBars() {
        const progressBars =
            document.querySelectorAll(
                ".progress-bar span, .large-progress-bar span"
            );

        progressBars.forEach((bar) => {
            let percentage =
                bar.dataset.progress;

            if (!percentage) {
                const parent =
                    bar.closest(
                        ".performance-progress, .progress-course-item, .progress-main-card"
                    );

                if (parent) {
                    const percentageElement =
                        parent.querySelector(
                            "[data-percentage]"
                        );

                    if (percentageElement) {
                        percentage =
                            percentageElement.dataset.percentage;
                    }
                }
            }

            if (percentage) {
                let numericValue =
                    parseFloat(
                        String(percentage).replace("%", "")
                    );

                if (
                    !Number.isNaN(numericValue)
                ) {
                    numericValue =
                        Math.max(
                            0,
                            Math.min(
                                100,
                                numericValue
                            )
                        );

                    requestAnimationFrame(() => {
                        bar.style.width =
                            `${numericValue}%`;
                    });
                }
            }
        });
    }


    initializeProgressBars();


    /* =====================================================
       21. SETTINGS TOGGLES
       ===================================================== */

    const toggles =
        document.querySelectorAll(
            ".toggle input"
        );

    toggles.forEach((toggle) => {
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                showToast("Setting enabled.");
            } else {
                showToast("Setting disabled.");
            }
        });
    });


    /* =====================================================
       22. LOGOUT
       ===================================================== */

    const logoutButton =
        document.querySelector(".logout-item");

    if (logoutButton) {
        logoutButton.addEventListener(
            "click",
            (event) => {
                event.preventDefault();

                const confirmed =
                    window.confirm(
                        "Are you sure you want to log out?"
                    );

                if (!confirmed) {
                    return;
                }

                showToast(
                    "Logging out..."
                );

                /*
                 * Backend authentication will be
                 * connected here later.
                 */

                setTimeout(() => {
                    console.log(
                        "Wassla — Logout requested."
                    );
                }, 500);
            }
        );
    }


    /* =====================================================
       23. ACTIVE NAVIGATION FROM HASH
       ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {
            const sectionId =
                window.location.hash.replace(
                    "#",
                    ""
                );

            if (
                sectionId &&
                document.getElementById(sectionId)
            ) {
                showSection(sectionId);
            }
        }
    );


    /* =====================================================
       24. PREVENT EMPTY ANCHOR JUMPS
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {
            link.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );
        });


    /* =====================================================
       25. DEBUG MESSAGE
       ===================================================== */

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );
});

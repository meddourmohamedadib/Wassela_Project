```javascript
/* =========================================================
   WASSLA - TEACHER DASHBOARD
   Simple Frontend Prototype
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =====================================================
       HELPERS
       ===================================================== */

    function $(selector, parent) {
        return (parent || document).querySelector(selector);
    }

    function $$(selector, parent) {
        return Array.prototype.slice.call(
            (parent || document).querySelectorAll(selector)
        );
    }

    function showToast(message) {
        var toast = $("#toast");
        var toastMessage = $("#toastMessage");

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.wasslaToastTimer);

        window.wasslaToastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }

    /* =====================================================
       ELEMENTS
       ===================================================== */

    var sidebar = $("#teacherSidebar");
    var overlay = $("#sidebarOverlay");
    var mobileMenuBtn = $("#mobileMenuBtn");
    var pageTitle = $("#pageTitle");

    var navItems = $$(".nav-item[data-section]");
    var sectionButtons = $$("[data-section-target]");
    var sections = $$("section.page-section");

    var searchBtn = $("#searchBtn");
    var notificationBtn = $("#notificationBtn");
    var languageSelect = $("#languageSelect");

    var studentSearch = $("#studentSearch");

    var courseForm = $("#courseForm");
    var previewCourseBtn = $("#previewCourseBtn");

    var previewModal = $("#coursePreviewModal");
    var closePreviewBtn = $("#closeCoursePreview");

    var compactSidebarToggle =
        $("#compactSidebarToggle");

    var courseGrid = $(".course-grid");

    /* =====================================================
       SECTION TITLES
       ===================================================== */

    var sectionTitles = {
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
       SIDEBAR
       ===================================================== */

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
        mobileMenuBtn.addEventListener("click", function () {
            if (!sidebar) {
                return;
            }

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

    /* =====================================================
       NAVIGATION
       ===================================================== */

    function showSection(sectionId) {
        if (!sectionId) {
            return;
        }

        var target = document.getElementById(sectionId);

        if (!target) {
            console.warn(
                "Wassla: section not found:",
                sectionId
            );
            return;
        }

        sections.forEach(function (section) {
            section.classList.remove("active-section");
            section.style.display = "none";
        });

        target.classList.add("active-section");
        target.style.display = "block";

        navItems.forEach(function (item) {
            item.classList.toggle(
                "active",
                item.getAttribute("data-section") === sectionId
            );
        });

        if (pageTitle) {
            pageTitle.textContent =
                sectionTitles[sectionId] ||
                "Teacher Dashboard";
        }

        closeSidebar();

        window.scrollTo(0, 0);
    }

    navItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            showSection(
                item.getAttribute("data-section")
            );
        });
    });

    sectionButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            showSection(
                button.getAttribute("data-section-target")
            );
        });
    });

    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            showSection("students");

            setTimeout(function () {
                if (studentSearch) {
                    studentSearch.focus();
                }
            }, 200);
        });
    }

    if (studentSearch) {
        studentSearch.addEventListener("input", function () {
            var value =
                studentSearch.value
                    .trim()
                    .toLowerCase();

            var rows =
                $$(".students-table tbody tr");

            rows.forEach(function (row) {
                var text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.indexOf(value) !== -1
                        ? ""
                        : "none";
            });
        });
    }

    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    if (notificationBtn) {
        notificationBtn.addEventListener("click", function () {
            showToast(
                "You have new notifications."
            );
        });
    }

    /* =====================================================
       LANGUAGE
       ===================================================== */

    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            var option =
                languageSelect.options[
                    languageSelect.selectedIndex
                ];

            showToast(
                "Language changed to " +
                (option ? option.text : "Language") +
                "."
            );
        });
    }

    /* =====================================================
       COURSE STORAGE
       ===================================================== */

    var STORAGE_KEY =
        "wassla_teacher_courses";

    function getCourses() {
        try {
            var saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return [];
            }

            var courses = JSON.parse(saved);

            return Array.isArray(courses)
                ? courses
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

    /* =====================================================
       COURSE ICON
       ===================================================== */

    function getCourseIcon(category) {
        var value =
            String(category || "").toLowerCase();

        if (value.indexOf("artificial") !== -1) {
            return "fa-brain";
        }

        if (value.indexOf("program") !== -1) {
            return "fa-code";
        }

        if (value.indexOf("math") !== -1) {
            return "fa-calculator";
        }

        if (value.indexOf("computer") !== -1) {
            return "fa-laptop-code";
        }

        return "fa-book-open";
    }

    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {
        var div =
            document.createElement("div");

        div.textContent =
            value === null || value === undefined
                ? ""
                : String(value);

        return div.innerHTML;
    }

    /* =====================================================
       CREATE COURSE CARD
       ===================================================== */

    function createCourseCard(course) {
        var article =
            document.createElement("article");

        article.className = "course-card";

        article.innerHTML =
            '<div class="course-card-icon">' +
                '<i class="fa-solid ' +
                getCourseIcon(course.category) +
                '"></i>' +
            '</div>' +

            '<div class="course-card-body">' +

                '<span class="course-category">' +
                    escapeHTML(course.category) +
                '</span>' +

                '<h3>' +
                    escapeHTML(course.title) +
                '</h3>' +

                '<p>' +
                    escapeHTML(course.description) +
                '</p>' +

                '<div class="course-meta">' +
                    '<span>' +
                        '<i class="fa-solid fa-users"></i>' +
                        ' 0 students' +
                    '</span>' +

                    '<span>' +
                        '<i class="fa-solid fa-layer-group"></i>' +
                        ' ' +
                        escapeHTML(
                            String(course.lessons || "—")
                        ) +
                        ' lessons' +
                    '</span>' +
                '</div>' +

                '<div class="course-progress">' +
                    '<div>' +
                        '<span>Student progress</span>' +
                        '<strong>0%</strong>' +
                    '</div>' +

                    '<div class="progress-bar">' +
                        '<span style="width:0%;"></span>' +
                    '</div>' +
                '</div>' +

                '<small class="course-duration">' +
                    '<i class="fa-regular fa-clock"></i>' +
                    ' ' +
                    escapeHTML(
                        String(course.duration || "—")
                    ) +
                '</small>' +

                '<button ' +
                    'class="delete-course-btn" ' +
                    'type="button">' +
                    '<i class="fa-solid fa-trash"></i>' +
                    ' Delete Course' +
                '</button>' +

            '</div>' +

            '<button ' +
                'class="course-action" ' +
                'type="button">' +
                '<i class="fa-solid fa-ellipsis-vertical"></i>' +
            '</button>';

        var actionButton =
            $(".course-action", article);

        if (actionButton) {
            actionButton.addEventListener(
                "click",
                function () {
                    showToast(
                        "Course options selected."
                    );
                }
            );
        }

        var deleteButton =
            $(".delete-course-btn", article);

        if (deleteButton) {
            deleteButton.addEventListener(
                "click",
                function () {
                    var courses =
                        getCourses();

                    var updatedCourses =
                        courses.filter(
                            function (savedCourse) {
                                return (
                                    savedCourse.id !==
                                    course.id
                                );
                            }
                        );

                    saveCourses(updatedCourses);

                    article.remove();

                    updateCourseCount();

                    showToast(
                        "Course deleted successfully."
                    );
                }
            );
        }

        return article;
    }

    /* =====================================================
       LOAD COURSES
       ===================================================== */

    function loadSavedCourses() {
        if (!courseGrid) {
            return;
        }

        var courses =
            getCourses();

        courses.forEach(function (course) {
            courseGrid.appendChild(
                createCourseCard(course)
            );
        });
    }

    /* =====================================================
       COURSE COUNT
       ===================================================== */

    function updateCourseCount() {
        var element =
            document.querySelector(
                ".stats-grid .stat-card:first-child .stat-info strong"
            );

        if (!element) {
            return;
        }

        element.textContent =
            3 + getCourses().length;
    }

    /* =====================================================
       COURSE FORM
       ===================================================== */

    function getCourseFormData() {
        return {
            title:
                $("#courseTitle")
                    ? $("#courseTitle").value.trim()
                    : "",

            category:
                $("#courseCategory")
                    ? $("#courseCategory").value
                    : "",

            level:
                $("#courseLevel")
                    ? $("#courseLevel").value
                    : "",

            description:
                $("#courseDescription")
                    ? $("#courseDescription").value.trim()
                    : "",

            lessons:
                $("#lessonCount")
                    ? $("#lessonCount").value
                    : "",

            duration:
                $("#courseDuration")
                    ? $("#courseDuration").value.trim()
                    : ""
        };
    }

    /* =====================================================
       PREVIEW
       ===================================================== */

    function openPreview() {
        if (!previewModal) {
            return;
        }

        var course =
            getCourseFormData();

        if (!course.title) {
            showToast(
                "Please enter a course title."
            );

            if ($("#courseTitle")) {
                $("#courseTitle").focus();
            }

            return;
        }

        if ($("#previewTitle")) {
            $("#previewTitle").textContent =
                course.title;
        }

        if ($("#previewDescription")) {
            $("#previewDescription").textContent =
                course.description ||
                "No description provided.";
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
                    ? course.lessons + " lessons"
                    : "—";
        }

        if ($("#previewDuration")) {
            $("#previewDuration").textContent =
                course.duration || "—";
        }

        previewModal.classList.add("active");

        previewModal.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    function closePreview() {
        if (!previewModal) {
            return;
        }

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
            function (event) {
                if (event.target === previewModal) {
                    closePreview();
                }
            }
        );
    }

    /* =====================================================
       CREATE COURSE
       ===================================================== */

    if (courseForm) {
        courseForm.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                var course =
                    getCourseFormData();

                if (!course.title) {
                    showToast(
                        "Please enter a course title."
                    );
                    return;
                }

                if (!course.category) {
                    showToast(
                        "Please select a category."
                    );
                    return;
                }

                if (!course.level) {
                    showToast(
                        "Please select a level."
                    );
                    return;
                }

                if (!course.description) {
                    showToast(
                        "Please enter a course description."
                    );
                    return;
                }

                if (!course.lessons) {
                    showToast(
                        "Please enter the number of lessons."
                    );
                    return;
                }

                if (!course.duration) {
                    showToast(
                        "Please enter the estimated duration."
                    );
                    return;
                }

                var courses =
                    getCourses();

                var newCourse = {
                    id: Date.now(),
                    title: course.title,
                    category: course.category,
                    level: course.level,
                    description: course.description,
                    lessons: course.lessons,
                    duration: course.duration
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

                setTimeout(function () {
                    showSection("courses");
                }, 500);
            }
        );
    }

    /* =====================================================
       LIVE SESSIONS
       ===================================================== */

    var createSessionBtn =
        $("#createSessionBtn");

    if (createSessionBtn) {
        createSessionBtn.addEventListener(
            "click",
            function () {
                showToast(
                    "New session creation is ready."
                );
            }
        );
    }

    /* =====================================================
       RESOURCES
       ===================================================== */

    var uploadResourceBtn =
        $("#uploadResourceBtn");

    if (uploadResourceBtn) {
        uploadResourceBtn.addEventListener(
            "click",
            function () {
                showToast(
                    "Add Resource selected."
                );
            }
        );
    }

    /* =====================================================
       COMPACT SIDEBAR
       ===================================================== */

    if (compactSidebarToggle) {
        compactSidebarToggle.addEventListener(
            "change",
            function () {
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

    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Escape") {
                closeSidebar();
                closePreview();
            }
        }
    );

    /* =====================================================
       START
       ===================================================== */

    loadSavedCourses();
    updateCourseCount();
    showSection("dashboard");

    console.log(
        "Wassla Teacher Dashboard initialized successfully."
    );
});
```


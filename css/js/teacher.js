/* =========================================================
   WASSLA — TEACHER DASHBOARD
   Teacher dashboard interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const toast = $("#toast");
  const toastMessage = $("#toastMessage");

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  function closeSidebar() {
    teacherSidebar?.classList.remove("open");
    sidebarOverlay?.classList.remove("show");
  }

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const teacherSidebar = $("#teacherSidebar");
  const sidebarOverlay = $("#sidebarOverlay");
  const mobileMenuBtn = $("#mobileMenuBtn");

  const navItems = $$(".nav-item");
  const sectionTargets = $$("[data-section-target]");
  const sections = $$("section[id]");

  const pageTitle = $("#pageTitle");

  const searchBtn = $("#searchBtn");
  const notificationBtn = $("#notificationBtn");
  const languageSelect = $("#languageSelect");

  const courseForm = $("#courseForm");
  const previewCourseBtn = $("#previewCourseBtn");

  const coursePreviewModal = $("#coursePreviewModal");
  const closeCoursePreview = $("#closeCoursePreview");

  const studentSearch = $("#studentSearch");

  const createSessionBtn = $("#createSessionBtn");
  const uploadResourceBtn = $("#uploadResourceBtn");

  const compactSidebarToggle = $("#compactSidebarToggle");

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
     SHOW SECTION
     ========================================================= */

  function showSection(sectionId) {
    if (!sectionId) return;

    let targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      console.warn(`Section "${sectionId}" was not found.`);
      return;
    }

    sections.forEach((section) => {
      section.classList.remove("active-section");

      if (section.id === sectionId) {
        section.classList.add("active-section");
      }
    });

    navItems.forEach((item) => {
      item.classList.toggle(
        "active",
        item.dataset.section === sectionId
      );
    });

    if (pageTitle) {
      pageTitle.textContent =
        sectionTitles[sectionId] || "Teacher Dashboard";
    }

    closeSidebar();

    if (window.location.hash !== `#${sectionId}`) {
      history.replaceState(null, "", `#${sectionId}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* =========================================================
     SIDEBAR NAVIGATION
     ========================================================= */

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionId = item.dataset.section;

      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  /* =========================================================
     DASHBOARD BUTTONS
     ========================================================= */

  sectionTargets.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionId = button.dataset.sectionTarget;

      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  if (mobileMenuBtn && teacherSidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      teacherSidebar.classList.toggle("open");
      sidebarOverlay?.classList.toggle("show");
    });
  }

  sidebarOverlay?.addEventListener("click", closeSidebar);

  /* =========================================================
     HASH NAVIGATION
     ========================================================= */

  function loadHashSection() {
    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
      showSection(hash);
    } else if (document.getElementById("dashboard")) {
      showSection("dashboard");
    }
  }

  window.addEventListener("hashchange", loadHashSection);

  /* =========================================================
     SEARCH
     ========================================================= */

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      showSection("students");

      setTimeout(() => {
        studentSearch?.focus();
      }, 300);
    });
  }

  /* =========================================================
     STUDENT SEARCH
     ========================================================= */

  if (studentSearch) {
    studentSearch.addEventListener("input", () => {
      const searchValue = studentSearch.value
        .trim()
        .toLowerCase();

      const rows = $$(".students-table tbody tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();

        row.style.display =
          text.includes(searchValue) ? "" : "none";
      });
    });
  }

  /* =========================================================
     NOTIFICATIONS
     ========================================================= */

  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      showToast("You have new notifications.");
    });
  }

  /* =========================================================
     LANGUAGE
     ========================================================= */

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const selectedLanguage =
        languageSelect.options[
          languageSelect.selectedIndex
        ]?.text || "Language";

      showToast(`Language changed to ${selectedLanguage}.`);
    });
  }

  /* =========================================================
     COURSE FORM
     ========================================================= */

  if (courseForm) {
    courseForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = $("#courseTitle")?.value.trim();
      const category = $("#courseCategory")?.value;
      const level = $("#courseLevel")?.value;
      const description = $("#courseDescription")?.value.trim();
      const lessons = $("#lessonCount")?.value;
      const duration = $("#courseDuration")?.value;

      if (!title) {
        showToast("Please enter a course title.");
        $("#courseTitle")?.focus();
        return;
      }

      if (!category) {
        showToast("Please select a category.");
        $("#courseCategory")?.focus();
        return;
      }

      if (!level) {
        showToast("Please select a level.");
        $("#courseLevel")?.focus();
        return;
      }

      if (!description) {
        showToast("Please enter a course description.");
        $("#courseDescription")?.focus();
        return;
      }

      showToast("Course created successfully!");

      courseForm.reset();

      setTimeout(() => {
        showSection("courses");
      }, 700);
    });
  }

  /* =========================================================
     COURSE PREVIEW
     ========================================================= */

  function openCoursePreview() {
    if (!coursePreviewModal) return;

    const title =
      $("#courseTitle")?.value.trim() || "Course Title";

    const description =
      $("#courseDescription")?.value.trim() ||
      "Course description will appear here.";

    const category =
      $("#courseCategory")?.selectedOptions?.[0]?.text ||
      "—";

    const level =
      $("#courseLevel")?.selectedOptions?.[0]?.text ||
      "—";

    const lessons =
      $("#lessonCount")?.value || "—";

    const duration =
      $("#courseDuration")?.value || "—";

    if ($("#previewTitle")) {
      $("#previewTitle").textContent = title;
    }

    if ($("#previewDescription")) {
      $("#previewDescription").textContent = description;
    }

    if ($("#previewCategory")) {
      $("#previewCategory").textContent = category;
    }

    if ($("#previewLevel")) {
      $("#previewLevel").textContent = level;
    }

    if ($("#previewLessons")) {
      $("#previewLessons").textContent = lessons;
    }

    if ($("#previewDuration")) {
      $("#previewDuration").textContent = duration;
    }

    coursePreviewModal.classList.add("show");
    coursePreviewModal.setAttribute("aria-hidden", "false");
  }

  function closeCoursePreviewModal() {
    if (!coursePreviewModal) return;

    coursePreviewModal.classList.remove("show");
    coursePreviewModal.setAttribute("aria-hidden", "true");
  }

  previewCourseBtn?.addEventListener(
    "click",
    openCoursePreview
  );

  closeCoursePreview?.addEventListener(
    "click",
    closeCoursePreviewModal
  );

  coursePreviewModal?.addEventListener("click", (event) => {
    if (event.target === coursePreviewModal) {
      closeCoursePreviewModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCoursePreviewModal();
      closeSidebar();
    }
  });

  /* =========================================================
     COURSE ACTION BUTTONS
     ========================================================= */

  $$(".course-action").forEach((button) => {
    button.addEventListener("click", () => {
      const courseCard = button.closest(".course-card");

      if (!courseCard) {
        showToast("Course action selected.");
        return;
      }

      const courseName =
        $(".course-title", courseCard)?.textContent ||
        "Course";

      showToast(`${courseName} action selected.`);
    });
  });

  /* =========================================================
     LIVE SESSIONS
     ========================================================= */

  createSessionBtn?.addEventListener("click", () => {
    showToast("New session creation is ready.");
  });

  $$("#live-sessions .secondary-btn").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Session details opened.");
    });
  });

  /* =========================================================
     RESOURCES
     ========================================================= */

  uploadResourceBtn?.addEventListener("click", () => {
    showToast("Add Resource selected.");
  });

  $$("#resources .resource-card button").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Resource action selected.");
    });
  });

  /* =========================================================
     SETTINGS
     ========================================================= */

  $$("#settings input[type='checkbox']").forEach((checkbox) => {
    if (checkbox === compactSidebarToggle) return;

    checkbox.addEventListener("change", () => {
      const label =
        checkbox.closest("label")?.textContent.trim() ||
        "Setting";

      showToast(
        `${label}: ${checkbox.checked ? "On" : "Off"}`
      );
    });
  });

  /* =========================================================
     COMPACT SIDEBAR
     ========================================================= */

  compactSidebarToggle?.addEventListener("change", () => {
    if (!teacherSidebar) return;

    teacherSidebar.classList.toggle(
      "compact",
      compactSidebarToggle.checked
    );

    showToast(
      compactSidebarToggle.checked
        ? "Compact sidebar enabled."
        : "Compact sidebar disabled."
    );
  });

  /* =========================================================
     PROGRESS BARS
     ========================================================= */

  $$(".progress-bar").forEach((bar) => {
    const value =
      bar.dataset.progress ||
      bar.getAttribute("aria-valuenow");

    if (value !== null && value !== undefined) {
      const progress = Math.min(
        100,
        Math.max(0, Number(value))
      );

      const fill =
        $(".progress-fill", bar) ||
        $(".progress-bar-fill", bar);

      if (fill) {
        fill.style.width = `${progress}%`;
      }
    }
  });

  /* =========================================================
     INITIAL STATE
     ========================================================= */

  loadHashSection();

  console.log(
    "Wassla Teacher Dashboard initialized successfully."
  );
});

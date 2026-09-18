/* =========================================================
   WASSLA — TEACHER DASHBOARD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const teacherSidebar = $("#teacherSidebar");
  const sidebarOverlay = $("#sidebarOverlay");
  const mobileMenuBtn = $("#mobileMenuBtn");

  const navItems = $$(".nav-item");
  const sectionTargets = $$("[data-section-target]");
  const sections = $$("section.page-section");

  const pageTitle = $("#pageTitle");

  const searchBtn = $("#searchBtn");
  const notificationBtn = $("#notificationBtn");
  const languageSelect = $("#languageSelect");

  const studentSearch = $("#studentSearch");

  const toast = $("#toast");
  const toastMessage = $("#toastMessage");

  const compactSidebarToggle =
    $("#compactSidebarToggle");

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
     TOAST
     ========================================================= */

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* =========================================================
     SIDEBAR
     ========================================================= */

  function closeSidebar() {
    if (teacherSidebar) {
      teacherSidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("show");
      sidebarOverlay.classList.remove("active");
    }
  }

  if (mobileMenuBtn && teacherSidebar) {
    mobileMenuBtn.addEventListener("click", function () {
      teacherSidebar.classList.toggle("open");

      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle("show");
        sidebarOverlay.classList.toggle("active");
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  /* =========================================================
     MAIN NAVIGATION — FINAL FIX
     ========================================================= */

  function showSection(sectionId) {
    if (!sectionId) return;

    const targetSection =
      document.getElementById(sectionId);

    if (!targetSection) {
      console.warn(
        "Section not found:",
        sectionId
      );
      return;
    }

    /* Hide every section */
    sections.forEach(function (section) {
      section.classList.remove("active-section");

      /* Direct JS control */
      section.style.display = "none";
    });

    /* Show selected section */
    targetSection.classList.add("active-section");
    targetSection.style.display = "block";

    /* Update sidebar active item */
    navItems.forEach(function (item) {
      item.classList.toggle(
        "active",
        item.dataset.section === sectionId
      );
    });

    /* Update title */
    if (pageTitle) {
      pageTitle.textContent =
        sectionTitles[sectionId] ||
        "Teacher Dashboard";
    }

    closeSidebar();

    /* Update URL */
    if (
      window.location.hash !==
      "#" + sectionId
    ) {
      history.replaceState(
        null,
        "",
        "#" + sectionId
      );
    }

    window.scrollTo(0, 0);
  }

  /* =========================================================
     SIDEBAR BUTTONS
     ========================================================= */

  navItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      const sectionId =
        item.getAttribute("data-section");

      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  /* =========================================================
     DASHBOARD BUTTONS
     ========================================================= */

  sectionTargets.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const sectionId =
        button.getAttribute(
          "data-section-target"
        );

      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  /* =========================================================
     HASH
     ========================================================= */

  function loadHashSection() {
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
    loadHashSection
  );

  /* =========================================================
     SEARCH
     ========================================================= */

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
    studentSearch.addEventListener(
      "input",
      function () {
        const value =
          studentSearch.value
            .trim()
            .toLowerCase();

        const rows =
          $$(".students-table tbody tr");

        rows.forEach(function (row) {
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
      function () {
        showToast(
          "You have new notifications."
        );
      }
    );
  }

  /* =========================================================
     LANGUAGE
     ========================================================= */

  if (languageSelect) {
    languageSelect.addEventListener(
      "change",
      function () {
        const selected =
          languageSelect.options[
            languageSelect.selectedIndex
          ]?.text || "Language";

        showToast(
          "Language changed to " +
          selected +
          "."
        );
      }
    );
  }

  /* =========================================================
     CREATE COURSE
     ========================================================= */

  const courseForm = $("#courseForm");

  if (courseForm) {
    courseForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        const title =
          $("#courseTitle")?.value.trim();

        const category =
          $("#courseCategory")?.value;

        const level =
          $("#courseLevel")?.value;

        const description =
          $("#courseDescription")?.value.trim();

        if (!title) {
          showToast(
            "Please enter a course title."
          );
          $("#courseTitle")?.focus();
          return;
        }

        if (!category) {
          showToast(
            "Please select a category."
          );
          return;
        }

        if (!level) {
          showToast(
            "Please select a level."
          );
          return;
        }

        if (!description) {
          showToast(
            "Please enter a course description."
          );
          return;
        }

        showToast(
          "Course created successfully!"
        );

        courseForm.reset();

        setTimeout(function () {
          showSection("courses");
        }, 700);
      }
    );
  }

  /* =========================================================
     COURSE ACTIONS
     ========================================================= */

  $$(".course-action").forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          showToast(
            "Course action selected."
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
      function () {
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
      function () {
        showToast(
          "Add Resource selected."
        );
      }
    );
  }

  /* =========================================================
     SETTINGS
     ========================================================= */

  if (compactSidebarToggle) {
    compactSidebarToggle.addEventListener(
      "change",
      function () {
        if (teacherSidebar) {
          teacherSidebar.classList.toggle(
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
     ESCAPE
     ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }
  );

  /* =========================================================
     INITIALIZE
     ========================================================= */

  loadHashSection();

  console.log(
    "Wassla Teacher Dashboard initialized successfully."
  );
});

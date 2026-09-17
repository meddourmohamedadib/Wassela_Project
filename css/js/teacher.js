```javascript
/* =================================
   WASSLA - TEACHER DASHBOARD
   ================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       SIDEBAR NAVIGATION
       =============================== */

    const navLinks = document.querySelectorAll(".teacher-nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });
    });


    /* ===============================
       NOTIFICATION BUTTON
       =============================== */

    const notificationBtn = document.querySelector(".notification-btn");

    if (notificationBtn) {
        notificationBtn.addEventListener("click", function () {
            alert("You have no new notifications.");
        });
    }


    /* ===============================
       COURSE STATUS
       =============================== */

    const courseItems = document.querySelectorAll(".course-item");

    courseItems.forEach(course => {

        course.addEventListener("click", function () {

            const title = this.querySelector(".course-title");

            if (title) {
                console.log("Selected course:", title.textContent);
            }

        });

    });


    /* ===============================
       QUICK ACTIONS
       =============================== */

    const quickActions = document.querySelectorAll(".quick-action");

    quickActions.forEach(action => {

        action.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();

                const title = this.querySelector("h4");

                if (title) {
                    alert("Opening: " + title.textContent);
                }
            }

        });

    });


    /* ===============================
       PRIMARY BUTTONS
       =============================== */

    const primaryButtons = document.querySelectorAll(".btn-primary");

    primaryButtons.forEach(button => {

        button.addEventListener("click", function () {

            console.log("Button clicked:", this.textContent.trim());

        });

    });


    /* ===============================
       STUDENT PROGRESS
       =============================== */

    const progressBars = document.querySelectorAll(".progress-fill");

    progressBars.forEach(bar => {

        const width = bar.style.width;

        if (width) {
            bar.style.width = "0%";

            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }

    });


    /* ===============================
       PROFILE
       =============================== */

    const profile = document.querySelector(".sidebar-profile");

    if (profile) {

        profile.addEventListener("click", function () {
            console.log("Teacher profile opened.");
        });

        profile.style.cursor = "pointer";
    }


    /* ===============================
       CONSOLE MESSAGE
       =============================== */

    console.log("Wassla Teacher Dashboard loaded successfully.");

});
```


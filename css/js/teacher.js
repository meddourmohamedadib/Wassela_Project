/* =========================================================
   WASSLA — TEACHER DASHBOARD
   teacher.css
   ========================================================= */

/* =========================
   1. ROOT VARIABLES
   ========================= */

:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --primary-light: #eff6ff;

    --accent: #7c3aed;
    --accent-light: #f5f3ff;

    --success: #16a34a;
    --success-light: #f0fdf4;

    --warning: #f59e0b;
    --warning-light: #fffbeb;

    --danger: #ef4444;
    --danger-light: #fef2f2;

    --sidebar: #0f172a;
    --sidebar-hover: #1e293b;
    --sidebar-active: #2563eb;

    --text: #0f172a;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --text-light: #94a3b8;

    --background: #f6f8fc;
    --surface: #ffffff;
    --border: #e5e7eb;
    --border-light: #eef2f7;

    --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
    --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.07);
    --shadow-lg: 0 16px 40px rgba(15, 23, 42, 0.12);

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 18px;
    --radius-xl: 24px;

    --sidebar-width: 280px;
    --topbar-height: 82px;

    --transition: 0.25s ease;
}


/* =========================
   2. RESET
   ========================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "Cairo", sans-serif;
    background: var(--background);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

button,
input,
select,
textarea {
    font-family: inherit;
}

button {
    border: 0;
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
}

img {
    display: block;
    max-width: 100%;
}

ul {
    list-style: none;
}


/* =========================
   3. SCROLLBAR
   ========================= */

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}


/* =========================
   4. MAIN APP
   ========================= */

.teacher-app {
    min-height: 100vh;
    width: 100%;
}


/* =========================
   5. SIDEBAR
   ========================= */

.teacher-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;

    background: var(--sidebar);
    color: #ffffff;

    display: flex;
    flex-direction: column;

    z-index: 1000;

    border-right: 1px solid rgba(255, 255, 255, 0.05);

    transition: transform var(--transition);
}


/* ---------- Brand ---------- */

.sidebar-brand {
    padding: 25px 24px 20px;
}

.brand-link {
    display: flex;
    align-items: center;
    gap: 12px;
}

.sidebar-logo {
    width: 42px;
    height: 42px;
    object-fit: contain;
    border-radius: 10px;
}

.brand-text {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #ffffff;
}


/* ---------- Profile ---------- */

.sidebar-profile {
    margin: 4px 18px 20px;
    padding: 14px;

    display: flex;
    align-items: center;
    gap: 12px;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.06);

    border-radius: 14px;
}

.profile-avatar {
    width: 44px;
    height: 44px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: linear-gradient(
        135deg,
        var(--primary),
        var(--accent)
    );

    color: #ffffff;
    font-size: 15px;
    font-weight: 800;
}

.profile-info {
    min-width: 0;
}

.profile-info strong {
    display: block;

    color: #ffffff;
    font-size: 13px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.profile-info span {
    display: block;

    margin-top: 2px;

    color: #94a3b8;
    font-size: 11px;

    white-space: nowrap;
}


/* =========================
   6. SIDEBAR NAVIGATION
   ========================= */

.sidebar-nav {
    flex: 1;

    padding: 0 14px;

    overflow-y: auto;
}

.nav-label {
    display: block;

    padding: 8px 12px 10px;

    color: #64748b;
    font-size: 10px;
    font-weight: 800;

    text-transform: uppercase;
    letter-spacing: 1px;
}

.nav-item {
    width: 100%;

    min-height: 46px;

    display: flex;
    align-items: center;
    gap: 13px;

    padding: 11px 13px;

    margin-bottom: 4px;

    background: transparent;
    color: #94a3b8;

    border-radius: 11px;

    font-size: 13px;
    font-weight: 600;

    transition:
        background var(--transition),
        color var(--transition),
        transform var(--transition);
}

.nav-item i {
    width: 19px;

    text-align: center;

    font-size: 15px;

    flex-shrink: 0;
}

.nav-item:hover {
    background: var(--sidebar-hover);
    color: #ffffff;

    transform: translateX(2px);
}

.nav-item.active {
    background: linear-gradient(
        135deg,
        var(--primary),
        #3b82f6
    );

    color: #ffffff;

    box-shadow:
        0 6px 18px rgba(37, 99, 235, 0.25);
}


/* ---------- Bottom ---------- */

.sidebar-bottom {
    padding: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.logout-item {
    color: #fca5a5;
}

.logout-item:hover {
    color: #ffffff;
    background: rgba(239, 68, 68, 0.12);
}


/* =========================
   7. MAIN CONTENT
   ========================= */

.teacher-main {
    min-height: 100vh;

    margin-left: var(--sidebar-width);

    background: var(--background);
}


/* =========================
   8. TOPBAR
   ========================= */

.teacher-topbar {
    position: sticky;
    top: 0;

    min-height: var(--topbar-height);

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 32px;

    background: rgba(255, 255, 255, 0.94);

    border-bottom: 1px solid var(--border);

    backdrop-filter: blur(12px);

    z-index: 500;
}

.topbar-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.mobile-menu-btn {
    display: none;

    width: 42px;
    height: 42px;

    align-items: center;
    justify-content: center;

    background: var(--surface);

    color: var(--text);

    border: 1px solid var(--border);

    border-radius: 10px;

    font-size: 17px;
}

.page-heading {
    display: flex;
    flex-direction: column;
}

.page-kicker {
    color: var(--text-muted);

    font-size: 10px;
    font-weight: 700;

    text-transform: uppercase;
    letter-spacing: 0.8px;
}

#pageTitle {
    margin-top: 1px;

    color: var(--text);

    font-size: 21px;
    font-weight: 800;

    line-height: 1.3;
}

.topbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.topbar-icon-btn {
    position: relative;

    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--surface);

    color: var(--text-secondary);

    border: 1px solid var(--border);

    border-radius: 10px;

    transition: var(--transition);
}

.topbar-icon-btn:hover {
    color: var(--primary);
    border-color: #bfdbfe;
    background: var(--primary-light);
}

.notification-btn {
    position: relative;
}

.notification-dot {
    position: absolute;

    top: 8px;
    right: 8px;

    width: 7px;
    height: 7px;

    background: var(--danger);

    border: 2px solid #ffffff;

    border-radius: 50%;
}

.language-select {
    height: 42px;

    padding: 0 12px;

    background: var(--surface);

    color: var(--text-secondary);

    border: 1px solid var(--border);

    border-radius: 10px;

    font-size: 12px;
    font-weight: 600;

    outline: none;

    cursor: pointer;
}


/* =========================
   9. CONTENT
   ========================= */

.teacher-content {
    padding: 30px 32px 50px;
}


/* =========================
   10. PAGE SECTIONS
   ========================= */

.page-section {
    display: none;

    animation: sectionFade 0.25s ease;
}

.page-section.active-section {
    display: block;
}

@keyframes sectionFade {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


/* =========================
   11. WELCOME CARD
   ========================= */

.welcome-card {
    position: relative;

    min-height: 220px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 34px 38px;

    overflow: hidden;

    background:
        linear-gradient(
            135deg,
            #0f172a 0%,
            #172554 55%,
            #1d4ed8 100%
        );

    border-radius: var(--radius-xl);

    color: #ffffff;

    box-shadow: var(--shadow-md);
}

.welcome-card::before {
    content: "";

    position: absolute;

    width: 260px;
    height: 260px;

    right: -90px;
    top: -100px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.07);
}

.welcome-card::after {
    content: "";

    position: absolute;

    width: 180px;
    height: 180px;

    right: 160px;
    bottom: -130px;

    border-radius: 50%;

    background: rgba(124, 58, 237, 0.22);
}

.welcome-content {
    position: relative;
    z-index: 2;

    max-width: 650px;
}

.welcome-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    padding: 6px 10px;

    margin-bottom: 12px;

    background: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.12);

    border-radius: 999px;

    color: #dbeafe;

    font-size: 11px;
    font-weight: 700;
}

.welcome-content h2 {
    font-size: clamp(23px, 3vw, 32px);
    font-weight: 800;

    line-height: 1.3;

    margin-bottom: 10px;
}

.welcome-content p {
    max-width: 590px;

    color: #cbd5e1;

    font-size: 13px;
    line-height: 1.8;
}

.welcome-visual {
    position: relative;
    z-index: 2;

    width: 130px;
    height: 130px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
}

.welcome-icon {
    width: 92px;
    height: 92px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.13);

    border-radius: 26px;

    color: #ffffff;

    font-size: 38px;

    transform: rotate(4deg);

    backdrop-filter: blur(10px);
}


/* =========================
   12. STATS GRID
   ========================= */

.stats-grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 16px;

    margin-top: 22px;
}

.stat-card {
    min-width: 0;

    display: flex;
    align-items: center;
    gap: 15px;

    padding: 20px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    transition:
        transform var(--transition),
        box-shadow var(--transition);
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.stat-icon {
    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 14px;

    font-size: 19px;
}

.stat-card:nth-child(2) .stat-icon {
    background: var(--accent-light);
    color: var(--accent);
}

.stat-card:nth-child(3) .stat-icon {
    background: var(--success-light);
    color: var(--success);
}

.stat-card:nth-child(4) .stat-icon {
    background: var(--warning-light);
    color: var(--warning);
}

.stat-info {
    min-width: 0;
}

.stat-info strong {
    display: block;

    color: var(--text);

    font-size: 22px;
    font-weight: 800;

    line-height: 1.2;
}

.stat-info span {
    display: block;

    margin-top: 4px;

    color: var(--text-muted);

    font-size: 11px;
    font-weight: 600;
}


/* =========================
   13. DASHBOARD GRID
   ========================= */

.dashboard-grid {
    display: grid;

    grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.85fr);

    gap: 20px;

    margin-top: 22px;
}


/* =========================
   14. DASHBOARD CARDS
   ========================= */

.dashboard-card {
    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    overflow: hidden;
}

.course-performance-card {
    min-width: 0;
}

.ai-insights-card {
    min-width: 0;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 22px 22px 16px;

    border-bottom: 1px solid var(--border-light);
}

.card-kicker {
    color: var(--text-muted);

    font-size: 10px;
    font-weight: 700;

    text-transform: uppercase;
    letter-spacing: 0.7px;
}

.card-header h3 {
    margin-top: 2px;

    font-size: 17px;
    font-weight: 800;
}

.text-btn {
    background: transparent;

    color: var(--primary);

    font-size: 11px;
    font-weight: 700;

    transition: var(--transition);
}

.text-btn:hover {
    color: var(--primary-dark);
}


/* =========================
   15. COURSE PERFORMANCE
   ========================= */

.course-performance-list {
    padding: 4px 22px 18px;
}

.performance-item {
    padding: 18px 0;

    border-bottom: 1px solid var(--border-light);
}

.performance-item:last-child {
    border-bottom: 0;
}

.performance-course {
    display: flex;
    align-items: center;
    gap: 12px;
}

.course-mini-icon {
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 11px;

    font-size: 14px;
}

.performance-course strong {
    display: block;

    color: var(--text);

    font-size: 13px;
    font-weight: 700;
}

.performance-course span {
    display: block;

    margin-top: 2px;

    color: var(--text-muted);

    font-size: 10px;
}

.performance-progress {
    margin-top: 13px;
}

.progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 6px;

    color: var(--text-muted);

    font-size: 10px;
    font-weight: 600;
}

.progress-header strong {
    color: var(--text);

    font-size: 11px;
}

.progress-bar {
    width: 100%;
    height: 7px;

    overflow: hidden;

    background: #edf2f7;

    border-radius: 999px;
}

.progress-bar span {
    display: block;

    height: 100%;

    width: 0;

    background: linear-gradient(
        90deg,
        var(--primary),
        #60a5fa
    );

    border-radius: inherit;
}


/* =========================
   16. AI INSIGHTS
   ========================= */

.ai-insights-card {
    padding-bottom: 20px;
}

.ai-insights-card > .card-header {
    border-bottom: 0;
}

.ai-icon {
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--accent-light);

    color: var(--accent);

    border-radius: 13px;

    font-size: 17px;
}

.ai-insight {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    margin: 0 20px 10px;

    padding: 13px;

    background: #fafbff;

    border: 1px solid var(--border-light);

    border-radius: 12px;
}

.insight-icon {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 9px;

    font-size: 12px;
}

.insight-icon.warning {
    background: var(--warning-light);
    color: var(--warning);
}

.insight-icon.success {
    background: var(--success-light);
    color: var(--success);
}

.ai-insight p {
    color: var(--text-secondary);

    font-size: 11px;
    line-height: 1.7;
}

.ai-insight strong {
    display: block;

    margin-bottom: 2px;

    color: var(--text);

    font-size: 12px;
}

.secondary-btn,
.primary-btn {
    min-height: 42px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 0 16px;

    border-radius: 10px;

    font-size: 12px;
    font-weight: 700;

    transition:
        transform var(--transition),
        box-shadow var(--transition),
        background var(--transition);
}

.secondary-btn {
    background: #f8fafc;

    color: var(--text-secondary);

    border: 1px solid var(--border);
}

.secondary-btn:hover {
    background: #f1f5f9;
}

.primary-btn {
    background: var(--primary);

    color: #ffffff;

    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
}

.primary-btn:hover {
    background: var(--primary-dark);

    transform: translateY(-1px);

    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
}

.full-btn {
    width: calc(100% - 40px);

    margin: 8px 20px 0;
}


/* =========================
   17. RECENT ACTIVITY
   ========================= */

.recent-activity-card {
    margin-top: 20px;
}

.activity-table-wrapper {
    width: 100%;

    overflow-x: auto;
}

.activity-table {
    width: 100%;

    border-collapse: collapse;

    min-width: 650px;
}

.activity-table th {
    padding: 13px 20px;

    background: #fafbfc;

    color: var(--text-muted);

    font-size: 10px;
    font-weight: 700;

    text-align: left;

    border-bottom: 1px solid var(--border);
}

.activity-table td {
    padding: 15px 20px;

    color: var(--text-secondary);

    font-size: 11px;

    border-bottom: 1px solid var(--border-light);
}

.activity-table tbody tr:last-child td {
    border-bottom: 0;
}

.student-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.student-avatar {
    width: 34px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 50%;

    font-size: 10px;
    font-weight: 800;
}

.student-cell strong {
    color: var(--text);

    font-size: 11px;
}

.student-cell span {
    display: block;

    color: var(--text-muted);

    font-size: 9px;
}

.status-badge {
    display: inline-flex;
    align-items: center;

    padding: 4px 9px;

    border-radius: 999px;

    font-size: 9px;
    font-weight: 700;
}

.status-badge.success {
    background: var(--success-light);
    color: var(--success);
}

.status-badge.warning {
    background: var(--warning-light);
    color: #b45309;
}


/* =========================
   18. SECTION INTRO
   ========================= */

.section-intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 20px;

    margin-bottom: 22px;
}

.section-intro h2 {
    font-size: 24px;
    font-weight: 800;
}

.section-intro p {
    max-width: 650px;

    margin-top: 5px;

    color: var(--text-muted);

    font-size: 12px;
}


/* =========================
   19. COURSE GRID
   ========================= */

.course-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 18px;
}

.course-card {
    position: relative;

    display: flex;
    flex-direction: column;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    overflow: hidden;

    box-shadow: var(--shadow-sm);

    transition:
        transform var(--transition),
        box-shadow var(--transition);
}

.course-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.course-card-icon {
    height: 130px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #eff6ff,
            #eef2ff
        );

    color: var(--primary);

    font-size: 34px;
}

.course-card:nth-child(2) .course-card-icon {
    background: linear-gradient(
        135deg,
        #f5f3ff,
        #ede9fe
    );

    color: var(--accent);
}

.course-card:nth-child(3) .course-card-icon {
    background: linear-gradient(
        135deg,
        #ecfdf5,
        #f0fdf4
    );

    color: var(--success);
}

.course-card-body {
    padding: 18px;
}

.course-category {
    display: inline-flex;

    padding: 4px 8px;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 6px;

    font-size: 9px;
    font-weight: 700;
}

.course-card h3 {
    margin-top: 10px;

    color: var(--text);

    font-size: 16px;
    font-weight: 800;
}

.course-card p {
    margin-top: 5px;

    color: var(--text-muted);

    font-size: 11px;

    line-height: 1.7;
}

.course-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    margin-top: 14px;

    color: var(--text-muted);

    font-size: 10px;
}

.course-meta span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.course-meta i {
    color: var(--primary);
}

.course-progress {
    margin-top: 16px;
}

.course-action {
    width: calc(100% - 36px);

    margin: 0 18px 18px;
}


/* =========================
   20. CREATE COURSE FORM
   ========================= */

.form-card {
    max-width: 1000px;

    padding: 26px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);
}

#courseForm {
    margin-top: 4px;
}

.form-grid {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full {
    grid-column: 1 / -1;
}

.form-group label {
    margin-bottom: 7px;

    color: var(--text);

    font-size: 11px;
    font-weight: 700;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;

    padding: 11px 13px;

    background: #ffffff;

    color: var(--text);

    border: 1px solid var(--border);

    border-radius: 10px;

    outline: none;

    font-size: 12px;

    transition:
        border-color var(--transition),
        box-shadow var(--transition);
}

.form-group input,
.form-group select {
    height: 44px;
}

.form-group textarea {
    min-height: 120px;

    resize: vertical;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #a8b1bf;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #93c5fd;

    box-shadow:
        0 0 0 3px rgba(37, 99, 235, 0.08);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    margin-top: 24px;

    padding-top: 20px;

    border-top: 1px solid var(--border-light);
}


/* =========================
   21. STUDENTS
   ========================= */

.student-summary-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 16px;

    margin-bottom: 20px;
}

.mini-stat-card {
    padding: 20px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);
}

.mini-stat-card span {
    display: block;

    color: var(--text-muted);

    font-size: 10px;
    font-weight: 600;
}

.mini-stat-card strong {
    display: block;

    margin-top: 5px;

    color: var(--text);

    font-size: 25px;
    font-weight: 800;
}

.table-search {
    position: relative;

    margin-bottom: 15px;
}

.table-search i {
    position: absolute;

    left: 14px;
    top: 50%;

    transform: translateY(-50%);

    color: var(--text-muted);

    font-size: 12px;
}

#studentSearch {
    width: 100%;

    height: 44px;

    padding: 0 14px 0 38px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: 10px;

    outline: none;

    font-size: 12px;
}

#studentSearch:focus {
    border-color: #93c5fd;

    box-shadow:
        0 0 0 3px rgba(37, 99, 235, 0.08);
}

.students-table {
    width: 100%;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    overflow: hidden;

    border-collapse: separate;
    border-spacing: 0;
}

.students-table th {
    padding: 14px 18px;

    background: #fafbfc;

    color: var(--text-muted);

    font-size: 10px;
    font-weight: 700;

    text-align: left;

    border-bottom: 1px solid var(--border);
}

.students-table td {
    padding: 14px 18px;

    color: var(--text-secondary);

    font-size: 11px;

    border-bottom: 1px solid var(--border-light);
}

.students-table tr:last-child td {
    border-bottom: 0;
}


/* =========================
   22. PROGRESS
   ========================= */

.progress-overview {
    display: grid;

    grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.8fr);

    gap: 20px;
}

.progress-main-card,
.ai-progress-card {
    padding: 25px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);
}

.large-percentage {
    display: flex;
    align-items: baseline;
    gap: 5px;

    margin-top: 10px;

    color: var(--text);

    font-size: 46px;
    font-weight: 800;

    line-height: 1;
}

.large-percentage small {
    color: var(--text-muted);

    font-size: 13px;
    font-weight: 600;
}

.large-progress-bar {
    width: 100%;
    height: 12px;

    margin-top: 18px;

    background: #edf2f7;

    border-radius: 999px;

    overflow: hidden;
}

.large-progress-bar span {
    display: block;

    width: 0;
    height: 100%;

    background: linear-gradient(
        90deg,
        var(--primary),
        var(--accent)
    );

    border-radius: inherit;
}

.ai-progress-card {
    background:
        linear-gradient(
            145deg,
            #ffffff,
            #f8f7ff
        );
}

.ai-progress-card .ai-icon {
    margin-bottom: 14px;
}

.ai-progress-card h3 {
    font-size: 17px;
    font-weight: 800;
}

.ai-progress-card p {
    margin-top: 7px;

    color: var(--text-muted);

    font-size: 11px;
    line-height: 1.8;
}

.progress-course-list {
    margin-top: 25px;
}

.progress-course-item {
    padding: 15px 0;

    border-bottom: 1px solid var(--border-light);
}

.progress-course-item:last-child {
    border-bottom: 0;
}

.progress-course-title {
    display: flex;
    justify-content: space-between;
    gap: 15px;

    margin-bottom: 7px;

    color: var(--text);

    font-size: 11px;
    font-weight: 700;
}


/* =========================
   23. LIVE SESSIONS
   ========================= */

.session-grid {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;
}

.session-card {
    position: relative;

    padding: 21px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    transition: var(--transition);
}

.session-card:hover {
    transform: translateY(-2px);

    box-shadow: var(--shadow-md);
}

.session-card.upcoming {
    border-left: 4px solid var(--primary);
}

.session-date {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 5px 9px;

    background: var(--primary-light);

    color: var(--primary);

    border-radius: 7px;

    font-size: 10px;
    font-weight: 700;
}

.session-content {
    margin-top: 14px;
}

.session-content h3 {
    color: var(--text);

    font-size: 16px;
    font-weight: 800;
}

.session-content p {
    margin-top: 5px;

    color: var(--text-muted);

    font-size: 11px;
}

.session-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    margin-top: 15px;

    color: var(--text-muted);

    font-size: 10px;
}

.session-meta span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.session-status {
    display: inline-flex;

    margin-top: 14px;

    padding: 5px 9px;

    background: var(--success-light);

    color: var(--success);

    border-radius: 7px;

    font-size: 9px;
    font-weight: 700;
}


/* =========================
   24. RESOURCES
   ========================= */

.resource-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 18px;
}

.resource-card {
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 19px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    transition: var(--transition);
}

.resource-card:hover {
    transform: translateY(-2px);

    box-shadow: var(--shadow-md);
}

.resource-icon {
    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 12px;

    font-size: 18px;
}

.resource-icon.pdf {
    background: var(--danger-light);
    color: var(--danger);
}

.resource-icon.video {
    background: var(--primary-light);
    color: var(--primary);
}

.resource-icon.document {
    background: var(--accent-light);
    color: var(--accent);
}

.resource-card h3 {
    color: var(--text);

    font-size: 13px;
    font-weight: 800;
}

.resource-card p {
    margin-top: 3px;

    color: var(--text-muted);

    font-size: 10px;
}


/* =========================
   25. SETTINGS
   ========================= */

.settings-card {
    max-width: 950px;

    background: var(--surface);

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    overflow: hidden;
}

.settings-profile {
    display: flex;
    align-items: center;
    gap: 18px;

    padding: 25px;
}

.large-profile-avatar {
    width: 78px;
    height: 78px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    background:
        linear-gradient(
            135deg,
            var(--primary),
            var(--accent)
        );

    color: #ffffff;

    border-radius: 50%;

    font-size: 23px;
    font-weight: 800;
}

.settings-profile h3 {
    font-size: 18px;
    font-weight: 800;
}

.settings-profile p {
    margin-top: 3px;

    color: var(--text-muted);

    font-size: 11px;
}

.settings-divider {
    height: 1px;

    background: var(--border-light);
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    padding: 20px 25px;

    border-bottom: 1px solid var(--border-light);
}

.setting-row:last-child {
    border-bottom: 0;
}

.setting-row h4 {
    color: var(--text);

    font-size: 12px;
    font-weight: 700;
}

.setting-row p {
    margin-top: 3px;

    color: var(--text-muted);

    font-size: 10px;
}


/* =========================
   26. TOGGLE
   ========================= */

.toggle {
    position: relative;

    width: 46px;
    height: 26px;

    flex-shrink: 0;
}

.toggle input {
    width: 0;
    height: 0;

    opacity: 0;
}

.toggle-slider {
    position: absolute;

    inset: 0;

    background: #cbd5e1;

    border-radius: 999px;

    cursor: pointer;

    transition: var(--transition);
}

.toggle-slider::before {
    content: "";

    position: absolute;

    width: 20px;
    height: 20px;

    left: 3px;
    top: 3px;

    background: #ffffff;

    border-radius: 50%;

    box-shadow: 0 2px 5px rgba(15, 23, 42, 0.15);

    transition: var(--transition);
}

.toggle input:checked + .toggle-slider {
    background: var(--primary);
}

.toggle input:checked + .toggle-slider::before {
    transform: translateX(20px);
}


/* =========================
   27. SIDEBAR OVERLAY
   ========================= */

.sidebar-overlay {
    position: fixed;

    inset: 0;

    background: rgba(15, 23, 42, 0.5);

    backdrop-filter: blur(2px);

    z-index: 900;

    opacity: 0;
    visibility: hidden;

    transition:
        opacity var(--transition),
        visibility var(--transition);
}

.sidebar-overlay.active,
.sidebar-overlay.show {
    opacity: 1;
    visibility: visible;
}


/* =========================
   28. MODAL
   ========================= */

.modal-overlay {
    position: fixed;

    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: rgba(15, 23, 42, 0.55);

    backdrop-filter: blur(5px);

    z-index: 2000;

    opacity: 0;
    visibility: hidden;

    transition:
        opacity var(--transition),
        visibility var(--transition);
}

.modal-overlay.active,
.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal-card {
    position: relative;

    width: min(100%, 650px);

    max-height: 90vh;

    overflow-y: auto;

    padding: 28px;

    background: var(--surface);

    border-radius: var(--radius-xl);

    box-shadow: var(--shadow-lg);

    transform: translateY(15px) scale(0.98);

    transition: transform var(--transition);
}

.modal-overlay.active .modal-card,
.modal-overlay.show .modal-card {
    transform: translateY(0) scale(1);
}

.modal-close {
    position: absolute;

    top: 15px;
    right: 15px;

    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f8fafc;

    color: var(--text-secondary);

    border: 1px solid var(--border);

    border-radius: 9px;

    transition: var(--transition);
}

.modal-close:hover {
    background: var(--danger-light);
    color: var(--danger);
}

.modal-card h2 {
    padding-right: 45px;

    font-size: 21px;
    font-weight: 800;
}

.preview-details {
    margin-top: 20px;
}

.preview-details > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    padding: 12px 0;

    border-bottom: 1px solid var(--border-light);

    font-size: 11px;
}

.preview-details > div:last-child {
    border-bottom: 0;
}

.preview-details strong {
    color: var(--text);
}

.preview-details span {
    color: var(--text-muted);
}

.prototype-note {
    margin-top: 18px;

    padding: 13px;

    background: var(--warning-light);

    color: #92400e;

    border: 1px solid #fde68a;

    border-radius: 10px;

    font-size: 10px;

    line-height: 1.7;
}


/* =========================
   29. TOAST
   ========================= */

.toast {
    position: fixed;

    right: 25px;
    bottom: 25px;

    min-width: 280px;
    max-width: 380px;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 14px 16px;

    background: #0f172a;

    color: #ffffff;

    border-radius: 12px;

    box-shadow: var(--shadow-lg);

    z-index: 3000;

    opacity: 0;
    visibility: hidden;

    transform: translateY(15px);

    transition:
        opacity var(--transition),
        visibility var(--transition),
        transform var(--transition);
}

.toast.show,
.toast.active {
    opacity: 1;
    visibility: visible;

    transform: translateY(0);
}

.toast i {
    color: #60a5fa;

    font-size: 16px;
}

#toastMessage {
    font-size: 11px;
    font-weight: 600;
}


/* =========================
   30. FOCUS ACCESSIBILITY
   ========================= */

button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.2);
    outline-offset: 2px;
}


/* =========================
   31. TABLET
   ========================= */

@media (max-width: 1200px) {

    :root {
        --sidebar-width: 250px;
    }

    .teacher-content {
        padding: 26px;
    }

    .teacher-topbar {
        padding: 0 26px;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .course-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .resource-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}


/* =========================
   32. TABLET / MOBILE
   ========================= */

@media (max-width: 900px) {

    .teacher-sidebar {
        width: 285px;

        transform: translateX(-100%);

        box-shadow: 10px 0 30px rgba(15, 23, 42, 0.15);
    }

    .teacher-sidebar.active,
    .teacher-sidebar.open,
    .teacher-sidebar.show {
        transform: translateX(0);
    }

    .teacher-main {
        margin-left: 0;
    }

    .mobile-menu-btn {
        display: flex;
    }

    .teacher-content {
        padding: 24px 20px 40px;
    }

    .teacher-topbar {
        padding: 0 20px;
    }

    .progress-overview {
        grid-template-columns: 1fr;
    }

    .student-summary-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}


/* =========================
   33. MOBILE
   ========================= */

@media (max-width: 650px) {

    :root {
        --topbar-height: 72px;
    }

    .teacher-topbar {
        min-height: var(--topbar-height);

        padding: 0 14px;
    }

    .topbar-left {
        gap: 9px;
    }

    .mobile-menu-btn {
        width: 38px;
        height: 38px;
    }

    .page-kicker {
        display: none;
    }

    #pageTitle {
        font-size: 17px;
    }

    .topbar-actions {
        gap: 6px;
    }

    .topbar-icon-btn,
    .language-select {
        height: 38px;
    }

    .topbar-icon-btn {
        width: 38px;
    }

    .language-select {
        padding: 0 8px;

        font-size: 10px;
    }

    .teacher-content {
        padding: 18px 14px 35px;
    }

    .welcome-card {
        min-height: auto;

        padding: 25px 22px;
    }

    .welcome-content {
        max-width: 100%;
    }

    .welcome-content h2 {
        font-size: 23px;
    }

    .welcome-content p {
        font-size: 11px;
    }

    .welcome-visual {
        display: none;
    }

    .stats-grid {
        grid-template-columns: 1fr 1fr;

        gap: 10px;

        margin-top: 14px;
    }

    .stat-card {
        padding: 14px;

        gap: 10px;

        border-radius: 14px;
    }

    .stat-icon {
        width: 40px;
        height: 40px;

        border-radius: 11px;

        font-size: 15px;
    }

    .stat-info strong {
        font-size: 18px;
    }

    .stat-info span {
        font-size: 9px;
    }

    .dashboard-grid {
        margin-top: 14px;

        gap: 14px;
    }

    .dashboard-card {
        border-radius: 15px;
    }

    .card-header {
        padding: 17px 15px 13px;
    }

    .course-performance-list {
        padding: 2px 15px 12px;
    }

    .ai-insight {
        margin-left: 15px;
        margin-right: 15px;
    }

    .full-btn {
        width: calc(100% - 30px);

        margin-left: 15px;
        margin-right: 15px;
    }

    .recent-activity-card {
        margin-top: 14px;
    }

    .section-intro {
        align-items: flex-start;

        flex-direction: column;

        gap: 10px;

        margin-bottom: 15px;
    }

    .section-intro h2 {
        font-size: 21px;
    }

    .section-intro p {
        font-size: 10px;
    }

    .course-grid,
    .resource-grid,
    .session-grid {
        grid-template-columns: 1fr;

        gap: 13px;
    }

    .course-card-icon {
        height: 115px;
    }

    .form-card {
        padding: 17px;

        border-radius: 15px;
    }

    .form-grid {
        grid-template-columns: 1fr;

        gap: 14px;
    }

    .form-group.full {
        grid-column: auto;
    }

    .form-actions {
        flex-direction: column-reverse;
    }

    .form-actions .primary-btn,
    .form-actions .secondary-btn {
        width: 100%;
    }

    .student-summary-grid {
        grid-template-columns: 1fr;

        gap: 10px;
    }

    .mini-stat-card {
        padding: 15px;
    }

    .students-table {
        display: block;

        overflow-x: auto;

        white-space: nowrap;
    }

    .progress-main-card,
    .ai-progress-card {
        padding: 19px;
    }

    .large-percentage {
        font-size: 38px;
    }

    .settings-card {
        border-radius: 15px;
    }

    .settings-profile {
        padding: 20px;

        gap: 13px;
    }

    .large-profile-avatar {
        width: 62px;
        height: 62px;

        font-size: 18px;
    }

    .setting-row {
        padding: 17px 20px;
    }

    .toast {
        left: 14px;
        right: 14px;
        bottom: 14px;

        min-width: 0;
    }

    .modal-card {
        padding: 22px;

        border-radius: 18px;
    }
}


/* =========================
   34. VERY SMALL MOBILE
   ========================= */

@media (max-width: 400px) {

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .stat-card {
        padding: 15px;
    }

    .topbar-actions .language-select {
        display: none;
    }

    #pageTitle {
        font-size: 16px;
    }

    .welcome-content h2 {
        font-size: 21px;
    }
}


/* =========================
   35. REDUCED MOTION
   ========================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

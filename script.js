/* =====================================================
   STUDENTHUB - PRACTICAL 4
   JavaScript: DOM, Events, Modal, FAQ, Theme,
   Notification, Hamburger Menu & localStorage
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. DARK / LIGHT MODE
       Uses localStorage to remember the user's preference
    ===================================================== */

    const themeButton = document.createElement("button");

    themeButton.id = "themeToggle";
    themeButton.innerHTML = "🌙";
    themeButton.title = "Toggle Dark / Light Mode";

    themeButton.style.cssText = `
        position: fixed;
        right: 22px;
        bottom: 22px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #4f46e5;
        color: white;
        font-size: 21px;
        cursor: pointer;
        z-index: 2000;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(themeButton);

    // Get saved theme
    const savedTheme = localStorage.getItem("studentHubTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.innerHTML = "☀️";
    }

    // Change theme when button is clicked
    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("studentHubTheme", "dark");
            themeButton.innerHTML = "☀️";

        } else {

            localStorage.setItem("studentHubTheme", "light");
            themeButton.innerHTML = "🌙";

        }

    });


    /* =====================================================
       2. FAQ CLICK EVENT
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector("summary");

        if (question) {

            question.addEventListener("click", function () {
                console.log("FAQ question clicked");
            });

        }

    });


    /* =====================================================
       3. HAMBURGER MENU
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector(".navbar nav");

    if (navbar && nav) {

        const menuButton = document.createElement("button");

        menuButton.id = "menuToggle";
        menuButton.innerHTML = "☰";
        menuButton.title = "Menu";

        menuButton.style.cssText = `
            display: none;
            border: none;
            background: #eef2ff;
            color: #4f46e5;
            border-radius: 10px;
            padding: 8px 12px;
            font-size: 22px;
            cursor: pointer;
        `;

        navbar.insertBefore(menuButton, nav);

        function checkScreenSize() {

            if (window.innerWidth <= 850) {

                menuButton.style.display = "block";
                nav.style.display = "none";

            } else {

                menuButton.style.display = "none";
                nav.style.display = "";

            }

        }

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        menuButton.addEventListener("click", function () {

            if (nav.style.display === "flex") {

                nav.style.display = "none";
                menuButton.innerHTML = "☰";

            } else {

                nav.style.display = "flex";
                nav.style.flexDirection = "column";
                menuButton.innerHTML = "✕";

            }

        });

    }


    /* =====================================================
       4. NOTIFICATION BANNER
    ===================================================== */

    const notification = document.createElement("div");

    notification.id = "studentNotification";

    notification.innerHTML = `
        <div>
            <strong>🔔 StudentHub Update</strong>
            <br>
            <span>New events and learning resources are available.</span>
        </div>

        <button id="closeNotification">×</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 25px;
        max-width: 360px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 16px 18px;
        background: white;
        color: #374151;
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        z-index: 1900;
    `;

    document.body.appendChild(notification);

    const closeNotification =
        document.getElementById("closeNotification");

    closeNotification.style.cssText = `
        border: none;
        background: transparent;
        color: #6b7280;
        font-size: 25px;
        cursor: pointer;
    `;

    closeNotification.addEventListener("click", function () {

        notification.remove();

    });


    /* =====================================================
       5. MODAL POPUP
    ===================================================== */

    const modal = document.createElement("div");

    modal.id = "studentModal";

    modal.innerHTML = `
        <div class="modal-box">

            <button class="modal-close">×</button>

            <div class="modal-icon">🎓</div>

            <h2>Welcome to StudentHub!</h2>

            <p>
                Explore courses, events and student resources
                from one convenient platform.
            </p>

            <a href="register.html" class="modal-button">
                Get Started →
            </a>

        </div>
    `;

    modal.style.cssText = `
        display: none;
        position: fixed;
        inset: 0;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(15,23,42,0.65);
        z-index: 3000;
    `;

    document.body.appendChild(modal);

    const modalBox = modal.querySelector(".modal-box");

    modalBox.style.cssText = `
        position: relative;
        width: min(500px, 100%);
        padding: 38px;
        text-align: center;
        background: white;
        border-radius: 22px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
    `;

    modal.querySelector(".modal-close").style.cssText = `
        position: absolute;
        top: 10px;
        right: 16px;
        border: none;
        background: transparent;
        font-size: 28px;
        color: #6b7280;
        cursor: pointer;
    `;

    modal.querySelector(".modal-icon").style.cssText = `
        font-size: 48px;
        margin-bottom: 12px;
    `;

    modal.querySelector(".modal-button").style.cssText = `
        display: inline-block;
        margin-top: 20px;
        padding: 11px 20px;
        color: white;
        background: #4f46e5;
        border-radius: 10px;
        font-weight: 700;
        text-decoration: none;
    `;


    function openModal() {

        modal.style.display = "flex";

    }


    function closeModal() {

        modal.style.display = "none";

    }


    modal.querySelector(".modal-close")
        .addEventListener("click", closeModal);


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeModal();
        }

    });


    /* =====================================================
       6. EVENT REGISTER BUTTONS
    ===================================================== */

    const eventButtons =
        document.querySelectorAll(".event-register");

    eventButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const href = button.getAttribute("href");

            if (!href || href === "#") {

                event.preventDefault();
                openModal();

            }

        });

    });


    /* =====================================================
       7. FORM SUBMISSION MESSAGE
    ===================================================== */

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const message =
                document.createElement("div");

            message.innerHTML =
                "✅ Thank you! Your information has been submitted.";

            message.style.cssText = `
                margin-top: 18px;
                padding: 13px 15px;
                color: #047857;
                background: #d1fae5;
                border: 1px solid #a7f3d0;
                border-radius: 10px;
                font-weight: 600;
            `;

            form.appendChild(message);

            setTimeout(function () {

                message.remove();

            }, 4000);

        });

    });


    /* =====================================================
       8. CARD HOVER USING JAVASCRIPT
    ===================================================== */

    const cards = document.querySelectorAll(
        ".feature-card, .event-card, .dashboard-stat-card, .admin-management-card"
    );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });


    /* =====================================================
       9. ESC KEY CLOSES MODAL
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    });

});


/* =====================================================
   DARK MODE CSS
===================================================== */

const darkModeCSS = document.createElement("style");

darkModeCSS.textContent = `

    .dark-mode {
        background: #0f172a !important;
        color: #e5e7eb !important;
    }

    .dark-mode .navbar {
        background: #1e293b !important;
        border-color: #334155 !important;
    }

    .dark-mode .logo,
    .dark-mode nav a {
        color: #f8fafc !important;
    }

    .dark-mode p {
        color: #cbd5e1;
    }

    .dark-mode .feature-card,
    .dark-mode .event-card,
    .dark-mode .dashboard-stat-card,
    .dark-mode .dashboard-section,
    .dark-mode .profile-card,
    .dark-mode .contact-info-card,
    .dark-mode .contact-form-card,
    .dark-mode .admin-stat-card,
    .dark-mode .admin-management-card,
    .dark-mode .admin-action,
    .dark-mode .faq-item,
    .dark-mode .register-card,
    .dark-mode .login-card,
    .dark-mode .mission-card,
    .dark-mode .value-card,
    .dark-mode .image-card {
        background: #1e293b !important;
        border-color: #334155 !important;
        color: #e5e7eb !important;
    }

    .dark-mode h1,
    .dark-mode h2,
    .dark-mode h3,
    .dark-mode h4 {
        color: #f8fafc !important;
    }

    .dark-mode input,
    .dark-mode select,
    .dark-mode textarea {
        background: #0f172a !important;
        color: white !important;
        border-color: #475569 !important;
    }

    .dark-mode .stats,
    .dark-mode .features,
    .dark-mode .events-container,
    .dark-mode .events-preview,
    .dark-mode .faq-section,
    .dark-mode .contact-section,
    .dark-mode .mission,
    .dark-mode .values {
        background: #0f172a !important;
    }

    .dark-mode .footer {
        background: #020617 !important;
    }


    /* Hamburger responsive layout */

    @media (max-width: 850px) {

        .navbar {
            flex-wrap: wrap;
        }

        .navbar nav {
            width: 100%;
            align-items: center;
        }

        .navbar nav ul {
            flex-direction: column;
            width: 100%;
            gap: 14px;
        }

    }


    /* Notification on mobile */

    @media (max-width: 600px) {

        #studentNotification {
            left: 15px !important;
            right: 15px !important;
            top: 85px !important;
            max-width: none !important;
        }

    }

`;

document.head.appendChild(darkModeCSS);
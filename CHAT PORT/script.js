/* =========================================
   PORTFOLIO WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuIcon = menuToggle?.querySelector("span");

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    if (menuIcon) {
        menuIcon.textContent = "☰";
    }
}

function openMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    if (menuIcon) {
        menuIcon.textContent = "✕";
    }
}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close menu when a navigation link is clicked */

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* Close menu with Escape key */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {
            closeMenu();
            menuToggle.focus();
        }

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });


    /* Reset mobile menu when returning to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    });

}


/* =========================================
   TYPING ANIMATION
========================================= */

const typingElement =
    document.getElementById("typing");

const words = [
    "Web Developer",
    "Frontend Developer",
    "Problem Solver",
    "Creative Coder"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;
let typingTimer;


/* Check user's motion preference */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


function typeEffect() {

    if (!typingElement) return;

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            typingTimer =
                setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }


    const speed =
        deleting ? 50 : 100;

    typingTimer =
        setTimeout(typeEffect, speed);

}


/* Respect reduced-motion accessibility setting */

if (typingElement) {

    if (prefersReducedMotion) {

        typingElement.textContent =
            words[0];

    } else {

        typeEffect();

    }

}


/* =========================================
   PROJECT FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.getAttribute("data-filter");


        /* Update active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

            btn.setAttribute(
                "aria-pressed",
                "false"
            );

        });


        button.classList.add("active");

        button.setAttribute(
            "aria-pressed",
            "true"
        );


        /* Filter projects */

        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            const shouldShow =
                filter === "all" ||
                category === filter;


            if (shouldShow) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle?.querySelector("span");

const themeMeta =
    document.querySelector(
        'meta[name="theme-color"]'
    );


function setTheme(theme) {

    if (!themeToggle) return;


    const isLight =
        theme === "light";


    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    themeToggle.setAttribute(
        "aria-pressed",
        String(isLight)
    );


    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );


    if (themeIcon) {

        themeIcon.textContent =
            isLight ? "☀️" : "🌙";

    }


    /* Change browser address-bar theme */

    if (themeMeta) {

        themeMeta.setAttribute(
            "content",
            isLight ? "#f8fafc" : "#0b1120"
        );

    }


    /* Save preference safely */

    try {

        localStorage.setItem(
            "theme",
            theme
        );

    } catch (error) {

        console.warn(
            "Theme preference could not be saved.",
            error
        );

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isCurrentlyLight =
                document.body.classList.contains(
                    "light-mode"
                );

            setTheme(
                isCurrentlyLight
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* Load saved theme */

let savedTheme = null;

try {

    savedTheme =
        localStorage.getItem("theme");

} catch (error) {

    console.warn(
        "Theme preference could not be loaded.",
        error
    );

}


if (
    savedTheme === "light" ||
    savedTheme === "dark"
) {

    setTheme(savedTheme);

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* Let the browser check required fields */

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            /* Get form values */

            const nameInput =
                contactForm.querySelector(
                    '[name="name"]'
                );

            const emailInput =
                contactForm.querySelector(
                    '[name="email"]'
                );

            const messageInput =
                contactForm.querySelector(
                    '[name="message"]'
                );


            const name =
                nameInput?.value.trim();

            const email =
                emailInput?.value.trim();

            const message =
                messageInput?.value.trim();


            /* Extra validation */

            if (
                !name ||
                !email ||
                !message
            ) {

                formMessage.textContent =
                    "Please complete all required fields.";

                return;

            }


            /* Show honest demo message */

            formMessage.textContent =
                `Thanks, ${name}! Your message has been received by this demo form. Connect the form to a backend or email service to receive messages in your inbox.`;


            /* Clear form */

            contactForm.reset();

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   CLEAN UP TYPING TIMER
========================================= */

window.addEventListener("beforeunload", () => {

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

});
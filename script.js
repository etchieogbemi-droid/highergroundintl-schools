/* ========================================
   HIGHER GROUND INT'L SCHOOLS
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       CURRENT YEAR IN FOOTER
    ===================================== */

    const yearElements = document.querySelectorAll("#current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        /*
         * Close the mobile navigation after selecting
         * a normal navigation link.
         */

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================
       DROPDOWN MENU
    ===================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {

        const dropdownButton = dropdown.querySelector(".dropdown-toggle");

        if (!dropdownButton) {
            return;
        }

        dropdownButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const wasOpen = dropdown.classList.contains("open");

            /*
             * Close any other open dropdown.
             */

            dropdowns.forEach(function (otherDropdown) {

                otherDropdown.classList.remove("open");

                const otherButton = otherDropdown.querySelector(
                    ".dropdown-toggle"
                );

                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                }

            });

            /*
             * Open the clicked dropdown if it was previously closed.
             */

            if (!wasOpen) {

                dropdown.classList.add("open");

                dropdownButton.setAttribute("aria-expanded", "true");

            }

        });

    });


    /*
     * Close dropdowns when clicking outside.
     */

    document.addEventListener("click", function (event) {

        dropdowns.forEach(function (dropdown) {

            if (!dropdown.contains(event.target)) {

                dropdown.classList.remove("open");

                const button = dropdown.querySelector(".dropdown-toggle");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }

            }

        });

    });


    /*
     * Close dropdowns when Escape is pressed.
     */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("open");

                const button = dropdown.querySelector(".dropdown-toggle");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }

            });

        }

    });


    /* =====================================
       TEN-IMAGE SCHOOL SLIDESHOW
    ===================================== */

    const slideshowImage = document.getElementById("slideshow-image");

    const slideCaption = document.getElementById("slide-caption");

    const slideCounter = document.getElementById("slide-counter");

    const slideDotsContainer = document.getElementById("slide-dots");

    const previousButton = document.querySelector(".slide-prev");

    const nextButton = document.querySelector(".slide-next");


    if (
        slideshowImage &&
        slideCaption &&
        slideCounter &&
        slideDotsContainer &&
        previousButton &&
        nextButton
    ) {

        /*
         * The first picture is school-life-01.jpg.
         * All pictures are expected inside the public folder.
         */

        const slides = [

            {
                src: "public/school-life-01.jpg",
                caption: "Our School Community"
            },

            {
                src: "public/school-life-02.jpg",
                caption: "Learning and Growing Together"
            },

            {
                src: "public/school-life-03.jpg",
                caption: "A Place to Learn"
            },

            {
                src: "public/school-life-04.jpg",
                caption: "Developing Future Leaders"
            },

            {
                src: "public/school-life-05.jpg",
                caption: "Encouraging Curiosity"
            },

            {
                src: "public/school-life-06.jpg",
                caption: "Building Confidence"
            },

            {
                src: "public/school-life-07.jpg",
                caption: "Growing Through Education"
            },

            {
                src: "public/school-life-08.jpg",
                caption: "A Community of Learners"
            },

            {
                src: "public/school-life-09.jpg",
                caption: "Preparing for Greater Heights"
            },

            {
                src: "public/school-life-10.jpg",
                caption: "Mentoring Future Leaders"
            }

        ];


        let currentSlide = 0;

        let slideshowTimer = null;


        /*
         * Create one clickable dot for every slide.
         */

        slides.forEach(function (slide, index) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className = "slide-dot";

            dot.setAttribute(
                "aria-label",
                "Show picture " + (index + 1)
            );

            dot.addEventListener("click", function () {

                showSlide(index);

                restartSlideshow();

            });

            slideDotsContainer.appendChild(dot);

        });


        /*
         * Display the selected slide.
         */

        function showSlide(index) {

            currentSlide = (index + slides.length) % slides.length;

            const slide = slides[currentSlide];

            slideshowImage.src = slide.src;

            slideshowImage.alt = slide.caption;

            slideCaption.textContent = slide.caption;

            slideCounter.textContent =
                (currentSlide + 1) + " / " + slides.length;


            /*
             * Highlight the active dot.
             */

            const dots = slideDotsContainer.querySelectorAll(".slide-dot");

            dots.forEach(function (dot, dotIndex) {

                const isActive = dotIndex === currentSlide;

                dot.classList.toggle("active", isActive);

                dot.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

        }


        /*
         * Move to the next picture.
         */

        function nextSlide() {

            showSlide(currentSlide + 1);

        }


        /*
         * Move to the previous picture.
         */

        function previousSlide() {

            showSlide(currentSlide - 1);

        }


        /*
         * Start automatic slideshow.
         */

        function startSlideshow() {

            stopSlideshow();

            slideshowTimer = window.setInterval(function () {

                nextSlide();

            }, 5000);

        }


        /*
         * Stop automatic slideshow.
         */

        function stopSlideshow() {

            if (slideshowTimer !== null) {

                window.clearInterval(slideshowTimer);

                slideshowTimer = null;

            }

        }


        /*
         * Restart the timer after manual navigation.
         */

        function restartSlideshow() {

            startSlideshow();

        }


        /*
         * Connect the previous and next buttons.
         */

        nextButton.addEventListener("click", function () {

            nextSlide();

            restartSlideshow();

        });


        previousButton.addEventListener("click", function () {

            previousSlide();

            restartSlideshow();

        });


        /*
         * Pause automatic changes when the mouse is
         * over the slideshow.
         */

        const slideshowContainer = document.querySelector(".slideshow");

        if (slideshowContainer) {

            slideshowContainer.addEventListener("mouseenter", function () {

                stopSlideshow();

            });


            slideshowContainer.addEventListener("mouseleave", function () {

                startSlideshow();

            });

        }


        /*
         * Pause while the browser tab is hidden.
         */

        document.addEventListener("visibilitychange", function () {

            if (document.hidden) {

                stopSlideshow();

            } else {

                startSlideshow();

            }

        });


        /*
         * Display the first picture and start.
         */

        showSlide(0);

        startSlideshow();

    }


    /* =====================================
       ADMISSION FORM
    ===================================== */

    const admissionForm = document.getElementById("admission-form");

    const emailButton = document.getElementById("email-enquiry");

    const formStatus = document.getElementById("form-status");


    /*
     * The school's WhatsApp number.
     *
     * International format:
     * Nigeria country code 234
     * Remove the first zero from 07060961588
     *
     * Final number: 2347060961588
     */

    const schoolWhatsApp = "2347060961588";


    /*
     * School email address.
     */

    const schoolEmail = "etchieogbemi@gmail.com";


    /*
     * Display a form status message.
     */

    function displayFormStatus(message) {

        if (formStatus) {

            formStatus.textContent = message;

            formStatus.classList.add("visible");

        }

    }


    /*
     * Read the form and prepare the enquiry.
     */

    function getAdmissionMessage() {

        const guardianName = document
            .getElementById("guardian-name")
            .value
            .trim();

        const guardianPhone = document
            .getElementById("guardian-phone")
            .value
            .trim();

        const guardianEmail = document
            .getElementById("guardian-email")
            .value
            .trim();

        const childName = document
            .getElementById("child-name")
            .value
            .trim();

        const classInterest = document
            .getElementById("class-interest")
            .value;

        const academicSession = document
            .getElementById("academic-session")
            .value
            .trim();

        const enquiryMessage = document
            .getElementById("enquiry-message")
            .value
            .trim();


        return [
            "ADMISSION ENQUIRY",
            "",
            "School: HIGHER GROUND INT'L SCHOOLS",
            "Motto: Mentoring future leaders for greater heights.",
            "",
            "Parent/Guardian: " + guardianName,
            "Phone Number: " + guardianPhone,
            "Email Address: " + (guardianEmail || "Not provided"),
            "Child's Name: " + childName,
            "Class of Interest: " + classInterest,
            "Intended Admission Session: " +
                (academicSession || "Not specified"),
            "",
            "Additional Enquiry:",
            enquiryMessage || "No additional message provided.",
            "",
            "School Address:",
            "Km 6 Umuahia-Uzuakoli-Ohafia Express Road, Uzuakoli, Abia State."
        ].join("\n");

    }


    /*
     * Check that the form is valid.
     */

    function validateAdmissionForm() {

        if (!admissionForm) {
            return false;
        }

        if (!admissionForm.reportValidity()) {

            displayFormStatus(
                "Please complete the required fields before continuing."
            );

            return false;

        }

        return true;

    }


    /*
     * Open WhatsApp with the prepared admission enquiry.
     */

    if (admissionForm) {

        admissionForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!validateAdmissionForm()) {
                return;
            }

            const message = getAdmissionMessage();

            const encodedMessage = encodeURIComponent(message);

            const whatsappURL =
                "https://wa.me/" +
                schoolWhatsApp +
                "?text=" +
                encodedMessage;


            displayFormStatus(
                "Opening WhatsApp with your admission enquiry. " +
                "Please review the message and press Send in WhatsApp."
            );


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /*
     * Open the visitor's email application with
     * the admission enquiry prepared.
     */

    if (emailButton && admissionForm) {

        emailButton.addEventListener("click", function () {

            if (!validateAdmissionForm()) {
                return;
            }

            const message = getAdmissionMessage();

            const subject =
                "Admission Enquiry - Higher Ground Int'l Schools";

            const emailURL =
                "mailto:" +
                schoolEmail +
                "?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(message);


            displayFormStatus(
                "Opening your email application with the enquiry prepared. " +
                "Please review the message and press Send."
            );


            window.location.href = emailURL;

        });

    }

});

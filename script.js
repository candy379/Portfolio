/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.getElementById("nav-links");

const navItems =
  document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");

  menuToggle.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );

});


/* Close menu when clicking a link */

navItems.forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  });

});


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle =
  document.getElementById("theme-toggle");


themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});


/* =====================================================
   HEADER ON SCROLL
===================================================== */

const header =
  document.getElementById("header");


window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingText =
  document.getElementById("typing-text");

const roles = [
  "Frontend Developer",
  "Web Designer",
  "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

  const currentRole =
    roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(
        0,
        characterIndex + 1
      );

    characterIndex++;

    if (
      characterIndex ===
      currentRole.length
    ) {

      deleting = true;

      setTimeout(typeEffect, 1600);

      return;

    }

  } else {

    typingText.textContent =
      currentRole.substring(
        0,
        characterIndex - 1
      );

    characterIndex--;

    if (characterIndex === 0) {

      deleting = false;

      roleIndex =
        (roleIndex + 1) % roles.length;

    }

  }

  setTimeout(
    typeEffect,
    deleting ? 50 : 90
  );

}


typeEffect();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll("main section");


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const sectionId =
            entry.target.getAttribute("id");

          navItems.forEach((link) => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${sectionId}`
            ) {

              link.classList.add("active");

            }

          });

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const projectCards =
  document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    const filter =
      button.dataset.filter;


    projectCards.forEach((card) => {

      const category =
        card.dataset.category;


      if (
        filter === "all" ||
        category === filter
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
  document.getElementById("back-top");


backTop.addEventListener("click", (event) => {

  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =====================================================
   PROJECT CARD TILT EFFECT
===================================================== */

const projectCardsForTilt =
  document.querySelectorAll(".project-card");


const canHover =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


if (canHover) {

  projectCardsForTilt.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const rotateX =
          ((y / rect.height) - 0.5) * -4;

        const rotateY =
          ((x / rect.width) - 0.5) * 4;


        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}
"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("nav-open", !isOpen);
    menuButton.querySelector("span").textContent = isOpen ? "القائمة" : "إغلاق";
    menuButton.querySelector(".menu-icon").classList.toggle("menu-icon-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("nav-open");
      menuButton.querySelector("span").textContent = "القائمة";
      menuButton.querySelector(".menu-icon").classList.remove("menu-icon-open");
    });
  });
}

if ("IntersectionObserver" in window && !motionPreference.matches) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const galleryImages = document.querySelectorAll(".showcase-card img, .gallery-item img");
  const heroImage = document.querySelector(".hero-media img");
  const tiltItems = document.querySelectorAll(".craft-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const popup = document.getElementById("privacy-popup");
  const acceptBtn = document.getElementById("accept-btn");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((item) => revealObserver.observe(item));

  const canUseMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canUseMotion && heroImage) {
    let ticking = false;

    const updateHeroParallax = () => {
      const scrollY = window.scrollY;
      heroImage.style.transform = `scale(1.12) translate3d(0, ${scrollY * 0.08}px, 0)`;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  if (canUseMotion && window.matchMedia("(min-width: 769px)").matches) {
    tiltItems.forEach((item) => {
      item.addEventListener("pointermove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
        item.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      });

      item.addEventListener("pointerleave", () => {
        item.style.transform = "";
      });
    });
  }

  const openLightbox = (image) => {
    if (!lightbox || !lightboxImg) {
      return;
    }

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt || "Prism Frames artwork preview";
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) {
      return;
    }

    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));
  });

  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  if (popup && acceptBtn) {
    if (localStorage.getItem("privacyAccepted")) {
      popup.style.display = "none";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("privacyAccepted", "true");
      popup.style.display = "none";
    });
  }
});

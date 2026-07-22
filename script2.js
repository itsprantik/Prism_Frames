// ================================
// Prism Frames Gallery Script
// Masonry + Lightbox
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector(".gallery-grid");
    const items = [...document.querySelectorAll(".gallery-item")];

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    // -----------------------
    // Masonry Layout
    // -----------------------

    function masonryLayout() {

        if (!gallery) return;

        if (window.innerWidth <= 420) {
            gallery.style.columnCount = 1;
        }
        else if (window.innerWidth <= 580) {
            gallery.style.columnCount = 2;
        }
        else if (window.innerWidth <= 768) {
            gallery.style.columnCount = 2;
        }
        else if (window.innerWidth <= 980) {
            gallery.style.columnCount = 3;
        }
        else {
            gallery.style.columnCount = 4;
        }

    }

    masonryLayout();

    window.addEventListener("resize", masonryLayout);

    // Wait until every image is loaded

    let loaded = 0;

    items.forEach(item => {

        const img = item.querySelector("img");

        if (!img) return;

        if (img.complete) {

            loaded++;

            if (loaded === items.length)
                masonryLayout();

        } else {

            img.onload = () => {

                loaded++;

                if (loaded === items.length)
                    masonryLayout();

            };

        }

    });

    // -----------------------
    // Lightbox
    // -----------------------

    items.forEach(item => {

        const img = item.querySelector("img");

        item.addEventListener("click", () => {

            lightbox.classList.add("active");

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;

            document.body.style.overflow = "hidden";

        });

        item.addEventListener("keydown", e => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                lightbox.classList.add("active");

                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;

                document.body.style.overflow = "hidden";

            }

        });

    });

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightboxImg.src = "";

        document.body.style.overflow = "";

    }

    closeBtn.addEventListener("click", e => {

        e.stopPropagation();

        closeLightbox();

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox)
            closeLightbox();

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape")
            closeLightbox();

    });

});

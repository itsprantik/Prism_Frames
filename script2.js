const filterBtns = document.querySelectorAll(".gallery-filters button");
const items = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    items.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

const openLightbox = (item) => {
  if (!lightbox || !lightboxImg) {
    return;
  }

  const image = item.querySelector("img");

  if (!image) {
    return;
  }

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImg) {
    return;
  }

  lightbox.classList.remove("active");
  lightboxImg.src = "";
  lightboxImg.alt = "";
  document.body.style.overflow = "";
};

items.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

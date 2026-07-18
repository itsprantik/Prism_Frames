document.addEventListener("DOMContentLoaded", () => {
  const materialCards = Array.from(
    document.querySelectorAll("main > section:nth-of-type(2) article")
  );

  if (!materialCards.length) {
    return;
  }

  const activateCard = (card) => {
    materialCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  };

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2
    }
  );

  materialCards.forEach((card, index) => {
    revealObserver.observe(card);

    card.addEventListener("click", () => activateCard(card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCard(card);
      }
    });

    if (index === 0) {
      card.classList.add("is-active");
    }
  });

  if (window.matchMedia("(min-width: 769px)").matches) {
    materialCards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

        card.style.transform = `translateY(-4px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }
});

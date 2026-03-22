    document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const statNumbers = document.querySelectorAll(".stat-number");

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
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const animateCount = (element) => {
    const target = Number(element.dataset.target || 0);
    const suffix = target === 100 ? "+" : "";
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5
    }
  );

  statNumbers.forEach((stat) => statObserver.observe(stat));
});

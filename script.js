const animated = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

animated.forEach((item) => observer.observe(item));

const slider = document.getElementById("baSlider");
const afterLayer = document.getElementById("afterLayer");

function updateBeforeAfter() {
  const value = Number(slider.value);
  afterLayer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
}

if (slider && afterLayer) {
  slider.addEventListener("input", updateBeforeAfter);
  updateBeforeAfter();
}

const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxPreview = document.getElementById("lightboxPreview");

document.querySelectorAll(".gallery-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const styles = window.getComputedStyle(tile);
    lightboxPreview.style.backgroundImage = styles.backgroundImage;
    lightboxPreview.style.backgroundPosition = styles.backgroundPosition;
    lightboxTitle.textContent = tile.dataset.title || "Casa Loma detail";
    lightbox.hidden = false;
  });
});

function closeGallery() {
  lightbox.hidden = true;
}

closeLightbox?.addEventListener("click", closeGallery);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeGallery();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

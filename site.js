const stack = document.querySelector(".screenshot-stack");
const shots = [...document.querySelectorAll(".shot")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButtons = document.querySelectorAll(".lightbox-backdrop, .lightbox-close");

if (stack && shots.length > 0) {
  stack.addEventListener("pointermove", (event) => {
    const rect = stack.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    shots.forEach((shot, index) => {
      const depth = 1 + index * 0.22;
      const tx = x * 10 * depth;
      const ty = y * 8 * depth;
      const rx = y * -3.5;
      const ry = x * 3.5;
      shot.style.setProperty("--wobble-x", `${tx}px`);
      shot.style.setProperty("--wobble-y", `${ty}px`);
      shot.style.setProperty("--wobble-rx", `${rx}deg`);
      shot.style.setProperty("--wobble-ry", `${ry}deg`);
    });
  });

  stack.addEventListener("pointerleave", () => {
    shots.forEach((shot) => {
      shot.style.removeProperty("--wobble-x");
      shot.style.removeProperty("--wobble-y");
      shot.style.removeProperty("--wobble-rx");
      shot.style.removeProperty("--wobble-ry");
    });
  });
}

function openLightbox(button) {
  if (!lightbox || !lightboxImage) return;
  const image = button.querySelector("img");
  lightboxImage.src = button.dataset.full || image?.src || "";
  lightboxImage.alt = image?.alt || "TapMania Legacy screenshot";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  document.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

shots.forEach((shot) => {
  shot.addEventListener("click", () => openLightbox(shot));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

// Scale animations
const HoverScale = 1.05;
const PressScale = 0.95;

// Entrance animations
const slideFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const slideFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const popUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

// Hover animations
const hoverBounce = {
  scale: HoverScale,
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

const hoverGlow = {
  scale: HoverScale,
  boxShadow: "0 0 0.5rem rgba(var(--color-primary-700), 0.5)",
};

export {
  fadeIn,
  hoverBounce,
  hoverGlow,
  HoverScale,
  popUp,
  PressScale,
  slideFromLeft,
  slideFromRight,
};

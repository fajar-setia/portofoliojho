export function scrollToSection(id: string) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | Element | string, opts?: object) => void } }).__lenis;
  const element = document.getElementById(id);

  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, { offset: 0, duration: 0.9 });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

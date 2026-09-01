// Hitung posisi flow element dengan menonaktifkan sticky sementara.
// Section yang pakai sticky top-0 melaporkan offsetTop = 0 saat ter-pin di
// viewport, jadi harus di-set static dulu supaya dapat posisi flow yang benar.
function getFlowTop(element: HTMLElement): number {
  const affected: HTMLElement[] = [];
  let current: HTMLElement | null = element;

  while (current) {
    if (getComputedStyle(current).position === "sticky") {
      current.style.setProperty("position", "static");
      affected.push(current);
    }
    current = current.offsetParent as HTMLElement | null;
  }

  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  affected.forEach((el) => el.style.removeProperty("position"));
  return top;
}

export function scrollToSection(id: string) {
  const windowRef = window as unknown as {
    __lenis?: {
      scrollTo: (
        target: number | Element | string,
        opts?: {
          offset?: number;
          duration?: number;
          force?: boolean;
          onComplete?: () => void;
        },
      ) => void;
    };
    __unsyncSnap?: () => void;
    __resyncSnap?: () => void;
  };
  const lenis = windowRef.__lenis;
  const element = document.getElementById(id);

  if (!element) return;

  // Snap plugin menginterupsi scroll programmatic, jadi nonaktifkan sementara
  windowRef.__unsyncSnap?.();

  if (lenis) {
    lenis.scrollTo(getFlowTop(element), {
      offset: 0,
      duration: 0.9,
      force: true,
      onComplete: () => windowRef.__resyncSnap?.(),
    });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
    windowRef.__resyncSnap?.();
  }
}

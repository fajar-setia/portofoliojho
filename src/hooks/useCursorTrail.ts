import { useEffect, useRef } from 'react';

// Trail images from Discord CDN
const imageArray = [
  'https://media.discordapp.net/attachments/850422431381192734/1544220622630948874/Salinan_dari_IND-rasi_code_slide6.png?ex=6a97b706&is=6a966586&hm=5b1252b3f60446069663bdd850f42d1de252621b95767b5303992b398459a60c&=&format=webp&quality=lossless&width=1536&height=864',

  'https://media.discordapp.net/attachments/850422431381192734/1544220623558021211/Salinan_dari_IND-rasi_code_slide5.png?ex=6a97b706&is=6a966586&hm=9401ad6d9a8062b1d5d4f84bfbb412c2c5c6ed08a12bbc81acf636e40702ea85&=&format=webp&quality=lossless&width=1536&height=864',

  'https://media.discordapp.net/attachments/850422431381192734/1544220624182837258/Salinan_dari_IND-rasi_code_slide2.png?ex=6a97b707&is=6a966587&hm=16c73357e5c09d875fe8dbd4d6a72caadca5a3f0dbef0c1ca9ae294f954ddec8&=&format=webp&quality=lossless&width=1536&height=864',

  'https://media.discordapp.net/attachments/850422431381192734/1544220625000857600/padelo.png?ex=6a97b707&is=6a966587&hm=e447ff0913d18cc88ee881141de32cb3289c4d499610f804c8b37b0d32ab0db4&=&format=webp&quality=lossless&width=1536&height=864'
].filter(Boolean);

interface TrailImage {
    id: number;
    x: number;
    y: number;
    image: string;
    rotation: number;
    scale: number;
    createdAt: number;
    element?: HTMLElement;
    isLeaving?: boolean;
}

interface CursorTrailOptions {
    containerRef: React.RefObject<HTMLElement | null>;
    maxImages?: number;
    lifespan?: number;
    mouseThreshold?: number;
    scatter?: number;
}

export function useCursorTrail({
    containerRef,
    maxImages = 18,
    lifespan = 500, // Durasi gambar muncul (ms) sebelum menghilang
    mouseThreshold = 150, // Cursor harus bergerak minimal 100px untuk spawn gambar baru
    scatter = 100, // Gambar menyebar maksimal 50px dari cursor
}: CursorTrailOptions) {
    const trailImagesRef = useRef<Map<number, TrailImage>>(new Map());
    const nextIdRef = useRef(0);
    const imageIndexRef = useRef(0);
    const pointerRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
    const pointerKnownRef = useRef(false);
    const pointerInsideRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);

    const getRandomImage = () => {
        if (imageArray.length === 0) return '';
        const image = imageArray[imageIndexRef.current % imageArray.length];
        imageIndexRef.current++;
        return image;
    };

    const movedFarEnough = () => {
        const { x, y, lastX, lastY } = pointerRef.current;
        return Math.hypot(x - lastX, y - lastY) >= mouseThreshold;
    };

    const createImage = (clientX: number, clientY: number) => {
        if (!pointerInsideRef.current || imageArray.length === 0 || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
        const rotation = Math.round(Math.random() * 40 - 20);

        const img = document.createElement('img');
        img.src = getRandomImage();
        img.alt = '';
        img.draggable = false;
        img.style.position = 'absolute';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.width = '240px';
        img.style.height = '190px';
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';
        img.style.opacity = '0';
        img.style.transform = `translate(-50%, -50%) scale(0) rotate(${rotation}deg)`;
        img.style.borderRadius = '10px';
        img.style.objectFit = 'cover';
        img.style.willChange = 'transform, opacity';
        img.style.transition = 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out';
        img.className = 'trail-image';

        const trailContainer = containerRef.current.querySelector('[data-trail-container]');
        if (trailContainer) {
            trailContainer.appendChild(img);
        }

        const id = nextIdRef.current++;
        const entry: TrailImage = {
            id,
            x,
            y,
            image: img.src,
            rotation,
            scale: 1,
            createdAt: performance.now(),
            element: img,
            isLeaving: false,
        };

        trailImagesRef.current.set(id, entry);

        // Trigger visible state
        requestAnimationFrame(() => {
            if (entry.element) {
                entry.element.style.opacity = '1';
                entry.element.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation}deg)`;
            }
        });

        // Enforce max images limit
        const activeImages = Array.from(trailImagesRef.current.values()).filter(
            (img) => !img.isLeaving
        );
        if (activeImages.length > maxImages) {
            removeImage(activeImages[0]);
        }
    };

    const createScatteredImage = () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * scatter;
        createImage(
            pointerRef.current.x + Math.cos(angle) * radius,
            pointerRef.current.y + Math.sin(angle) * radius
        );
    };

    const removeImage = (entry: TrailImage) => {
        if (entry.isLeaving || !entry.element) return;
        
        entry.isLeaving = true;
        entry.element.style.opacity = '0';
        entry.element.style.transform = `translate(-50%, -50%) scale(0.65) rotate(${entry.rotation}deg)`;
        entry.element.style.transitionDuration = '320ms';

        setTimeout(() => {
            entry.element?.remove();
            trailImagesRef.current.delete(entry.id);
        }, 320); // Durasi animasi menghilang (ms)
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        pointerRef.current.x = e.clientX;
        pointerRef.current.y = e.clientY;
        pointerInsideRef.current =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!pointerKnownRef.current) {
            pointerKnownRef.current = true;
            pointerRef.current.lastX = pointerRef.current.x;
            pointerRef.current.lastY = pointerRef.current.y;
        }

        if (pointerInsideRef.current && movedFarEnough()) {
            createImage(pointerRef.current.x, pointerRef.current.y);
            pointerRef.current.lastX = pointerRef.current.x;
            pointerRef.current.lastY = pointerRef.current.y;
        }
    };

    const handleScroll = () => {
        if (!pointerKnownRef.current || !pointerInsideRef.current) return;
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        pointerInsideRef.current =
            pointerRef.current.x >= rect.left &&
            pointerRef.current.x <= rect.right &&
            pointerRef.current.y >= rect.top &&
            pointerRef.current.y <= rect.bottom;

        if (pointerInsideRef.current) {
            createScatteredImage();
        }
    };

    const animate = () => {
        const now = performance.now();

        trailImagesRef.current.forEach((entry) => {
            if (now - entry.createdAt >= lifespan) {
                removeImage(entry);
            }
        });

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create trail container
        let trailContainer = container.querySelector('[data-trail-container]') as HTMLElement;
        if (!trailContainer) {
            trailContainer = document.createElement('div');
            trailContainer.setAttribute('data-trail-container', '');
            trailContainer.style.position = 'absolute';
            trailContainer.style.top = '0';
            trailContainer.style.left = '0';
            trailContainer.style.width = '100%';
            trailContainer.style.height = '100%';
            trailContainer.style.pointerEvents = 'none';
            trailContainer.style.overflow = 'hidden';
            container.style.position = 'relative';
            container.insertBefore(trailContainer, container.firstChild);
        }

        container.addEventListener('mousemove', handleMouseMove, { passive: true });
        container.addEventListener('scroll', handleScroll, { passive: true });

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('scroll', handleScroll);
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            trailContainer?.remove();
        };
    }, []);
}

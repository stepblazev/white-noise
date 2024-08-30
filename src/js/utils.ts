export function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

let currentJumpAnimation: number | null = null;
export function jumpTo(target: Element, options: { offset: number, duration: number }): void {
    if (currentJumpAnimation) {
        cancelAnimationFrame(currentJumpAnimation);
    }
    
    const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY + options.offset;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
        const timeElapled = currentTime - startTime;
        const progress = Math.min(timeElapled / options.duration, 1);
        const distance = targetPosition - startPosition;
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
        
        if (progress < 1) {
            currentJumpAnimation = requestAnimationFrame(animate);
        } else {
            currentJumpAnimation = null;
        }
    };
    
    currentJumpAnimation = requestAnimationFrame(animate);
}
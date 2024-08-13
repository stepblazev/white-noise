import { LineShuffler } from "./modules/LineShuffler";

/* Настройки сменяющегося текста */
const lineShuffler = new LineShuffler({
    node: document.getElementById('toolNames') as HTMLDivElement,
    lines: [
        { text: 'JavaScript', color: '#f4ca3a' },
        { text: 'Git', color: '#f64d27' },
        { text: 'TypeScript', color: '#3a93f4' },
        { text: 'Angular', color: '#ea3633' },
        { text: 'SQL', color: '#398fc5' },
        { text: 'SCSS', color: '#e43396' },
        { text: 'Docker', color: '#2792f3' },
        { text: 'PHP', color: '#7c72d9' },
        { text: 'Tailwind', color: '#27bff3' },
        { text: 'Laravel', color: '#f05340' },
    ],
    speed: 80,
    pause: 1500
});

lineShuffler.start();

/* Настройки курсора */
const $cursor = document.getElementById('cursor') as HTMLDivElement;

let lastMouseX = 0;
let lastMouseY = 0;

window.addEventListener('mousemove', (event: MouseEvent) => {
    $cursor.classList.remove('_hidden')

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    
    $cursor.style.left = `${event.pageX}px`;
    $cursor.style.top = `${event.pageY}px`;

    const $target = event.target as HTMLElement;
    const tags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];
    if (
        tags.includes($target.tagName) ||
        ($target.parentElement && tags.includes($target.parentElement?.tagName))
    ) {
        $cursor.classList.add('_link');
    } else {
        $cursor.classList.remove('_link');
    }
});

window.addEventListener('scroll', () => {
    $cursor.style.left = `${lastMouseX + window.scrollX}px`;
    $cursor.style.top = `${lastMouseY + window.scrollY}px`;
});

window.addEventListener('mouseout', () => {
    $cursor.classList.add('_hidden');
});

/* Настройки хедера при скролле */
const $header = document.querySelector('.header') as HTMLDivElement;
const checkScrollPositionForHeader = () => {
    if (window.scrollY > 180) {
        $header.classList.add('_scrolled');
    } else {
        $header.classList.remove('_scrolled');
    }
};

window.addEventListener('load', checkScrollPositionForHeader);
window.addEventListener('scroll', checkScrollPositionForHeader);



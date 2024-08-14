import { LineShuffler } from "./modules/LineShuffler";
import jumpTo from 'jump.js'

window.scrollTo({ top: 0, behavior: 'instant' })

/* Настройки сменяющегося текста в приветствии */
const $toolNames = document.getElementById('toolNames');
if ($toolNames) {
    const lineShuffler = new LineShuffler({
        node: $toolNames,
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
} else {
    console.error('Tool names holder not found');
}


/* Настройки курсора */
const $cursor = document.getElementById('cursor') as HTMLDivElement | null;

if ($cursor) {
    let lastMouseX = 0;
    let lastMouseY = 0;

    window.addEventListener('mousemove', (event: MouseEvent) => {
        $cursor.classList.remove('_hidden')

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        $cursor.style.left = `${event.pageX}px`;
        $cursor.style.top = `${event.pageY}px`;

        const $target = event.target as HTMLElement;
        const tags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL'];
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
} else {
    console.error('Custom cursor not found');
}


/* Настройки хедера при скролле */
const $header = document.querySelector('.header') as HTMLDivElement | null;
if ($header) {
    const checkScrollPositionForHeader = () => {
        if (window.scrollY > 180) {
            $header.classList.add('_scrolled');
        } else {
            $header.classList.remove('_scrolled');
        }
    };

    window.addEventListener('load', checkScrollPositionForHeader);
    window.addEventListener('scroll', checkScrollPositionForHeader);
} else {
    console.error('Header not found');
}


/* Настройки прогрессбара */
const $progressbar = document.getElementById('progressbar') as HTMLDivElement | null;
if ($progressbar) {
    window.addEventListener('scroll', function () {
        const widthCoef = window.scrollY / (document.documentElement.offsetHeight - window.innerHeight);
        $progressbar.style.width = `${widthCoef * 100}%`;

        if (widthCoef >= 1) {
            $progressbar.classList.add('_full');
        } else {
            $progressbar.classList.remove('_full');
        }
    });
} else {
    console.error('Progressbar not found');
}


/* Настройка навбара */
const navbarLinks = document.querySelectorAll('.header__link') as NodeListOf<HTMLAnchorElement>;

const setActiveLink = ($targetLink: HTMLAnchorElement) => {
    $targetLink.classList.add('_active');
    [...navbarLinks].forEach($link => {
        if ($link !== $targetLink) {
            $link.classList.remove('_active');
        }
    })
};

const isActiveLink = ($targetLink: HTMLAnchorElement): boolean => {
    return $targetLink.classList.contains('_active');
};

for (let $link of navbarLinks) {
    $link.addEventListener('click', function (event: MouseEvent) {
        event.preventDefault();

        if (!isActiveLink($link)) {
            const href = $link.getAttribute('href')!.replace('#', '');
            const $target = document.querySelector(`[id="${href}"]`);

            setActiveLink($link);

            jumpTo($target, {
                offset: -100,
                duration: 600,
            });
        }
    });
}

// const observerCallback: IntersectionObserverCallback = (entries, observer) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//         }
//     });
// }

// const sectionsObserver = new IntersectionObserver(observerCallback, { });

// const sections = document.querySelectorAll('[data-observe]');
// for (let $section of sections) {
//     sectionsObserver.observe($section);
// }
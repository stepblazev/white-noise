import { TextShuffler } from "./modules/text-shuffler";
import { hasTouchScreen, jumpTo } from "./utils";

window.scrollTo({ top: 0, behavior: 'instant' })

// #region settings for changing text in the greeting
const $toolNames = document.getElementById('tool-names');
if ($toolNames) {
    const textShuffler = new TextShuffler({
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

    textShuffler.start();
} else {
    console.error('Tool names holder not found');
}
// #endregion


// #region custom cursor settings
const $cursor = document.getElementById('cursor') as HTMLDivElement | null;

if (hasTouchScreen()) {
    $cursor?.remove();
} else if ($cursor) {
    let lastMouseX = 0;
    let lastMouseY = 0;

    window.addEventListener('mousemove', (event: MouseEvent) => {
        $cursor.classList.remove('_hidden');

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
// #endregion


// #region header settings on scroll
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
// #endregion


// #region progressbar settings
const $progressbar = document.getElementById('progressbar') as HTMLDivElement | null;
if ($progressbar) {
    window.addEventListener('scroll', function () {
        const widthCoef = window.scrollY / (document.documentElement.offsetHeight - window.innerHeight);
        $progressbar.style.width = `${widthCoef * 100}%`;
    });
} else {
    console.error('Progressbar not found');
}
// #endregion


// #region navbar and sections settings
const navbarLinks = document.querySelectorAll('.header__link') as NodeListOf<HTMLAnchorElement>;
const sections = document.querySelectorAll('[data-observe]');

const setActiveLink = ($targetLink: HTMLAnchorElement) => {
    for (let $link of navbarLinks) {
        $link.classList.remove('_active');
    }
    $targetLink.classList.add('_active');
};

const isActiveLink = ($targetLink: HTMLAnchorElement): boolean => {
    return $targetLink.classList.contains('_active');
};

const unobserveAllSections = () => {
    sections.forEach($section => sectionsObserver.unobserve($section));
};

const observeAllSections = () => {
    sections.forEach($section => sectionsObserver.observe($section));
};

let prevTimeout: number;

for (let $link of navbarLinks) {
    $link.addEventListener('click', function (event: MouseEvent) {
        event.preventDefault();
        const $targetSection = document.querySelector($link.getAttribute('href')!);

        if (!isActiveLink($link) && $targetSection) {
            setActiveLink($link);
            unobserveAllSections();
            
            const offset = window.innerWidth > 768 ? -250 : -200 ;
            
            jumpTo($targetSection, {
                offset: offset,
                duration: 1000,
            });

            if (prevTimeout) {
                clearTimeout(prevTimeout);
            }
            
            prevTimeout = setTimeout(() => {
                prevTimeout = 0;
                observeAllSections();
            }, 1000); // same delay as jumpTo duration (or greater) to avoid intersection observer
        }
    });
}

const observerCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            for (let $link of navbarLinks) {
                if ($link.getAttribute('href') === `#${sectionId}`) {
                    setActiveLink($link);
                    break;
                }
            }
        }
    });
}

const sectionsObserver = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: '-100% 0px 0px 0px',
    threshold: 0
});

observeAllSections();
// #endregion


// #region switch socials to fixed when scrolled
const $socialsObserveArea = document.getElementById('greeting') as HTMLDivElement;
const $socials = document.querySelector('.socials') as HTMLDivElement;

const socialsObserver = new IntersectionObserver((entries) => {
    const targetEntry = entries[0];
    if (targetEntry.isIntersecting) {
        $socials.classList.remove('_fixed');
    } else {
        $socials.classList.add('_fixed');
    }
}, {
    threshold: 0.2
});

socialsObserver.observe($socialsObserveArea);
// #endregion


// #region animate element apearing on scroll
const elementsToApear = document.querySelectorAll<HTMLElement>('[data-animate]');

const apearAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('data-animate', '');
        }
    })    
}, {
    threshold: 0,
    rootMargin: '-70% 0% -30% 0%',
});

elementsToApear.forEach(element => {
    apearAnimationObserver.observe(element);
});
// #endregion
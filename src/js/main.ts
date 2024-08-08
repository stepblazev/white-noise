import { LineShuffler } from "./modules/LineShuffler";

const lineShuffler = new LineShuffler({
    node: document.getElementById('toolNames') as HTMLDivElement,
    lines: [
        { text: 'JavaScript', color: '#f4ca3a' },
        { text: 'TypeScript', color: '#3a93f4' },
        { text: 'PHP', color: '#7c72d9' },
        { text: 'Angular', color: '#ea3633' },
        { text: 'SQL', color: '#398fc5' },
        { text: 'SCSS', color: '#e43396' },
        { text: 'Docker', color: '#2792f3' },
        { text: 'Laravel', color: '#f05340' },
        { text: 'Tailwind', color: '#27bff3' },
    ],
    speed: 100,
    pause: 1500
});

lineShuffler.start();

const $gloader = document.querySelector('.gloader') as HTMLDivElement;

export const gloader = {
    _element: $gloader,
    enable() {
        $gloader.classList.remove('_hidden');
    },
    disable() {
        $gloader.classList.add('_hidden');
    }
}
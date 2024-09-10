const $popup = document.querySelector('.popup') as HTMLDivElement;
const $popupMessage = $popup.querySelector('.popup__message') as HTMLElement;
const $popupClose = $popup.querySelector('.popup__close') as HTMLButtonElement;

export const popup = {
    _element: $popup,
    show(message: string) {
        $popupMessage.textContent = message;
        $popup.classList.remove('_hidden');
    },
    hide() {
        $popup.classList.add('_hidden');
    }
}

$popupClose.addEventListener('click', () => {
    popup.hide();
});
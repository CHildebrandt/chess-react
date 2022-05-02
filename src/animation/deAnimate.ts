function deAnimate() {
    const pieces = Array.from(document.getElementsByClassName('moving')) as HTMLDivElement[];
    for (const piece of pieces) {
        piece.classList.remove('moving');
        piece.style.transition = '';
        piece.style.transform = '';
    }
}

export default deAnimate;
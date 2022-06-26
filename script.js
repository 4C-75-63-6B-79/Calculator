// script.js

function keyPressEvent(key) {
    console.log(key.textContent);
    key.classList.add('pressed');
}

function endTransition(event){
    if(event.propertyName !== 'transform') {
        return;
    }
    this.classList.remove('pressed');
}

const keys = Array.from(document.querySelectorAll('.button'));
keys.forEach((key) => key.addEventListener('click', () => keyPressEvent(key)));
keys.forEach((key) => key.addEventListener('transitionend', endTransition));

window.addEventListener('keydown', (event) => {
    const key = document.querySelector(`div[data-code="${event.code}"]`);
    if(key) {
        keyPressEvent(key);
    }
})
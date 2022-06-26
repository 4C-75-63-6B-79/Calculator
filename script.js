// script.js

let currentValue = '', previousValue = '' ;
let currentSymbol = '', previousSymbol = '';

function keyPressEvent(key) {
    mainCalculatorFunction(key.textContent.trim());
    key.classList.add('pressed');
}

function endTransition(event){
    if(event.propertyName !== 'transform') {
        return;
    }
    this.classList.remove('pressed');
}

function start() {
    const keys = Array.from(document.querySelectorAll('.button'));
    keys.forEach((key) => key.addEventListener('click', () => keyPressEvent(key)));
    keys.forEach((key) => key.addEventListener('transitionend', endTransition));

    window.addEventListener('keydown', (event) => {
        const key = document.querySelector(`div[data-code="${event.code}"]`);
        if(key) {
            keyPressEvent(key);
        }
    });
}

function mainCalculatorFunction(input) {
    if(Number(input) >=0 && Number(input) <= 9) {
        currentValue += input;
        document.querySelector('#line2').textContent =  currentValue;
    }
    if(input == '+' || input == '-' || input == '*' || input == '/') {
        if(currentSymbol == '') {
            currentSymbol = input;
            previousValue = currentValue;
            currentValue = '';
            document.querySelector('#line1').textContent = previousValue + currentSymbol;
            document.querySelector('#line2').textContent =  currentValue;            
        } else {
            previousSymbol = currentSymbol;
            currentSymbol = input;
            solve();
            currentValue = '';
            document.querySelector('#line1').textContent = previousValue + currentSymbol;
            document.querySelector('#line2').textContent =  currentValue; 
        }
    }
}

function solve() {
    if(previousSymbol == '+') {
        previousValue = Number(previousValue) + Number(currentValue);
    } else if(previousSymbol == '-') {
        previousValue = Number(previousValue) - Number(currentValue);
    } else if(previousSymbol == '*') {
        previousValue = Number(previousValue) * Number(currentValue);
    } else if(previousSymbol == '/') {
        previousValue = Number(previousValue) / Number(currentValue);
    }
}




start();
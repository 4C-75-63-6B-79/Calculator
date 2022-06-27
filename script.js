// script.js

let currentValue = '', previousValue = '' ;
let currentSymbol = '', previousSymbol = '';

function keyPressEvent(key) {
    mainCalculatorFunction(key.textContent.trim());
    key.classList.add('pressed');
}

function mouseOverEvent(key) {
    key.classList.add('active');
}

function endTransition(event){
    if(event.propertyName !== 'transform') {
        return;
    } 
    this.classList.remove('pressed');
    // this.classList.remove('active');
}

function start() {
    const keys = Array.from(document.querySelectorAll('.button'));
    keys.forEach((key) => key.addEventListener('click', () => keyPressEvent(key)));
    keys.forEach((key) => key.addEventListener('transitionend', endTransition));
    // keys.forEach((key) => key.addEventListener('mouseover', () => mouseOverEvent(key)));

    window.addEventListener('keydown', (event) => {
        const key = document.querySelector(`div[data-code="${event.code}"]`);
        if(key) {
            keyPressEvent(key);
        }
    });
}

// This is a terrible way to write a caluclator function and I am sorry as I was not able to make the thing work using functions.
function mainCalculatorFunction(input) {
    if(Number(input)>=0 && Number(input)<=9 || input == '.') {
        if(currentValue.includes('.') && input == '.') {
            return;
        }
        currentValue += input;
        document.querySelector('#line2').textContent = currentValue;
    } else if(input == '+' || input == '-' || input == '*' || input == '/'){
        if(previousValue == '' && currentValue == '') {
            return;
        }
        if(currentSymbol == '' && previousSymbol == '') {
            currentSymbol = input;
            previousValue += currentValue;
            currentValue = '';
            document.querySelector('#line1').textContent = previousValue + currentSymbol;
            document.querySelector('#line2').textContent = currentValue;
        } else if(currentSymbol == '=') {
            currentSymbol = input;
            previousSymbol = currentSymbol;
            document.querySelector('#line1').textContent = previousValue + currentSymbol;
            currentValue = '';
            document.querySelector('#line2').textContent = currentValue;
        } else {
            previousSymbol = currentSymbol;
            currentSymbol = input;
            solve();
            document.querySelector('#line1').textContent = previousValue + currentSymbol;
            currentValue = '';
            document.querySelector('#line2').textContent = currentValue;
        } 
    } else if(input == '=') {
        if(currentSymbol == '=') {
            return;
        }
        if(previousValue != '') {
            previousSymbol = currentSymbol;
            currentSymbol = input;
            document.querySelector('#line1').textContent = previousValue + previousSymbol + currentValue + currentSymbol;
            solve();
            document.querySelector('#line2').textContent = previousValue;
            currentValue = '';
        }
    } else {
        if(input.toLowerCase() == 'clear-all') {
            currentValue = '';
            previousValue = '';
            currentSymbol = '';
            previousSymbol = '';
            document.querySelector('#line2').textContent = currentValue;
            document.querySelector('#line1').textContent = previousValue;
        } else if(input.toLowerCase() == 'backspace') {
            currentValue = currentValue.slice(0, currentValue.length-1);
            document.querySelector('#line2').textContent = currentValue;
        }
    } 

}


function solve() {
    if(currentValue == '' || previousValue == '') {
        return;
    }
    if(previousSymbol == '+') {
        previousValue = Number(previousValue) + Number(currentValue);
    } else if(previousSymbol == '-') {
        previousValue = Number(previousValue) - Number(currentValue);
    } else if(previousSymbol == '*') {
        previousValue = Number(previousValue) * Number(currentValue);
    } else if(previousSymbol == '/') {
        previousValue = Number(previousValue) / Number(currentValue);
    }

    round();
}

function round() {
    var answerLength = previousValue.toString().length;
    if(answerLength < 12) {
        return;
    }
    if(previousValue.toString().includes('.')) {
        previousValue = Math.round(previousValue * 1000000000) / 1000000000;
    }
}




start();
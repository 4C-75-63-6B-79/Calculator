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

// This is a terrible way to write a caluclator function and I am sorry as I was not able to make the thing work using functions.
function mainCalculatorFunction(input) {
    if(Number(input)>=0 && Number(input)<=9 || input == '.') {
        if(currentValue.includes('.') && input == '.') {
            return;
        }
        currentValue += input;
        document.querySelector('#line2').textContent = currentValue;
    } else if(input == '+' || input == '-' || input == '*' || input == '/'){
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
        if(previousValue != '') {
            previousSymbol = currentSymbol;
            currentSymbol = input;
            document.querySelector('#line1').textContent = previousValue + previousSymbol + currentValue + currentSymbol;
            solve();
            document.querySelector('#line2').textContent = previousValue;
            currentValue = '';
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
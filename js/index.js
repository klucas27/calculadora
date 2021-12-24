'use strict';

const dysplay = document.getElementById('resu');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=opera]');

let novoNumero = true;

let operador;

let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(dysplay.textContent.replace(",", "."));
        novoNumero = true;
        if (numeroAtual != "") {
            const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
            atualizarDisplay(resultado)
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        dysplay.textContent = texto.toLocaleString("BR");
        novoNumero = false;
    } else {
        dysplay.textContent += texto.toLocaleString("BR");
    }
}

const inserirNumeros = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumeros));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(dysplay.textContent.replace(",", "."));
        console.log(dysplay.textContent);
    }
}

operadores.forEach(numero => numero.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDysplay = () => dysplay.textContent = "";

document.getElementById('clear').addEventListener('click', limparDysplay);

const limparCalculo = () => {
    limparDysplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('clearAll').addEventListener('click', limparCalculo);

const removeUltimoNumero = () => {
    dysplay.textContent = dysplay.textContent.slice(0, -1);
}

document.getElementById('backSpace').addEventListener('click', removeUltimoNumero);


const plusMiles = () => {
    if (dysplay.textContent != "") {
        dysplay.textContent = (parseFloat(dysplay.textContent) * (-1));
    }
}

document.getElementById('plusMiles').addEventListener('click', plusMiles);

const existeDecimal = () => dysplay.textContent.indexOf(",") != -1;

const existeValor = () => dysplay.textContent.length > 0;

const dottAdd = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(",");
        } else {
            atualizarDisplay("0,");
        }
    }
}

document.getElementById('dottAdd').addEventListener('click', dottAdd);

const tecladoMap = {
    '0': "teclazero",
    '1': "teclaone",
    '2': "teclatwo",
    '3': "teclathree",
    '4': "teclafour",
    '5': "teclafive",
    '6': "teclasix",
    '7': "teclaseven",
    '8': "teclaeight",
    ',': "dottAdd",
    '+': "operaplus",
    '-': "operamilus",
    '*': "operamult",
    '/': "operadiv",
    'Enter': "igual",
    'Backspace': "backSpace",
    'Delete': "clear",
    'End': "clearAll",
    'n': "plusMiles",
}

const mapearTeclas = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(tecladoMap).indexOf(tecla) != -1;
    if (teclaPermitida()) document.getElementById(tecladoMap[tecla]).click();

}

document.addEventListener('keydown', mapearTeclas);
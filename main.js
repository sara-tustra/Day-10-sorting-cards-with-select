const possibleCardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', '<img class="image" src="images/queen.jpeg" alt="">', '<img class="image" src="images/king.png" alt="">']
const possibleSuitValues = ['♦', '♥', '♠', '♣'];
const drawButton = document.querySelector('#drawButton');
const sortButton = document.querySelector('#sortButton');
let ordenarCartas = [];

function createCards(elem) {
    let input = document.getElementById('quantityOfCards');
    let quantityOfCards = parseInt(input.value);
    ordenarCartas = [];
    function cambiarValor(valor) {
        switch (valor) {
            case 'A': return "1";
            case 'J': return "11";
            case '<img class="image" src="images/queen.jpeg" alt="">': return '12';
            case '<img class="image" src="images/king.png" alt="">': return '13';
            default: return valor;
        }
    }

    for (let i = 0; i < quantityOfCards; i++) {

        let randomSuit = Math.floor(Math.random() * possibleSuitValues.length);
        let randomCardValue = Math.floor(Math.random() * possibleCardValues.length);

        let card = document.createElement('div');
        card.classList.add('card');

        let cardValue = document.createElement('div');
        cardValue.classList.add('cardValue');
        cardValue.innerHTML = possibleCardValues[randomCardValue];



        let topSuit = document.createElement('div');
        topSuit.classList.add('topSuit');
        topSuit.innerHTML = possibleSuitValues[randomSuit];

        let bottonSuit = document.createElement('div');
        bottonSuit.classList.add('bottonSuit');

        if (topSuit.innerHTML === '♥' || topSuit.innerHTML === '♦') {
            topSuit.style.color = "red";
            bottonSuit.style.color = "red";
        } else {
            topSuit.style.color = "black";
            bottonSuit.style.color = "black";
        };

        bottonSuit.innerHTML = topSuit.innerHTML;

        card.appendChild(topSuit);
        card.appendChild(cardValue);
        card.appendChild(bottonSuit);
        elem.appendChild(card);

        let contenidoDeCarta = {
            number: parseInt(cambiarValor(cardValue.innerHTML)),
            html: card.innerHTML
        }
        ordenarCartas.push(contenidoDeCarta);
    }
}


drawButton.addEventListener('click', (e) => {

    const drawedCards = document.querySelector('#drawedCards');
    drawedCards.innerHTML = "";
    createCards(drawedCards);
    let sortedCards = document.getElementById('sortedCards');
    sortedCards.innerHTML = "";
});


sortButton.addEventListener('click', (e) => {
    let sortedCards = document.getElementById('sortedCards');
    sortedCards.innerHTML = "";

    for (let min = 0; min < ordenarCartas.length - 1; min++) {
        for (let i = min + 1; i < ordenarCartas.length; i++) {
            if (ordenarCartas[min].number > ordenarCartas[i].number) {
                let aux = ordenarCartas[min];
                ordenarCartas[min] = ordenarCartas[i];
                ordenarCartas[i] = aux;

                let pasoUno = document.createElement('div');
                pasoUno.classList.add('hileras');
                sortedCards.appendChild(pasoUno);
                var numerodepaso = sortedCards.childElementCount;
                pasoUno.innerHTML = numerodepaso;

                for (let a = 0; a < ordenarCartas.length; a++) {
                    let newCard = document.createElement('div');
                    newCard.classList.add('newCard');
                    newCard.innerHTML = ordenarCartas[a].html;
                    pasoUno.appendChild(newCard);
                }
            }
        }
    }
});
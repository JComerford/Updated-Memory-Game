/*
 * Create a list that holds all of your cards
 */
let deckOfCards = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"];
let deck = document.querySelector('.deck');
let cards = document.querySelectorAll('.card');
let card = document.querySelector('.card');
let openCards = []; //openCards.length
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//loop through each card and create its HTML

//set up the event listener for a card.
cards.forEach(card => {
    card.addEventListener('click', (e => { //if card is clicked: Check conditions:
        if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) { 
            addToOpenCards(card); // add card to list of open cards
            flipCard(card); // show image on card          
        }  
        if (openCards.length === 2) {
            setTimeout(function() {
                openCards.forEach(card => {
                    card.classList.remove('open', 'show');
                });
                openCards = [];
            }, 1000);
         } 
    }));
});

 /*   - add each card's HTML to the page
 */

 //display the card's symbol
function flipCard(card) {
    card.classList.add('open', 'show');
    console.log(openCards);
}

//adds to NodeList
function addToOpenCards(card) {
    openCards.push(card);
}

// if the list already has another card, check to see if the two cards match
 

 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

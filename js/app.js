/*
 * Create a list that holds all of your cards. Placed here, before we create the HTML for the cards, or later functions cannot use these variables.
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

 //Define each card and create its HTML. This function must be placed here because of scoping.
function generateCard(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}
//Defines the array and repositions them within the array using the shuffle function.
function initGame() {
    let cardHTML = shuffle(deckOfCards).map(card => { //Call shuffle function here, to shuffle cards when initGame is called.
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join(''); 
}
initGame(); //add each card's HTML to the page


/****** 
 * 
 * Global Variables
 * 
******/
let cards = document.querySelectorAll('.card');
let card = document.querySelector('.card');
let openCards = []; //openCards.length
let moves = 0; //sets the move counter to 0 on start of game.
let stars = document.querySelectorAll('.stars li'); //selects all with stars in class and li as an element
let star = document.querySelector('fa fa-star');
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

//set up the event listener for a card. Event listener created for each card.
cards.forEach(card => {
    card.addEventListener('click', (e => { //if card is clicked:
        if (canCardBeClicked(card)) { //check conditional for click
            addToOpenCards(card); // add card to list of open cards
            flipCard(card); // show image on card  
            matchMaker(card); //check cards for match. If match, stay flipped. If not, flip over.

        }     
    }));
});

//Set conditional for card to be clicked.
 function canCardBeClicked(card) {
     return (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'));
 }


//display the card's symbol
function flipCard(card) {
    card.classList.add('open', 'show');
    console.log(openCards);
}

//if cards do not match, flip them back over after specified time.
function flipBack(card) {
    setTimeout(function () {
        openCards.forEach(card => {
            card.classList.remove('open', 'show');
        });
        openCards = [];
    }, 1000);
}
//adds to NodeList
function addToOpenCards(card) {
    openCards.push(card);
}

// if the list already has another card, check to see if the two cards match, if not call function flipBack within this function matchMaker.
function matchMaker() { //if the cards do match, lock the cards in the open position
    if (openCards.length === 2) {
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
            console.log("Match!");
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            openCards = [];
            turn();
            checkScore();
        } else {
            flipBack(); // if the cards do not match, remove the cards from the list and hide the card's symbol
            turn();
            checkScore();
        }
    }
} 

//   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
// Move counter 
function turn() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

//Changes score of how many stars depending on how many moves user made.
function checkScore() {
    if (moves === 13 || moves === 16 || moves === 20) {
        removeStar();
    }
}

//Counting Stars
function removeStar() {
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
removeStar();
removeStar();
//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 


 /* Adapted from Mike Wales FEND webinar - https: //www.youtube.com/watch?v=_rUH-sEs68Y
 *                            &
 * Matthew Cranford 's Blog, "Journey to Greatness" - https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
 */

 /*
 * Create a list that holds all of your cards. Placed here, before we create the HTML for the cards, or later functions cannot use these variables.
 */

/******** 
*
* Global variables
*
********/

let deckOfCards = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"];
let deck = document.querySelector('.deck');
let moves = 0; //sets the move counter to 0 on start of game.
let star = document.querySelector('.stars');
let cards = document.querySelectorAll('.card');
let card = document.querySelector('.card');
let openCards = []; //openCards.length
let stars = document.querySelectorAll('.stars li'); //selects all with stars in class and li as an element
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
let allMatched = 8;

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
    checkScore();
    let cards = document.querySelectorAll('.card');
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
}
initGame(); //add each card's HTML to the page

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

/*
Updated: This is no longer needed here as it is put with the page load/reset.
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
*/

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
            matched++;
            turn();
            checkScore();
            console.log(`Matched = ${matched}`); //for debugging
        } if (matched === allMatched) {
            gameOver();
        } else {
            flipBack(); // if the cards do not match, remove the cards from the list and hide the card's symbol
            turn();
            checkScore();
        }
    }
} 

// increment the move counter and display it on the page
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

//Counting Stars----------------------------TODO: If in so many moves, toggle class of star "hide".  Or, can I "pop" or "slice" from live nodelist?
function removeStar() {
    const stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
removeStar();
removeStar();

//Following code deals with giving the clock functionality.
//Timer begins when user clicks a card.
function startClock() {
        clockId = setInterval(() => {
            time++;
            displayTime();
            //console.log(time); //for debugging
        }, 1000);
    }

//This adds an event listener for the deck which starts the timer. This was done this way to eliminate the clock from incrementing by another second every time a card was clicked.
deck.addEventListener('click', (() => {
    if (clockOff) {
        startClock();
        clockOff = false;
    }
}))

//Stop clock when game ends.
function stopClock() {
    clearInterval(clockId); 
}

//Displays time in browser. Gives both minutes and seconds.
function displayTime() {
    const clock = document.querySelector('.clock');
    //console.log(clock); // for debugging
    clock.innerHTML = time;
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    if (seconds < 10) {
        clock.innerHTML = `Time ${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `Time ${minutes}:${seconds}`;
    }
}

// if all cards have matched, display a message with the final score
//dealing with modal when user finishes game: pop-up.
function toggleModal() {
    const modal = document.querySelector('.modal-background'); //sets variable to toggle.
    modal.classList.toggle('hide'); //toggle on/off, hide/un-hide
}
toggleModal(); //Calls to open modal
toggleModal(); //calls to hide modal

//For testing Modal: Keeps modal displayed so one can mess with asthetics.
/*time = 121;
displayTime(); //2:01
moves = 16;
checkScore(); //2 stars
writeModalStats();
toggleModal(); //open modal
*/

function writeModalStats() {
    const timeStat = document.querySelector('.modal-time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal-moves');
    const starsStat = document.querySelector('.modal-stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(`Stars = ${starCount}`); //2
    return starCount;
}

//modal button functionality
//Cancel-button:
document.querySelector('.modal-cancel').addEventListener('click', toggleModal);


//Replay Button:
document.querySelector('.modal-replay').addEventListener('click', replayButton);


//Giving reset button functionality.
function resetStats() {
    stopClock(); //stops clock
    clockOff = true;
    time = 0;
    displayTime(); //resets clock
    matched = 0; //sets matched pairs count back to 0 from 8.
    moves = 0; //resets moves
    document.querySelector('.moves').innerHTML = moves;
    //stars = 0;

    let stars = document.querySelectorAll('.stars li');  
    for (star of stars) {
        star.style.display = 'inline';
    }
}

//Resets game, resets score panel, & shuffles deck.
function gameReset() { 
    initGame();
    resetStats();   

    //resetCards();
    //checkScore();

    
}

function replayButton() {
    gameReset();
    toggleModal();
    //resetCards();  
    //resetStats();

}
//Functionality for "Reset" Button:
document.querySelector('.restart').addEventListener('click', gameReset);

//reset game after win
function resetCards() {                                    
    const cards = document.querySelectorAll('.deck li');   
    for (let card of cards) {
        card.className = 'card';
    }
}

//End of Game
function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}


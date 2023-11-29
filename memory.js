const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer;

const timerDisplay = document.getElementById("timer");

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            if (matched === 0) {
                startTimer();
            }
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function startTimer() {
    let timeRemaining = 60; // 60 seconds

    timer = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameOver();
        }

        // Display the time remaining if needed
        // You can update a timer display element here if you have one
        // Update the timer display
        timerDisplay.textContent = `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
    }, 1000);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function gameOver() {
    alert("Game Over! You ran out of time. Please try again.");
    resetGame();
}

function resetGame() {
    clearInterval(timer);
    shuffleCard();
}

shuffleCard();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

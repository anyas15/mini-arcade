// retrieve the total points from local storage
function getTotalPoints() {
    return parseInt(localStorage.getItem('totalPoints')) || 0;
}

// update total points on home page
function updateTotalPoints() {
    const totalPointsElement = document.getElementById('totalPoints');
    totalPointsElement.textContent = getTotalPoints();
}

// update total points on page load
window.addEventListener('load', updateTotalPoints);

function updatePlantImage() {
    const totalPoints = getTotalPoints();
    const plantImage = document.getElementById('plantImage');

    if (totalPoints >= 5) {
        plantImage.src = 'images\plantgrow_5.png'; 
    } else if (totalPoints >= 4) {
        plantImage.src = 'images\plantgrow_4.png'; 
    } else if (totalPoints >= 3) {
        plantImage.src = 'images\plantgrow_3.png'; 
    } else if (totalPoints >= 2) {
        plantImage.src = 'images\plantgrow_2.png'; 
    } else {
        plantImage.src = 'images\plantgrow_1.png'; 
    }
}

// grow the plant
function levelUpPlant() {
    const totalPoints = getTotalPoints();

    // check if the user has enough points to level up
    if (totalPoints >= 2) {
        // subtract from total points after spending
        updateAndStorePoints(-2);

        // call update function to update the plant image
        updatePlantImage();
    } else {
        alert('Not enough points to level up the plant!');
    }
}

// fix plant image on page load
window.addEventListener('load', updatePlantImage);
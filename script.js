// retrieve the total points from local storage
function getTotalPoints() {
    return parseInt(localStorage.getItem('totalPoints')) || 0;
}

// update total points on home page
function updateTotalPoints() {
    const totalPointsElement = document.getElementById('total-points');
    const totalPoints = getTotalPoints();

    // Set the total points on the home page
    totalPointsElement.textContent = 'Total Points: ' + totalPoints;
}

// update total points on page load
window.addEventListener('load', updateTotalPoints);

function updatePlantImage() {
    const totalPoints = getTotalPoints();
    const plantImage = document.getElementById('plant-image');

    if (totalPoints >= 100) {
        plantImage.src = 'images/plantgrow_5.png'; 
    } else if (totalPoints >= 75) {
        plantImage.src = 'images/plantgrow_4.png'; 
    } else if (totalPoints >= 50) {
        plantImage.src = 'images/plantgrow_3.png'; 
    } else if (totalPoints >= 25) {
        plantImage.src = 'images/plantgrow_2.png'; 
    } else {
        plantImage.src = 'images/plantgrow_1.png'; 
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
        alert('Play more games to earn enough points to grow your plant!');
    }
}

// fix plant image on page load
window.addEventListener('load', updatePlantImage);

// update and store points in local storage
function updateAndStorePoints(points) {
    let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
    totalPoints += points;
    localStorage.setItem('totalPoints', totalPoints);
    updateTotalPoints();
}

function resetTotalPoints() {
    localStorage.setItem('totalPoints', 0);
    updateTotalPoints(); 
    updatePlantImage();
}

const resetPointsButton = document.getElementById('resetPointsButton'); 
resetPointsButton.addEventListener('click', resetTotalPoints);
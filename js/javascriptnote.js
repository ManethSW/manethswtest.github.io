function initializing() {

    // check to see if there is a value in local storage
    if (localStorage.getItem('loyaltyPointsLocal')) {
        loyaltyPoints = parseInt(localStorage.getItem('loyaltyPointsLocal'));
    } else {
        loyaltyPoints = 0;
    }


    //getting the object from local storage
    if (localStorage.getItem('favOrder')) {
        let favOrder = JSON.parse(localStorage.getItem('favOrder'));
    }

    //updating the output
    updateLoyaltyPoints();
    updateFavOutput();
    updateCurrentOutput();
    updateCurrentCost();
    updateOverallOutput();

    currentLoyalty.innerHTML = `0pts`;
}
function calLoyaltyPoints(slAdult, slChild, fAdult, fChild, infant) {
    slAdultCount += parseInt(slAdult);
    slChildCount += parseInt(slChild);
    fAdultCount += parseInt(fAdult);
    fChildCount += parseInt(fChild);
    infantCount += parseInt(infant);
    totalCount = slAdultCount + slChildCount + fAdultCount + fChildCount + infantCount;

    let tempCount = 0;
    if (totalCount > 3) {
        tempCount = totalCount - 3;
        loyaltyPoints = tempCount * 15;
    }
}

function updateLoyaltyPoints() {
    if (localStorage.getItem(`loyaltyPointsLocal`)) {
        localLoyaltyPoints = parseInt(localStorage.getItem(`loyaltyPointsLocal`));
        currentLoyalty.innerHTML = `${localLoyaltyPoints}pts`;
    } else {
        currentLoyalty.innerHTML = `${loyaltyPoints}pts`;
    }
}

placeOrderButton.addEventListener('click', function () {
    if (fullNameInput.classList.contains("success") && phoneNumberInput.classList.contains("success") && emailInput.classList.contains("success") && emailConfirmInput.classList.contains("success")) {
        if (localStorage.getItem(`loyaltyPointsLocal`)) {
            localLoyaltyPoints = parseInt(localStorage.getItem(`loyaltyPointsLocal`));
            localLoyaltyPoints += loyaltyPoints;
            localStorage.setItem(`loyaltyPointsLocal`, localLoyaltyPoints);
        } else {
            localStorage.setItem(`loyaltyPointsLocal`, loyaltyPoints);
        }
        orders.innerHTML = ``;
        formMain.reset();
        form2.reset();
        resetAllInputs();
        initializing();
        updateOverallOutput();
        updateLoyaltyPoints();

        // Displaying the success message
        thankYouMessage.style.display = "initial";
        window.setTimeout(function () {
            thankYouMessage.style.opacity = `1`
            thankYouMessage.style.transform = `scale(1)`;
            formMain.style.opacity = `0.5`
        }, 0)

    } else {
        alert("Please fill out all fields correctly before submitting.");
    }
});
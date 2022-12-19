//Variables
let slAdultCost;
let slAdultTotalCost;
let slChildCost;
let slChildTotalCost;
let fAdultCost;
let fAdultTotalCost;
let fChildCost;
let fChildTotalCost;
let duration;
let durationOut;
let totalCurrentCost;
let totalOverallCost;
let orderCount;
let slAdultCount;
let slChildCount;
let fAdultCount;
let fChildCount;
let infantCount;
let totalCount;
let loyaltyPoints;
let localLoyaltyPoints;

window.addEventListener('load', initializing);

function initializing() {
    //initializing variables when the page loads
    slAdultCost = 1200;
    slAdultTotalCost = 0;
    slChildCost = 700;
    slChildTotalCost = 0;
    fAdultCost = 5500;
    fAdultTotalCost = 0;
    fChildCost = 2700;
    fChildTotalCost = 0;
    duration = 'threeHours';
    durationOut = '3 Hours';
    totalCurrentCost = 0;
    totalOverallCost = 0;
    orderCount = 0;
    slAdultCount = 0;
    slChildCount = 0;
    fAdultCount = 0;
    fChildCount = 0;
    infantCount = 0;
    totalCount = 0;
    loyaltyPoints = 0;

    // check to see if there is a value in local storage


    
    //getting the object from local storage
    if (localStorage.getItem('favOrder')) {
        favOrder = JSON.parse(localStorage.getItem('favOrder'));
    }
    
    //updating the output
    updateLoyaltyPoints();
    updateFavOutput();
    updateCurrentOutput();
    updateCurrentCost();
    updateOverallOutput();
}

//Getting a reference to the form element
const formMain = document.getElementById('form-main');
const form2 = document.getElementById('form-2');

// Getting a reference to the input elements
const fullNameInput = document.getElementById("full-name");
const phoneNumberInput = document.getElementById("phone-number");
const emailInput = document.getElementById("email");
const emailConfirmInput = document.getElementById("email-confirm");

const slAdult = document.getElementById('slAdult-input');
const slChild = document.getElementById('slChild-input');
const infant = document.getElementById('infant-input');
const fAdult = document.getElementById('fAdult-input');
const fChild = document.getElementById('fChild-input');

// Getting a reference to the dropdown element
const genderOption = document.getElementById("gender");
const dateOption = document.getElementById("date")
const durationOption = document.getElementById('duration');

//Getting a reference to the output element
const nameValidationDisplay = document.getElementById("name-validation-display");
const phoneValidationDisplay = document.getElementById("phone-validation-display");
const emailValidationDisplay = document.getElementById("email-validation-display");
const emailConfirmValidationDisplay = document.getElementById("email-confirm-validation-display");

const slAdultCostOutput = document.getElementById('sl-adult-cost');
const slChildCostOutput = document.getElementById('sl-child-cost');
const fAdultCostOutput = document.getElementById('f-adult-cost');
const fChildCostOutput = document.getElementById('f-child-cost');

const slAdultNoOutput = document.getElementById('sl-adult-no');
const slChildNoOutput = document.getElementById('sl-child-no');
const fAdultNoOutput = document.getElementById('f-adult-no');
const fChildNoOutput = document.getElementById('f-child-no');
const infantNoOutput = document.getElementById('infant-no');

const slAdultTotalCostOutput = document.getElementById('sl-adult-total-cost');
const slChildTotalCostOutput = document.getElementById('sl-child-total-cost');
const fAdultTotalCostOutput = document.getElementById('f-adult-total-cost');
const fChildTotalCostOutput = document.getElementById('f-child-total-cost');

const durationOutput = document.getElementById(`current-duration`);
const currentTotalCostOutput = document.getElementById('current-total-cost');

const summaryDateDisplay = document.getElementById('overall-date-display');
const summaryGenderDisplay = document.getElementById(`overall-gender-display`)
const summaryNameDisplay = document.getElementById('overall-name-display');
const summaryEmailDisplay = document.getElementById('overall-email-display');
const summaryPhoneDisplay = document.getElementById('overall-phone-display');

const currentOutput = document.getElementById('current-total');
const overallOutput = document.getElementById('overall-total');
const orders = document.getElementById('orders');

// Getting a reference to the order buttons
const currentButton = document.getElementById('place-current-order');
const overallButton = document.getElementById('place-overall-order');

//Creating a function to update the current output
function updateCurrentOutput() {
    slAdultNoOutput.innerHTML = `${slAdult.value} ticket(s)`;
    slChildNoOutput.innerHTML = `${slChild.value} ticket(s)`;
    fAdultNoOutput.innerHTML = `${fAdult.value} ticket(s)`;
    fChildNoOutput.innerHTML = `${fChild.value} ticket(s)`;
    infantNoOutput.innerHTML = `${infant.value} ticket(s)`;
    slAdultTotalCostOutput.innerHTML = slAdultTotalCost + `Lkr`;
    slChildTotalCostOutput.innerHTML = slChildTotalCost + `Lkr`;
    fAdultTotalCostOutput.innerHTML = fAdultTotalCost + `Lkr`;
    fChildTotalCostOutput.innerHTML = fChildTotalCost + `Lkr`;
    durationOutput.innerHTML = `${durationOut}`;
    currentTotalCostOutput.innerHTML = totalCurrentCost + `Lkr`;
}

//Creating a function to update the overall output
function updateOverallOutput() {
    summaryDateDisplay.innerHTML = `${dateOption.value}`;
    summaryGenderDisplay.innerHTML = `${genderOption.value}`;
    overallOutput.innerHTML = `${totalOverallCost} Lkr`;
}

// Creating a function to update the input value
function updateInput(input, increment) {
    const currentValue = parseInt(input.value);
    const updatedValue = currentValue + increment;
    input.value = Math.max(updatedValue, 0);
    updateCurrentCost();
}

function setDurationName(duration) {
    if (durationOption.value === 'threeHours') {
        duration = '3 Hours';
    } else if (durationOption.value === 'halfDay') {
        duration = 'Half Day';
    } else if (durationOption.value === 'fullDay') {
        duration = 'Full Day';
    }
    return duration;
}

// Creating a function to update the total cost of the current order
function updateCurrentCost() {
    duration = durationOption.value;
    if (duration === 'threeHours') {
        slAdultCost = 1200;
        slChildCost = 700;
        fAdultCost = 5500;
        fChildCost = 2700;
        durationOut = '3 Hours';
    } else if (duration === 'halfDay') {
        slAdultCost = 1550;
        slChildCost = 1050;
        fAdultCost = 5950;
        fChildCost = 3150;
        durationOut = 'Half Day';
    } else if (duration === 'fullDay') {
        slAdultCost = 1800;
        slChildCost = 1300;
        fAdultCost = 6300;
        fChildCost = 3500;
        durationOut = 'Full Day';
    }
    slAdultTotalCost = slAdult.value * slAdultCost;
    slChildTotalCost = slChild.value * slChildCost;
    fAdultTotalCost = fAdult.value * fAdultCost;
    fChildTotalCost = fChild.value * fChildCost;
    totalCurrentCost = slAdultTotalCost + slChildTotalCost + fAdultTotalCost + fChildTotalCost;
    slAdultCostOutput.innerHTML = `${slAdultCost}Lkr`;
    slChildCostOutput.innerHTML = `${slChildCost}Lkr`;
    fAdultCostOutput.innerHTML = `${fAdultCost}Lkr`;
    fChildCostOutput.innerHTML = `${fChildCost}Lkr`;
    updateCurrentOutput();
}

// Add event listeners to the buttons
document.getElementById('decrement-1').addEventListener('click', updateInput.bind(null, slAdult, -1));
document.getElementById('increment-1').addEventListener('click', updateInput.bind(null, slAdult, 1));
document.getElementById('decrement-2').addEventListener('click', updateInput.bind(null, slChild, -1));
document.getElementById('increment-2').addEventListener('click', updateInput.bind(null, slChild, 1));
document.getElementById('decrement-4').addEventListener('click', updateInput.bind(null, fAdult, -1));
document.getElementById('increment-4').addEventListener('click', updateInput.bind(null, fAdult, 1));
document.getElementById('decrement-5').addEventListener('click', updateInput.bind(null, fChild, -1));
document.getElementById('increment-5').addEventListener('click', updateInput.bind(null, fChild, 1));
document.getElementById('decrement-3').addEventListener('click', updateInput.bind(null, infant, -1));
document.getElementById('increment-3').addEventListener('click', updateInput.bind(null, infant, 1));

// In this example, the bind() method is being used to create a new function called
//  boundUpdateInput. This new function is bound to the updateInput() function and
//  the input1 and -1 arguments. This means that when the boundUpdateInput() function
//  is called, it will behave the same way as the updateInput() function, but it
//  will automatically pass the input1 and -1 arguments to the updateInput() function.

// Add event listener to the dropdown elements
durationOption.addEventListener('change', updateCurrentCost);
dateOption.addEventListener('change', updateOverallOutput);
genderOption.addEventListener(`change`, updateOverallOutput);

//creating a function to validate each input of personal details
function inputValidation() {
    const fullName = fullNameInput.value;
    const phoneNumber = phoneNumberInput.value;
    const email = emailInput.value;
    const emailConfirm = emailConfirmInput.value;

    const fullNameRegex = /^([a-zA-Z]+\s){1,}[a-zA-Z]+$/;
    const phoneNumberRegex = /^\d{10}$/;
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (fullNameRegex.test(fullName)) {
        showSuccess(fullNameInput, nameValidationDisplay);
        summaryNameDisplay.innerHTML = fullName;
    } else {
        showError(fullNameInput, nameValidationDisplay, "Please enter at least two names");
        summaryNameDisplay.innerHTML = ``;
    }

    if (phoneNumberRegex.test(phoneNumber)) {
        showSuccess(phoneNumberInput, phoneValidationDisplay);
        summaryPhoneDisplay.innerHTML = phoneNumber;
    } else {
        showError(phoneNumberInput, phoneValidationDisplay, "Please enter 10 digit phone number");
        summaryPhoneDisplay.innerHTML = ``;
    }

    if (emailRegex.test(email)) {
        showSuccess(emailInput, emailValidationDisplay);
    } else {
        showError(emailInput, emailValidationDisplay, "Please enter a valid email address");
    }

    if ((email === emailConfirm) && emailRegex.test(emailConfirm)) {
        showSuccess(emailConfirmInput, emailConfirmValidationDisplay);
        summaryEmailDisplay.innerHTML = email;
    } else {
        showError(emailConfirmInput, emailConfirmValidationDisplay, "email addresses do not match");
        summaryEmailDisplay.innerHTML = ``;
    }
}

function showError(input, validationDisplay, message) {
    input.classList.add("error");
    input.classList.remove("success");
    validationDisplay.innerHTML = message;
}

function showSuccess(input, validationDisplay) {
    input.classList.add("success");
    input.classList.remove("error");
    validationDisplay.innerHTML = `<i class="fa-solid fa-check"></i>`;
}

function resetAllInputs() {
    resetInput(fullNameInput, nameValidationDisplay);
    resetInput(phoneNumberInput, phoneValidationDisplay);
    resetInput(emailInput, emailValidationDisplay);
    resetInput(emailConfirmInput, emailConfirmValidationDisplay);
    summaryNameDisplay.innerHTML = ``;
    summaryPhoneDisplay.innerHTML = ``;
    summaryEmailDisplay.innerHTML = ``;
    summaryDateDisplay.innerHTML = ``;
    summaryGenderDisplay.innerHTML = ``;
    updateOverallOutput();
}

function resetInput(input, validationDisplay) {
    input.classList.remove("success");
    input.classList.remove("error");
    validationDisplay.innerHTML = ``;
}

// Add event listener to the personal detail inputs
fullNameInput.addEventListener("input", inputValidation);
phoneNumberInput.addEventListener("input", inputValidation);
emailInput.addEventListener("input", inputValidation);
emailConfirmInput.addEventListener("input", inputValidation);

function outputOrder(count, duration, slAdult, slChild, fAdult, fChild, infant,
    slAdultCost, slChildCost, fAdultCost, fChildCost, totalCost) {
    let output =
        `<div class="order-container">
        <div class="order-title">
            <h2>Order ${count}</h2>
        </div>
        <div class="order-duration">
            <h3>${duration} </h3>
        </div>
        <div class="order-details">
            <div class="order-details-section">
                <h3>SL Adult(s)</h3>
                <div>
                    <p>${slAdult}</p>
                    <p class="price">(${slAdultCost}Lkr)</p>
                </div>
            </div>
            <div class="order-details-section">
                <h3>SL Child(ren)</h3>
                <div>
                    <p>${slChild}</p>
                    <p class="price">(${slChildCost}Lkr)</p>
                </div>
            </div>
            <div class="order-details-section">
                <h3>Forigen Adult(s)</h3>
                <div>
                    <p>${fAdult}</p>
                    <p class="price">(${fAdultCost}Lkr)</p>
                </div>
            </div>
            <div class="order-details-section">
                <h3>Forigen Child(ren)</h3>
                <div>
                    <p>${fChild}</p>
                    <p class="price">(${fChildCost}Lkr)</p>
                </div>
            </div>
            <div class="order-details-section">
                <h3>Infant(s)</h3>
                <div>
                    <p>${infant}</p>
                    <p class="price">(0Lkr)</p>
                </div>
            </div>
            <div class="order-cost">
                <h3>Total Cost</h3>
                <p class="price">${totalCost}Lkr</p>
            </div>
        </div>
    </div>`;
    orders.innerHTML += output;
}

// Add event listener to the current order button
currentButton.addEventListener('click', function () {
    totalOverallCost += totalCurrentCost;
    orderCount++;
    calLoyaltyPoints(slAdult.value, slChild.value, fAdult.value, fChild.value, infant.value);
    setDurationName(durationOut);
    outputOrder(orderCount, durationOut, slAdult.value, slChild.value, fAdult.value, fChild.value, infant.value, slAdultTotalCost, slChildTotalCost, fAdultTotalCost, fChildTotalCost, totalCurrentCost);
    totalCurrentCost = 0;
    form2.reset();
    updateCurrentCost();
    updateCurrentOutput();
    updateOverallOutput();
});

//Creating variables for the favourite order section
let favSlAdult = 0;
let favSlChild = 0;
let favFAdult = 0;
let favFChild = 0;
let favInfant = 0;
let favSlAdultTotalCost = 0;
let favSlChildTotalCost = 0;
let favFAdultTotalCost = 0;
let favFChildTotalCost = 0;
let favDuration = '3 Hours';
let favTotalCost = 0;

// Getting reference to the button
const addFavButton = document.getElementById('add-fav');
const removeFavOrderButton = document.getElementById('remove-fav');
const FavOrderButton = document.getElementById('add-fav-order');

// Getting references for the favourite order section
const favSlAdultNoOutput = document.getElementById('fav-sl-adult-no');
const favSlChildNoOutput = document.getElementById('fav-sl-child-no');
const favFAdultNoOutput = document.getElementById('fav-f-adult-no');
const favFChildNoOutput = document.getElementById('fav-f-child-no');
const favInfantNoOutput = document.getElementById('fav-infant-no');

const favSlAdultTotalCostOutput = document.getElementById('fav-sl-adult-total-cost');
const favSlChildTotalCostOutput = document.getElementById('fav-sl-child-total-cost');
const favFAdultTotalCostOutput = document.getElementById('fav-f-adult-total-cost');
const favFChildTotalCostOutput = document.getElementById('fav-f-child-total-cost');

const favCurrentDurationOutput = document.getElementById('fav-duration');
const favTotalCostOutput = document.getElementById('fav-total-cost');

// Creating an object to store the favourite order
let favOrder = {
    slAdult: 0,
    slChild: 0,
    fAdult: 0,
    fChild: 0,
    infant: 0,
    slACost: 0,
    slCCost: 0,
    fACost: 0,
    fCCost: 0,
    duration: ``,
    totCost: 0
}

// FAVOURITE ORDER SECTION
// Creating a function to update the favourite order
function updateFavOutput() {
    favSlAdultNoOutput.innerHTML = `${favOrder.slAdult} ticket(s)`;
    favSlChildNoOutput.innerHTML = `${favOrder.slChild} ticket(s)`;
    favFAdultNoOutput.innerHTML = `${favOrder.fAdult} ticket(s)`;
    favFChildNoOutput.innerHTML = `${favOrder.fChild} ticket(s)`;
    favInfantNoOutput.innerHTML = `${favOrder.infant} ticket(s)`;

    favSlAdultTotalCostOutput.innerHTML = `${favOrder.slACost}Lkr`;
    favSlChildTotalCostOutput.innerHTML = `${favOrder.slCCost}Lkr`;
    favFAdultTotalCostOutput.innerHTML = `${favOrder.fACost}Lkr`;
    favFChildTotalCostOutput.innerHTML = `${favOrder.fCCost}Lkr`;

    favCurrentDurationOutput.innerHTML = favOrder.duration;
    favTotalCostOutput.innerHTML = `${favOrder.totCost}Lkr`;
}

// Creating a function to update the favourite order values
function updateFavValues() {
    favOrder.slAdult = slAdult.value;
    favOrder.slChild = slChild.value;
    favOrder.fAdult = fAdult.value;
    favOrder.fChild = fChild.value;
    favOrder.infant = infant.value;

    favOrder.slACost = slAdultTotalCost;
    favOrder.slCCost = slChildTotalCost;
    favOrder.fACost = fAdultTotalCost;
    favOrder.fCCost = fChildTotalCost;

    favOrder.duration = durationOut;
    favOrder.totCost = totalCurrentCost;
}

// Adding event listener to the add favourite button
addFavButton.addEventListener('click', function () {
    updateFavValues();
    updateFavOutput();
    //Store the favourite order values in the local storage
    localStorage.setItem('favOrder', JSON.stringify(favOrder));
});

// Adding event listener to the add favourite order button
FavOrderButton.addEventListener('click', function () {
    totalOverallCost += favOrder.totCost;
    orderCount++;
    calLoyaltyPoints(favOrder.slAdult, favOrder.slChild, favOrder.fAdult, favOrder.fChild, favOrder.infant);
    outputOrder(orderCount, favOrder.duration, favOrder.slAdult, favOrder.slChild, favOrder.fAdult, favOrder.fChild, favOrder.infant, favOrder.slACost, favOrder.slCCost, favOrder.fACost, favOrder.fCCost, favOrder.totCost);
    updateOverallOutput();
});

// Adding event listener to the remove favourite order button
removeFavOrderButton.addEventListener('click', function () {
    favOrder.slAdult = 0;
    favOrder.slChild = 0;
    favOrder.fAdult = 0;
    favOrder.fChild = 0;
    favOrder.infant = 0;
    favOrder.slACost = 0;
    favOrder.slCCost = 0;
    favOrder.fACost = 0;
    favOrder.fCCost = 0;
    favOrder.duration = `3 Hours`;
    favOrder.totCost = 0;
    localStorage.setItem('favOrder', JSON.stringify(favOrder));
    updateFavOutput();
});

const placeOrderButton = document.getElementById('place-order');

const thankYouMessage = document.getElementById('thank-you-popup');
const thankYouMessageClose = document.getElementById('close-thank-you-popup');

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

thankYouMessageClose.addEventListener('click', function () {
    thankYouMessage.style.opacity = `0`
    thankYouMessage.style.transform = `scale(0)`;
    formMain.style.opacity = `1`
    window.setTimeout(function () {
        thankYouMessage.style.display = "none";
    }, 700)
});

// Creating a function to increment the counts
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
        localLoyaltyPoints = loyaltyPoints;
    }
}


// Getting references to the loyalty points displays
const currentLoyalty = document.getElementById(`current-loyalty-points`);
const overallLoyalty = document.getElementById(`overall-loyalty-points`);

// Creating a function to update the loyalty points displays
function updateLoyaltyPoints() {
    if (localStorage.getItem(`loyaltyPointsLocal`)) {
        localLoyaltyPoints = parseInt(localStorage.getItem(`loyaltyPointsLocal`));
        currentLoyalty.innerHTML = `${localLoyaltyPoints}pts`;
    } else {
        currentLoyalty.innerHTML = `${loyaltyPoints}pts`;
    }
}

//Getting references to the show and close loyalty buttons
const showLoyalty = document.getElementById(`open-loyalty-summary`);
const closeLoyalty = document.getElementById(`close-loyalty-summary`);

const loyaltyPointsSummary = document.getElementById(`show-loyalty-points`);

//Adding eventlisteners for the buttons
showLoyalty.addEventListener(`click`, function () {
    loyaltyPointsSummary.style.display = `initial`
    window.setTimeout(function () {
        loyaltyPointsSummary.style.opacity = `1`
        loyaltyPointsSummary.style.transform = `scale(1)`;
        formMain.style.opacity = `0.5`
    }, 0)
})

closeLoyalty.addEventListener(`click`, function () {
    loyaltyPointsSummary.style.opacity = `0`
    loyaltyPointsSummary.style.transform = `scale(0)`;
    formMain.style.opacity = `1`
    window.setTimeout(function () {
        loyaltyPointsSummary.style.display = `none`;
    }, 700)
})
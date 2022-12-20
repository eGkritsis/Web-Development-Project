// Main code for Register form validation
//We start by retrieving the fields we're interested in from the form.
const form = document.getElementById("register-form");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const cardNum = document.getElementById("card-number");
const cardCVV = document.getElementById("cvv");
const phoneNum = document.getElementById("phoneNumber");
const phoneNum2 = document.getElementById("phoneNumber2");
const country = document.getElementById("country");
const city = document.getElementById("city"); 
const submitButton = document.getElementById("submit-button");

//The validation will take place once we hit the submit button
submitButton.onclick = "validateForm()";
form.addEventListener("submit", (event) =>{
    foundError = validateForm();

    //If the validation function finds errors, prevent the default procedure.
    if(foundError === true){
        event.preventDefault();
    }
})

//Validation function
function validateForm(){
    //First we get the values from each field
    let emailValue = email.value;
    let passwordValue1 = password1.value;
    let passwordValue2 = password2.value;
    let cardNumValue = cardNum.value;
    let cardCVVValue = cardCVV.value;
    let phoneNumValue = phoneNum.value;
    let phoneNumValue2 = phoneNum2.value;
    let countryValue = country.value;
    let cityValue = city.value;

    //This gets changed to true if an error is found, and is returned at the end of the function
    let errFound = false;


    //Constraint 1
    //Make sure the email input is a valid email format
    if(!isEmail(emailValue)){
        setErrorMessageFor(email, "The address is not a valid format.");
        errFound = true;
    }
    
    //Constraint 2
    //The country and the city values need to be a valid pair (e.g. not Hamburg, Greece)
    if((countryValue === "Greece" && !(["Athens", "Thessaloniki", "Patras", "Lamia", "Volos"].includes(cityValue)))
        || (countryValue === "Italy" && !(["Rome", "Turin"].includes(cityValue)))
        || (countryValue === "Germany" && !(["Berlin", "Frankfurt", "Hamburg"].includes(cityValue)))){
        setErrorMessageFor(country, "The country and city selected are not a valid match.")
        errFound = true;
    }

    //Constraint 3
    //Make sure that, if a second phone is added, it is not the same as the first.
    if(phoneNumValue === phoneNumValue2){
        setErrorMessageFor(phoneNum2, "The second phone cannot be the same number as the first.")
        errFound = true;
    }

    //Constraint 4
    //Make sure that either both or none are filed in the credit card information field are filed.
    if(cardNumValue !== "" && cardCVVValue ===""){
        setErrorMessageFor(cardCVV, "If you specify a Card Number, you also need to add the CVV.");
        errFound = true;
    }else if (cardNumValue === "" && cardCVVValue !==""){
        setErrorMessageFor(cardNum, "If you specify a CVV, you also need to add a credit card number.");
        errFound = true;
    }

    //Constraint 5
    //Make sure the two passwords are 8-20 chars and are the same
    if((passwordValue1.length < 8 || passwordValue1.length > 20)
        && (passwordValue2.length < 8 || passwordValue2.length > 20)){
        setErrorMessageFor(password1, "The password must be 8-20 characters")
        setErrorMessageFor(password2, "The password must be 8-20 characters")
        errFound = true;

    } else if(passwordValue1.length < 8 || passwordValue1.length > 20){
        setErrorMessageFor(password1, "The password must be 8-20 characters")
        errFound = true; 

    }else if(passwordValue2.length < 8 || passwordValue2.length > 20){
        setErrorMessageFor(password2, "The password must be 8-20 characters")
        errFound = true; 
    
    }else if(passwordValue1 !== passwordValue2){
        setErrorMessageFor(password2, "The passwords need to match.");
        errFound = true;
    }

    return errFound;
}

//Help function to display a specific error message under the field
//(<span> element under the input in html)
function setErrorMessageFor(input, message){
    //Get the parent of the input field (in this case, the <sector> container)
    const formControl = input.parentElement;
    const span = formControl.querySelector("span");
    //Write the error message
    span.innerText = message;
}

//Checks if an e-mail address is a valid format
function isEmail(email){
    // A widely used regex for email format
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
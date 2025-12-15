const registrationForm = document.getElementById("regForm");
const submitButton = document.getElementById("submitBtn");

const inputFirstName = document.getElementById("firstName");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("confirmPassword");
const selectCountry = document.getElementById("country");
const checkboxTerms = document.getElementById("terms");
const genderOptions = document.querySelectorAll("input[name='gender']");
const summaryBox = document.getElementById("summary");

submitButton.disabled = true;

function showError(inputEl, message) {
    const errorContainer = inputEl.nextElementSibling;
    errorContainer.innerHTML = "";

    const p = document.createElement("p");
    p.textContent = message;
    p.classList.add("error-message");

    errorContainer.appendChild(p);
}

function clearError(inputEl) {
    const errorContainer = inputEl.nextElementSibling;
    errorContainer.innerHTML = "";
}


function validateFirstName() {
    if (inputFirstName.value.trim().length < 5) {
        showError(inputFirstName, "First Name must be at least 5 characters");
        return false;
    }
    clearError(inputFirstName);
    return true;
}

function validateEmail() {
    if (!inputEmail.value.includes("@")) {
        showError(inputEmail, "Email must contain @");
        return false;
    }
    clearError(inputEmail);
    return true;
}

function validatePassword() {
    if (
        inputPassword.value.length < 8 ||
        !/[A-Z]/.test(inputPassword.value)
    ) {
        showError(
            inputPassword,
            "Password must contain 8 characters and one uppercase letter"
        );
        return false;
    }
    clearError(inputPassword);
    return true;
}

function validateConfirmPassword() {
    if (inputConfirmPassword.value !== inputPassword.value) {
        showError(inputConfirmPassword, "Passwords do not match");
        return false;
    }
    clearError(inputConfirmPassword);
    return true;
}

function validateGender() {
    const errorBox = document.getElementById("genderError");
    errorBox.innerHTML = "";

    let selected = false;
    genderOptions.forEach(r => {
        if (r.checked) selected = true;
    });

    if (!selected) {
        const p = document.createElement("p");
        p.textContent = "Please select your gender";
        p.classList.add("error-message");
        errorBox.appendChild(p);
        return false;
    }
    return true;
}

function validateCountry() {
    if (selectCountry.value === "") {
        showError(selectCountry, "Please select a country");
        return false;
    }
    clearError(selectCountry);
    return true;
}

function validateTerms() {
    const errorBox = checkboxTerms.nextElementSibling;
    errorBox.innerHTML = "";

    if (!checkboxTerms.checked) {
        const p = document.createElement("p");
        p.textContent = "You must agree to the terms and conditions";
        p.classList.add("error-message");
        errorBox.appendChild(p);
        return false;
    }
    return true;
}


function checkForm() {
    submitButton.disabled = !(
        validateFirstName() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateGender() &&
        validateCountry() &&
        validateTerms()
    );
}


[inputFirstName, inputEmail, inputPassword, inputConfirmPassword].forEach(el =>
    el.addEventListener("input", checkForm)
);

selectCountry.addEventListener("change", checkForm);
checkboxTerms.addEventListener("change", checkForm);
genderOptions.forEach(r => r.addEventListener("change", checkForm));


registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    summaryBox.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.textContent = "Registration Summary";

    const p1 = document.createElement("p");
    p1.textContent = "Name: " + inputFirstName.value;

    const p2 = document.createElement("p");
    p2.textContent = "Email: " + inputEmail.value;

    const p3 = document.createElement("p");
    p3.textContent = "Country: " + selectCountry.value;

    let genderValue = "";
    genderOptions.forEach(r => {
        if (r.checked) genderValue = r.value;
    });

    const p4 = document.createElement("p");
    p4.textContent = "Gender: " + genderValue;

    summaryBox.appendChild(h3);
    summaryBox.appendChild(p1);
    summaryBox.appendChild(p2);
    summaryBox.appendChild(p3);
    summaryBox.appendChild(p4);
});

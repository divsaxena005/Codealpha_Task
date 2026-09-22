const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const calculateButton = document.querySelector('[data-action="calculate"]');

let currentValue = "";
let previousValue = "";
let operator = null;

  // Update Display

function updateDisplay() {

    currentDisplay.textContent = currentValue || "0";

    if (previousValue && operator) {
        previousDisplay.textContent =
            `${previousValue} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.textContent = "0";
    }
}

  // Operator Symbol

function getOperatorSymbol(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    return symbols[operator] || operator;
}


   //Add Number

function addNumber(number) {

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (number === "." && currentValue === "") {
        currentValue = "0";
    }

    currentValue += number;

    updateDisplay();
}

   //Choose Operator

function chooseOperator(selectedOperator) {

    if (currentValue === "" && previousValue === "") {
        return;
    }

    if (currentValue !== "" && previousValue !== "") {
        calculate();
    }

    if (currentValue !== "") {
        previousValue = currentValue;
        currentValue = "";
    }

    operator = selectedOperator;

    updateDisplay();
}

  // Calculate Result


function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        operator === null
    ) {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentValue = "Cannot divide by 0";
                previousValue = "";
                operator = null;

                updateDisplay();

                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    currentValue = formatResult(result);

    previousValue = "";
    operator = null;

    updateDisplay();
}

  // Format Result


function formatResult(result) {

    if (!Number.isFinite(result)) {
        return "Error";
    }

    return Number(result.toFixed(10)).toString();
}

  // Clear Calculator


function clearCalculator() {

    currentValue = "";
    previousValue = "";
    operator = null;

    updateDisplay();
}

   //Delete Last Character

function deleteNumber() {

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}

   //Number Button Events

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        addNumber(number);

    });

});

  // Operator Button Events

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedOperator = button.dataset.operator;

        chooseOperator(selectedOperator);

    });

});

  // Clear Button
clearButton.addEventListener("click", clearCalculator);
  // Delete Button
deleteButton.addEventListener("click", deleteNumber);

   //Equal Button

calculateButton.addEventListener("click", calculate);

   //Keyboard Support


document.addEventListener("keydown", event => {

    const key = event.key;

    // Numbers
    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        addNumber(key);

    }

    // Operators
    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        chooseOperator(key);

    }

    // Percentage
    if (key === "%") {

        chooseOperator("%");

    }

    // Enter / =
    if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

    }

    // Backspace
    if (key === "Backspace") {

        deleteNumber();

    }

    // Escape
    if (key === "Escape") {

        clearCalculator();

    }

});

  // Initial Display

updateDisplay();
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }
  clear() {
    this.cuurentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.cuurentOperand = this.cuurentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.cuurentOperand.includes(".")) return;
    this.cuurentOperand = this.cuurentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.cuurentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = `${this.cuurentOperand} ${operation}`;
    this.cuurentOperand = "";
  }
  compute() {
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.cuurentOperand);
    let computation;
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.cuurentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  updateDisplay() {
    this.currentOperandText.textContent = this.cuurentOperand;
    if (this.operation != null) {
    }
    this.previousOperandText.textContent = this.previousOperand;
  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandText, currentOperandText);
numberButtons.forEach(
  (button) =>
    (button.onclick = () => {
      calculator.appendNumber(button.textContent), calculator.updateDisplay();
    })
);
operationButtons.forEach(
  (button) =>
    (button.onclick = () => {
      calculator.chooseOperation(button.textContent);
      calculator.updateDisplay();
    })
);
equalsButton.onclick = () => {
  calculator.compute();
  calculator.updateDisplay();
};
allClearButton.onclick = () => {
  calculator.clear();
  calculator.updateDisplay();
};
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

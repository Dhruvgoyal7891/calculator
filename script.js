// Get display element
const display = document.getElementById('display');

// Variables to track inputs and operator
let currentInput = '';
let previousInput = '';
let operator = '';

// Event listener for all buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      // Clear everything
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay('0'); // Reset display to 0
    } else if (value === '=') {
      // Perform calculation if inputs are valid
      if (currentInput && previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        updateDisplay(result); // Display the result
        currentInput = result.toString(); // Set result as current input for further operations
        previousInput = '';
        operator = '';
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Handle operator input
      if (currentInput) {
        operator = value; // Store the selected operator
        previousInput = currentInput; // Move current input to previous
        currentInput = ''; // Clear current input for the next number
        updateDisplay(`${previousInput} ${operator}`); // Show the operator in the display
      }
    } else {
      // Handle number and decimal inputs
      currentInput += value;
      updateDisplay(`${previousInput} ${operator} ${currentInput}`.trim()); // Update display dynamically
    }
  });
});

// Function to update the display
function updateDisplay(value) {
  display.textContent = value || '0'; // Display value or '0' as default
}

// Function to perform calculations
function calculate(num1, num2, op) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error'; // Handle division by 0
    default: return 0;
  }
}

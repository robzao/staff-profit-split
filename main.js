const grossProfitInput = document.getElementById('gross-profit');
const taxRateInput = document.getElementById('tax-rate');
const managerRateInput = document.getElementById('manager-rate');
const taxDisplay = document.getElementById('tax');
const netProfitDisplay = document.getElementById('net-profit');
const managerShareDisplay = document.getElementById('manager-share');
const waiterShareDisplay = document.getElementById('waiter-share');

const formatCurrency = (value) => `$ ${value.toFixed(2)}`;

const updateDisplay = (result) => {
  taxDisplay.textContent = formatCurrency(result.taxAmount);
  netProfitDisplay.textContent = formatCurrency(result.netProfit);
  managerShareDisplay.textContent = formatCurrency(result.managerShare);
  waiterShareDisplay.textContent = formatCurrency(result.waiterShare);
};

const sanitizeInput = (rawValue) => {
  const value = rawValue.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : value;
};

const parseValue = (sanitizedValue) => {
  const numericValue = parseFloat(sanitizedValue);
  return isNaN(numericValue) ? 0 : numericValue;
};

const calculateShares = (grossProfit, taxRate, managerRate) => {
  const taxAmount = grossProfit * taxRate;
  const netProfit = grossProfit - taxAmount;
  const managerShare = netProfit * managerRate;
  const waiterShare = netProfit - managerShare;
  
  return { taxAmount, netProfit, managerShare, waiterShare };
};

const handleCalculation = () => {
  const sanitizeAndParse = (input) => {
    const sanitized = sanitizeInput(input.value);
    input.value = sanitized;
    return parseValue(sanitized);
  };
  
  const grossProfit = sanitizeAndParse(grossProfitInput);
  const taxRate = sanitizeAndParse(taxRateInput) / 100; 
  const managerRate = sanitizeAndParse(managerRateInput) / 100;
  
  const result = calculateShares(grossProfit, taxRate, managerRate);
  updateDisplay(result);
};

const setupEventListeners = () => {
  grossProfitInput.addEventListener('input', handleCalculation);
  taxRateInput.addEventListener('input', handleCalculation);
  managerRateInput.addEventListener('input', handleCalculation);
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);

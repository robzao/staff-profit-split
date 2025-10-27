const grossProfit = document.getElementById('gross-profit');
const taxRate = document.getElementById('tax-rate');
const managerRate = document.getElementById('manager-rate');
const taxDisplay = document.getElementById('tax');
const netProfitDisplay = document.getElementById('net-profit');
const managerShareDisplay = document.getElementById('manager-share');
const waiterShareDisplay = document.getElementById('waiter-share');
const resetButton = document.getElementById('reset');

const formatCurrency = (value) => `$ ${value.toFixed(2)}`;

const updateDisplay = (result) => {
  taxDisplay.textContent = formatCurrency(result.taxAmount);
  netProfitDisplay.textContent = formatCurrency(result.netProfit);
  managerShareDisplay.textContent = formatCurrency(result.managerShare);
  waiterShareDisplay.textContent = formatCurrency(result.waiterShare);
};

const clearAll = () => {
  grossProfit.value = '';
  taxRate.value = '';
  managerRate.value = '';
  handleCalculation();
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
  const gp = sanitizeAndParse(grossProfit);
  const tr = sanitizeAndParse(taxRate) / 100;
  const mr = sanitizeAndParse(managerRate) / 100;
  const result = calculateShares(gp, tr, mr);
  updateDisplay(result);
};

const setupEventListeners = () => {
  grossProfit.addEventListener('input', handleCalculation);
  taxRate.addEventListener('input', handleCalculation);
  managerRate.addEventListener('input', handleCalculation);
  resetButton.addEventListener('click', clearAll);
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);

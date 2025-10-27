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
  let value = rawValue.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
  if (value.startsWith('-')) value = value.substring(1);
  return value;
};

const parseValue = (sanitizedValue) => {
  const numericValue = parseFloat(sanitizedValue);
  return (isNaN(numericValue) || numericValue < 0) ? 0 : numericValue;
};

const calculateShares = (grossProfit, taxRate, managerRate) => {
  const taxAmount = grossProfit * taxRate;
  const netProfit = grossProfit - taxAmount;
  const allocableNetProfit = netProfit > 0 ? netProfit : 0;
  const managerShare = allocableNetProfit * managerRate;
  const waiterShare = allocableNetProfit - managerShare;
  return { taxAmount, netProfit, managerShare, waiterShare };
};

const handleInput = (e) => {
  const input = e.target;
  input.value = sanitizeInput(input.value);
  handleCalculation();
};

const handleCalculation = () => {
  const sanitizeAndParse = (input) => parseValue(input.value);
  const gp = sanitizeAndParse(grossProfit);
  const tr = sanitizeAndParse(taxRate) / 100;
  const mr = sanitizeAndParse(managerRate) / 100;
  const result = calculateShares(gp, tr, mr);
  updateDisplay(result);
};

const setupEventListeners = () => {
  grossProfit.addEventListener('input', handleInput);
  taxRate.addEventListener('input', handleInput);
  managerRate.addEventListener('input', handleInput);
  resetButton.addEventListener('click', clearAll);
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);

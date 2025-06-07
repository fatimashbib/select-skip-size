// src/utils/priceUtils.js

export function getTotalPrice(skip) {
  if (!skip) return 0;

  // Assuming base price and fixed VAT. Adjust as needed.
  const basePrice = parseFloat(skip.price || 0);
  const vat = 0.2 * basePrice; // 20% VAT
  return (basePrice + vat).toFixed(2);
}

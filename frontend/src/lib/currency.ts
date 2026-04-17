/**
 * Utility for dynamic currency formatting based on user location.
 * Detects if the user is in India to select INR, otherwise defaults to USD.
 */

const INDIA_TIMEZONES = [
  'Asia/Kolkata',
  'Asia/Calcutta'
];

export const getCurrencyConfig = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndia = INDIA_TIMEZONES.includes(timeZone) || navigator.language === 'en-IN' || navigator.language === 'hi-IN';
    
    return isIndia 
      ? { code: 'INR', symbol: '₹', rate: 83 } // Approx rate for demo purposes if conversion is needed
      : { code: 'USD', symbol: '$', rate: 1 };
  } catch (e) {
    return { code: 'USD', symbol: '$', rate: 1 };
  }
};

export const formatPrice = (usdAmount: number | string) => {
  const { code, symbol, rate } = getCurrencyConfig();
  const numericAmount = typeof usdAmount === 'string' ? parseFloat(usdAmount.replace(/[^0-9.]/g, '')) : usdAmount;
  
  if (isNaN(numericAmount)) return String(usdAmount);

  const finalAmount = code === 'INR' ? numericAmount * rate : numericAmount;

  return new Intl.NumberFormat(code === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(finalAmount);
};

export const formatPriceRange = (lowUSD: number, highUSD: number) => {
  const { code } = getCurrencyConfig();
  if (code === 'INR') {
    return `${formatPrice(lowUSD)} – ${formatPrice(highUSD)}`;
  }
  return `${formatPrice(lowUSD)} – ${formatPrice(highUSD)}`;
};

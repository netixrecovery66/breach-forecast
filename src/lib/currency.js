// Rates are approximate USD conversions. Review them every few months.
const CURRENCIES = {
  USD: { label: "US Dollar ($)", rate: 1, locale: "en-US" },
  ZAR: { label: "South African Rand (R)", rate: 18, locale: "en-ZA" },
  EUR: { label: "Euro (€)", rate: 0.92, locale: "en-IE" },
  GBP: { label: "British Pound (£)", rate: 0.78, locale: "en-GB" },
  AUD: { label: "Australian Dollar (A$)", rate: 1.52, locale: "en-AU" },
  CAD: { label: "Canadian Dollar (C$)", rate: 1.37, locale: "en-CA" },
  NZD: { label: "New Zealand Dollar (NZ$)", rate: 1.65, locale: "en-NZ" },
  INR: { label: "Indian Rupee (₹)", rate: 84, locale: "en-IN" },
  NGN: { label: "Nigerian Naira (₦)", rate: 1500, locale: "en-NG" },
  KES: { label: "Kenyan Shilling (KSh)", rate: 129, locale: "en-KE" },
  AED: { label: "UAE Dirham (AED)", rate: 3.67, locale: "en-AE" },
  SGD: { label: "Singapore Dollar (S$)", rate: 1.3, locale: "en-SG" },
  BRL: { label: "Brazilian Real (R$)", rate: 5.5, locale: "pt-BR" },
  MXN: { label: "Mexican Peso (MX$)", rate: 19, locale: "es-MX" },
  JPY: { label: "Japanese Yen (¥)", rate: 150, locale: "ja-JP" },
};

const REGION_TO_CURRENCY = {
  ZA: "ZAR", GB: "GBP", AU: "AUD", CA: "CAD", NZ: "NZD", IN: "INR",
  NG: "NGN", KE: "KES", AE: "AED", SG: "SGD", BR: "BRL", MX: "MXN", JP: "JPY",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", IE: "EUR",
  PT: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR",
};

const BRACKETS = {
  "under-10k": [null, 10000],
  "10k-50k": [10000, 50000],
  "50k-200k": [50000, 200000],
  "200k-1m": [200000, 1000000],
  "over-1m": [1000000, null],
};

export const CURRENCY_OPTIONS = Object.entries(CURRENCIES).map(([code, c]) => ({
  code,
  label: c.label,
}));

export const REVENUE_VALUES = Object.keys(BRACKETS);

export function detectCurrency() {
  try {
    const region = (navigator.language || "").split("-")[1];
    return REGION_TO_CURRENCY[(region || "").toUpperCase()] || "USD";
  } catch {
    return "USD";
  }
}

function formatLocal(amount, code) {
  const c = CURRENCIES[code] || CURRENCIES.USD;
  const currency = CURRENCIES[code] ? code : "USD";
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Engine amounts are in USD. Convert and format for display.
export function formatMoney(usdAmount, code) {
  const c = CURRENCIES[code] || CURRENCIES.USD;
  return formatLocal(usdAmount * c.rate, code);
}

function roundNice(n) {
  const p = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
}

export function bracketLabel(value, code) {
  const c = CURRENCIES[code] || CURRENCIES.USD;
  const [lo, hi] = BRACKETS[value];
  const f = (usd) => formatLocal(roundNice(usd * c.rate), code);
  if (lo === null) return `Under ${f(hi)}/month`;
  if (hi === null) return `Over ${f(lo)}/month`;
  return `${f(lo)} - ${f(hi)}/month`;
}
export const USD_TRY_RATE = 11.23;
// Create our number formatter.
var currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

var numberFormatter = new Intl.NumberFormat("tr-TR", {});

export const usdToTry = (usd: number): string => {
  return currencyFormatter.format(+((usd + 800) * USD_TRY_RATE).toFixed(0));
};

export const mileToKm = (miles: number) => {
  return numberFormatter.format(+(miles * 1.609344).toFixed(0));
};

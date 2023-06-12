const CURRENCY_FORMATTER = new Intl.NumberFormat('no', {
  currency: 'NOK',
  style: 'currency'
});

export const formatCurrency = (number: number): string => {
  return CURRENCY_FORMATTER.format(number);
};

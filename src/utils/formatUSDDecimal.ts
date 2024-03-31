const usdDecimalFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatUSDDecimal = (value: number | undefined) => {
  if (value === undefined) {
    return '';
  }
  return usdDecimalFormatter.format(value);
};

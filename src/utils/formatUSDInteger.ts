const usdIntegerFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatUSDInteger = (value: number | undefined) => {
  if (value === undefined) {
    return '';
  }

  return usdIntegerFormatter.format(value);
};

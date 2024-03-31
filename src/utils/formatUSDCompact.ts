const usdCompactFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});

export const formatUSDCompact = (value: number) =>
  usdCompactFormatter.format(value);

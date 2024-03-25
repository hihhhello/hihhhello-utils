import { compact, isEmpty } from 'lodash';

export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

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

const usdCompactFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});

export const formatUSDCompact = (value: number) =>
  usdCompactFormatter.format(value);

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

export function createUrlWithSearchParams(params: {
  url: string;
  searchParams?: Record<
    string,
    string | number | undefined | string[] | number[]
  >;
}): string {
  const { url, searchParams } = params;
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return url;
  }

  const searchParamsString = compact(
    Object.entries(searchParams).map(([key, value]) => {
      console.log('value');

      if (!value || isEmpty(value)) {
        return undefined;
      }

      if (Array.isArray(value)) {
        const joinedSearchValue = value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join('&');

        console.log(joinedSearchValue);

        return joinedSearchValue;
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }),
  ).join('&');

  return `${url}?${searchParamsString}`;
}

import { compact, isEmpty, isUndefined } from 'lodash';

export function createUrlWithSearchParams(params: {
  url: string;
  searchParams?: Record<
    string,
    string | number | undefined | string[] | number[] | boolean | boolean[]
  >;
}): string {
  const { url, searchParams } = params;
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return url;
  }

  const searchParamsString = compact(
    Object.entries(searchParams).map(([key, value]) => {
      if (Array.isArray(value) && isEmpty(value)) {
        return;
      }

      if (isUndefined(value)) {
        return;
      }

      if (Array.isArray(value)) {
        const joinedSearchValue = value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join('&');

        return joinedSearchValue;
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }),
  ).join('&');

  return `${url}?${searchParamsString}`;
}

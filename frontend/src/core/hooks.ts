import { apiClient } from 'core/api';
import { useQuery, UseQueryResult } from 'react-query';
import { ProductResponse } from 'core/types';
import { useSearchParams } from 'react-router-dom';

export function useItems(): UseQueryResult<ProductResponse> {
  const [search] = useSearchParams({
    sortOrder: 'asc',
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClient
        .get('/prod/v1/photo-products', {
          params: search,
        })
        .then((res) => res.data),
    {
      staleTime: 120000,
    },
  );
}

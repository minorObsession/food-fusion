import { useQuery } from "@tanstack/react-query";

export function useFood(queryKey, queryFN) {
  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFN,
  });

  return { isLoading, error, data };
}

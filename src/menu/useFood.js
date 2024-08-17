import { useQuery } from "@tanstack/react-query";

export function useFood(queryKey, queryFN) {
  const { isLoading, data, error } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFN,
  });

  return { isLoading, error, data };
}

// export function usePastas() {
//   const {
//     isLoading,
//     data: pastas,
//     error,
//   } = useQuery({
//     queryKey: ["pasta"],
//     queryFn: getPastas,
//   });

//   return { isLoading, error, pastas };
// }

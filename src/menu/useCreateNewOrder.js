import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStoreNewOrder } from "../services/apiOrders";
import toast from "react-hot-toast";

export function useCreateNewOrder() {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: createStoreNewOrder,
    onSuccess: () => {
      toast.success("Order successfully created");
      queryClient.invalidateQueries({ queryKey: "orders" });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createOrder, isCreating };
}

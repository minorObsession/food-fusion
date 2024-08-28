import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFood as apiDeleteFood } from "../services/apiFood";

export function useDeleteFood() {
  const [foodTypeFromUrl, setFoodTypeFromUrl] = useState(
    window.location.pathname.slice(1)
  );

  useEffect(() => {
    setFoodTypeFromUrl(window.location.pathname.slice(1));
  }, []);

  const queryClient = useQueryClient();
  const { mutate: deleteFoodItem, isPending: isDeletingItem } = useMutation({
    mutationFn: ({ foodObjectToDelete, foodTypeFromUrl }) =>
      apiDeleteFood(foodObjectToDelete, foodTypeFromUrl),
    onSuccess: () => {
      toast.success("Item was deleted");
      queryClient.invalidateQueries({ queryKey: [foodTypeFromUrl] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Couldn't delete item");
    },
  });

  return { isDeletingItem, deleteFoodItem };
}

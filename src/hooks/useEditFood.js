import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFood as apiUpdateFood } from "../services/apiFood";

export function useEditFood() {
  const [foodTypeFromUrl, setFoodTypeFromUrl] = useState(
    window.location.pathname.slice(1)
  );

  useEffect(() => {
    setFoodTypeFromUrl(window.location.pathname.slice(1));
  }, []);

  const queryClient = useQueryClient();
  const { mutate: modifyFoodItem, isLoading: isEditingItem } = useMutation({
    mutationFn: ({ editedFoodType, foodTypeFromUrl }) =>
      apiUpdateFood(editedFoodType, foodTypeFromUrl),
    onSuccess: () => {
      toast.success("Item was updated");
      queryClient.invalidateQueries({ queryKey: [foodTypeFromUrl] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Couldn't update item");
    },
  });

  return { isEditingItem, modifyFoodItem };
}

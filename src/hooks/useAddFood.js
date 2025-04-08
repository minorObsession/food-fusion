import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewFood as addNewFoodAPI } from "../services/apiFood";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useAddFood() {
  const foodTypeFromUrl = window.location.pathname.slice(1);

  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate: addNewFoodItem, isPending: isCreating } = useMutation({
    mutationFn: addNewFoodAPI,
    onSuccess: () => {
      toast.success("Food successfully added to the menu!");
      queryClient.invalidateQueries({ queryKey: [foodTypeFromUrl] });
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Couldn create new dish");
    },
  });

  return {
    addNewFoodItem,
    isCreating,
    register,
    handleSubmit,
    foodTypeFromUrl,
    getValues,
    errors,
  };
}

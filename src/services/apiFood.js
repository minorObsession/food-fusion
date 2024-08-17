import supabase from "./supabase";

export async function getFood(queryKey) {
  let { data, error } = await supabase.from(queryKey).select("*");

  if (error) {
    console.error(error);
    throw new Error(
      `${queryKey[0].toUpperCase() + queryKey.slice(1)} could not be loaded`
    );
  }

  return data;
}

export async function updateFood(updatedFoodObject, foodType) {
  let { data: updatedFood, error } = await supabase
    .from(foodType)
    .update({ ...updatedFoodObject })
    .eq("id", updatedFoodObject?.id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Dish could not be updated");
  }

  return updatedFood;
}

export async function deleteFood(foodObjectToDelete, foodType) {
  console.log("deleteFood food running!!");
  console.log(foodObjectToDelete, foodType);

  let { data, error } = await supabase
    .from(foodType)
    .delete()
    .eq("id", foodObjectToDelete?.id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Dish could not be deleted!");
  }

  return data;
}

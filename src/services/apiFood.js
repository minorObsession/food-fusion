import supabase, { supabaseUrl } from "./supabase";

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

export async function addNewFood(newFoodObject) {
  const imageFile = newFoodObject.image[0];
  const imageName = imageFile.name.replaceAll("/", "").replaceAll(" ", "-");

  let imagePath = `${supabaseUrl}/storage/v1/object/public/${newFoodObject.foodType}-photos/${imageName}`;

  const preparedFoodObject = { ...newFoodObject, image: imagePath };
  // console.log("preparedFoodObject:", preparedFoodObject);

  // ! uploading food object to Supabase
  const { data: newFoodItem, error } = await supabase
    .from(newFoodObject.foodType)
    .insert([preparedFoodObject])
    .select();

  // console.log(newFoodItem);
  if (error) {
    console.error(error.message);
    throw new Error("Dish could not be created");
  }

  imagePath = `${preparedFoodObject.foodType}-photos/${imageName}`;

  if (!(imageFile instanceof File)) {
    throw new Error("Uploaded file is not valid");
  }
  // console.log(preparedFoodObject);
  // ! if no - upload photo to Supabase first
  const { data, error: storageError } = await supabase.storage
    .from(`${preparedFoodObject.foodType}-photos`)
    .upload(imageName, imageFile, {
      upsert: true,
    });

  // ! if upload not working, delete dish!
  if (storageError) console.log("storage error");

  return newFoodItem;
}

// !
// !
// !
// !
// !
// !
// ! FIGURE OUT FUCKING IMAGE PATH
export async function updateFood(updatedFoodObject, foodType) {
  const imageFile = updatedFoodObject.image;
  const imageName = imageFile.name.replaceAll("/", "").replaceAll(" ", "-");

  let imagePath = `${supabaseUrl}/storage/v1/object/public/${foodType}-photos/${imageName}`;

  const preparedFoodObject = { ...updatedFoodObject, image: imagePath };

  let { data: updatedFood, error } = await supabase
    .from(foodType)
    .update(preparedFoodObject)
    .eq("id", updatedFoodObject?.id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Dish could not be updated");
  }

  // Replace image field with the new image name or path
  imagePath = `${supabaseUrl}/storage/v1/object/public/${foodType}-photos/${imageName}`;

  if (!(imageFile instanceof File)) {
    throw new Error("Uploaded file is not valid");
  }

  const { data, error: storageError } = await supabase.storage
    .from(`${foodType}-photos`)
    .upload(imageName, imageFile, {
      upsert: true,
    });

  if (storageError) {
    console.error("storage error!!");
  }

  return updatedFood;
}

export async function deleteFood(foodObjectToDelete, foodType) {
  // console.log(foodObjectToDelete, foodType);

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

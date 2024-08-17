import supabase from "./supabase";

export async function getOrders() {
  let { data: orders, error } = await supabase.from("orders").select("*");
  if (error) {
    console.error(error);
    throw new Error("Problem getting orders");
  }

  return orders;
}

export async function createStoreNewOrder(newOrder) {
  let { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Your order could not be created");
  }

  return data;
}

export async function updateOrder(orderObject) {
  let { data: order, error } = await supabase
    .from("orders")
    .update({ ...orderObject })
    .eq("id", orderObject?.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Problem getting orders");
  }

  return order;
}

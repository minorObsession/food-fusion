import supabase from "./supabase";

export async function createNewAccount(accountObject) {
  console.log(accountObject);
  let { data: accounts, error } = await supabase
    .from("accounts")
    .insert([accountObject])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Account couldn't be created");
  }

  console.log(accounts);

  return accounts;
}

export async function getAccounts() {
  let { data: accounts, error } = await supabase.from("accounts").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("There was an error getting the accounts");
  }

  return accounts;
}

// export async function logIntoAccount(params) {
//   // ! create a variable "theVariable" that finds the right account in accounts array

//   // return theVariable;
//   return null;
// }

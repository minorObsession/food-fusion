export function sortFood(foodArray, sortBy = "soldOut") {
  let sortedFood;

  if (sortBy === "soldOut")
    sortedFood = foodArray?.slice().sort((a, b) => a.soldOut - b.soldOut);

  if (sortBy === "name")
    sortedFood = foodArray?.slice().sort((a, b) => a.name - b.name);

  if (sortBy === "unitPrice")
    sortedFood = foodArray?.slice().sort((a, b) => a.unitPrice - b.unitPrice);

  return sortedFood;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));

async function reverseGeocodingCurrentPosition(latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (!res.ok) throw new Error("Couldn't get your position");

    const data = await res.json();
    console.log(data);
    const {
      locality: city,
      countryCode: country,
      postcode: zipCode,
      principalSubdivisionCode,
    } = data;

    const address = {
      city,
      country,
      zipCode,
      state: principalSubdivisionCode.slice(-2),
    };

    return address;
  } catch (err) {
    console.error("Error with reverse geocoding:", err.message);
  }
}

export function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async function (pos) {
        const { latitude, longitude } = pos.coords;
        const city = await reverseGeocodingCurrentPosition(latitude, longitude);
        resolve(city);
      },
      (err) => reject(err)
    );
  });
}

export function capitalize(word) {
  return word.split("")[0].toUpperCase() + word.slice(1);
}

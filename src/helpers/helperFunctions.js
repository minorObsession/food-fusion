export function sortFood(foodArray, sortBy = "soldOut") {
  let sortedFood;

  if (sortBy === "soldOut")
    sortedFood = foodArray?.slice().sort((a, b) => a.soldOut - b.soldOut);

  if (sortBy === "name")
    sortedFood = foodArray
      ?.slice()
      .sort((a, b) => a.name.localeCompare(b.name));

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

export const formatDate = (date, options = null) =>
  options
    ? new Intl.DateTimeFormat("en", options).format(new Date(date))
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
        time: "short",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date));

async function reverseGeocodingCurrentPosition(latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (!res.ok) throw new Error("Couldn't get your position");

    const data = await res.json();

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

export const fakeCart = [
  {
    id: 7,
    name: "Eggplant Parmesan",
    ingredients: ["marinara", "mozzarella", "eggplant", "parmesan"],
    unitPrice: 52,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Eggplant Parmesan.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 6,
    name: "Mediterranean",
    ingredients: [
      "tomato",
      "mozzarella",
      "sun-dried tomatoes",
      "olives",
      "artichoke",
    ],
    unitPrice: 34,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Mediterranean.jpg?t=2024-07-29T19%3A42%3A26.460Z",
    foodType: null,
    quantity: 2,
  },
  {
    id: 14,
    name: "PIZZA 001",
    ingredients: ["A", "F", "S", "F", "", ""],
    unitPrice: 20,
    soldOut: null,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/IMG_5220.png",
    foodType: "pizza",
    quantity: 3,
  },
  {
    id: 3,
    name: "Carbonara",
    ingredients: ["spaghetti", "eggs", "Pecorino Romano cheese", "guanciale"],
    unitPrice: 25,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Diavola.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 2,
    name: "Baked Ziti",
    ingredients: [
      "ziti pasta",
      "ground beef",
      "ricotta cheese",
      "tomato sauce",
    ],
    unitPrice: 30,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pasta-photos/stock-photo-baked-ziti-hearty-baked-pasta-dish-with-melted-cheese-and-savory-sauce-2475559951.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 100,
    name: "Mushroom Chicken Pasta",
    ingredients: ["mushrooms", "chicken", "garlic", "alfredo sauce"],
    unitPrice: 28,
    soldOut: null,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pasta-photos/stock-photo-pasta-mushrooms-with-chicken-parmesa-and-basil-on-white-backgroun-copy-space-top-view-2250819991.jpg",
    foodType: "pasta",
    quantity: 2,
  },
];

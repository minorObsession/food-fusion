import { useDispatch, useSelector } from "react-redux";

import FoodItem from "../../ui/FoodItem";

function PizzaItem({ pizza }) {
  // const { cart } = useSelector((store) => store.cart);

  return <FoodItem foodType={pizza} />;
}

export default PizzaItem;

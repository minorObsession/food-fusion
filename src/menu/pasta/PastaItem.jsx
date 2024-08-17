import { useDispatch, useSelector } from "react-redux";

import FoodItem from "../../ui/FoodItem";

function PastaItem({ pasta }) {
  return <FoodItem foodType={pasta} />;
}

export default PastaItem;

import { useState } from "react";
import { useSelector } from "react-redux";

import { FoodContainer, FoodPage, H1, H2 } from "../styles/reusableStyles";
import Spinner from "../ui/Spinner";
import FoodItem from "../ui/FoodItem";
import { getFood } from "../services/apiFood";
import { sortFoodBySoldOut } from "../helpers/helperFunctions";
import { useFood } from "../hooks/useFood";
import { Button } from "../ui/ButtonUI";
import AddProductForm from "../ui/AddProductForm";

function FoodProductPage({ queryKey }) {
  const foodType = window.location.pathname.slice(1);
  const { currentAccount } = useSelector((store) => store.accounts);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: foodData, isLoading } = useFood(queryKey, () =>
    getFood(queryKey)
  );

  const foodSortedBySoldOut = sortFoodBySoldOut(foodData);

  if (isLoading)
    return (
      <FoodPage>
        <Spinner />
      </FoodPage>
    );

  if (!foodData)
    return (
      <FoodPage>
        <H2>No dishes currently available </H2>
      </FoodPage>
    );

  return (
    <FoodPage>
      <H1 $foodPageTitle={true}>
        {foodType[0].toUpperCase() + foodType.slice(1)} Menu
      </H1>
      <FoodContainer>
        {foodSortedBySoldOut?.map((p, i) => (
          <FoodItem foodType={p} key={Math.random() + i} />
        ))}
      </FoodContainer>
      {currentAccount?.typeOfUser === "admin" && (
        <>
          <Button
            onClick={() => setIsFormOpen((s) => !s)}
            $className="submitFormBtn"
          >
            {isFormOpen ? "Hide Form" : "Add new Dish"}
          </Button>
          {isFormOpen && <AddProductForm setIsFormOpen={setIsFormOpen} />}
        </>
      )}
    </FoodPage>
  );
}

export default FoodProductPage;

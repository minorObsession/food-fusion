import styled from "styled-components";

import { FoodContainer, FoodPage, H1, H2 } from "../../styles/reusableStyles";
import Spinner from "../../ui/Spinner";
import FoodItem from "../../ui/FoodItem";
import { getFood } from "../../services/apiFood";
import { sortFoodBySoldOut } from "../../helpers/helperFunctions";
import { useFood } from "../useFood";

function Pizza() {
  const {
    data: pizzas,
    isLoading,
    error,
  } = useFood("pizzas", () => getFood("pizza"));

  const sortedPizzas = sortFoodBySoldOut(pizzas);

  if (isLoading)
    return (
      <FoodPage>
        <Spinner />
      </FoodPage>
    );

  return (
    <FoodPage>
      <H1 $foodPageTitle={true}>Pizza Menu</H1>
      <FoodContainer>
        {sortedPizzas?.map((p, i) => (
          <FoodItem foodType={p} key={Math.random() + i} />
        ))}
      </FoodContainer>
    </FoodPage>
  );
}

export default Pizza;

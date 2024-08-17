import { sortFoodBySoldOut } from "../../helpers/helperFunctions";
import { getFood } from "../../services/apiFood";
import { FoodContainer, FoodPage, H1, H2 } from "../../styles/reusableStyles";
import FoodItem from "../../ui/FoodItem";
import Spinner from "../../ui/Spinner";
import { useFood } from "../useFood";

function Mediterranean() {
  const {
    data: mediterraneanF,
    isLoading,
    error,
  } = useFood("mediterraneanF", () => getFood("mediterranean"));

  const sortedMediterranean = sortFoodBySoldOut(mediterraneanF);

  if (isLoading)
    return (
      <FoodPage>
        <Spinner></Spinner>
      </FoodPage>
    );

  if (!mediterraneanF)
    return (
      <FoodPage>
        <H2>No dishes currently available </H2>
      </FoodPage>
    );
  return (
    <FoodPage>
      <H1>Mediterranean food menu</H1>

      <FoodContainer>
        {sortedMediterranean?.map((p, i) => (
          <FoodItem foodType={p} key={Math.random() + i} />
        ))}
      </FoodContainer>
    </FoodPage>
  );
}

export default Mediterranean;

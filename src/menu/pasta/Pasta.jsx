import { FoodContainer, FoodPage, H1, H2 } from "../../styles/reusableStyles";
import Spinner from "../../ui/Spinner";
import FoodItem from "../../ui/FoodItem";
import { sortFoodBySoldOut } from "../../helpers/helperFunctions";
import { useFood } from "../useFood";
import { getFood } from "../../services/apiFood";

function Pasta() {
  const {
    data: pastas,
    isLoading,
    error,
  } = useFood("pastas", () => getFood("pasta"));

  const sortedPastas = sortFoodBySoldOut(pastas);

  if (isLoading)
    return (
      <FoodPage>
        <Spinner />
      </FoodPage>
    );

  return (
    <FoodPage>
      <H1 $foodPageTitle={true}>Pasta Menu</H1>
      <FoodContainer>
        {sortedPastas.map((p, i) => (
          <FoodItem foodType={p} key={Math.random() + i} />
        ))}
      </FoodContainer>
    </FoodPage>
  );
}

export default Pasta;

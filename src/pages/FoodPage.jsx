import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { FoodContainer, FoodPage, H1, H2 } from "../styles/reusableStyles";
import Spinner from "../ui/Spinner";
import FoodItem from "../ui/FoodItem";
import { getFood } from "../services/apiFood";
import { sortFood } from "../helpers/helperFunctions";
import { useFood } from "../hooks/useFood";
import { Button } from "../ui/ButtonUI";
import AddProductForm from "../ui/AddProductForm";

const SortBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 1rem;
  scale: calc(0.9);

  @media (min-width: 480px) {
    flex-direction: row;
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

function FoodProductPage({ queryKey }) {
  const foodType = window.location.pathname.slice(1);
  const { currentAccount } = useSelector((store) => store.accounts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: foodData, isLoading } = useFood(queryKey, () =>
    getFood(queryKey)
  );
  const [sortCriteria, setSortCriteria] = useState("soldOut");

  const [sortedFood, setSortedFood] = useState(
    sortFood(foodData, sortCriteria)
  );

  // ? on initial render - sort by soldOut
  useEffect(() => {
    if (!foodData) return;
    setSortedFood(sortFood(foodData, "soldOut"));
    setSortCriteria("soldOut");
  }, [foodData]);

  // ? auto scroll to form
  const formRef = useRef(null);
  useEffect(() => {
    if (isFormOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isFormOpen]);

  function handleSortFood(e) {
    const newSortCriteria = e.target.value;
    console.log(newSortCriteria);
    if (sortCriteria === newSortCriteria) {
      setSortCriteria("soldOut");
      setSortedFood(sortFood(foodData, "soldOut"));
    } else {
      setSortCriteria(newSortCriteria);
      setSortedFood(sortFood(foodData, newSortCriteria));
    }
  }

  function handleOpenProductForm() {
    setIsFormOpen((s) => !s);
  }

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
        <SortBox>
          <Button
            $sortCriteria={sortCriteria}
            value="unitPrice"
            onClick={handleSortFood}
          >
            Sort by Price
          </Button>
          <Button
            $sortCriteria={sortCriteria}
            value="name"
            onClick={handleSortFood}
          >
            Sort by Name
          </Button>
        </SortBox>
        {sortedFood?.map((p, i) => (
          <FoodItem foodType={p} key={Math.random() + i} />
        ))}
      </FoodContainer>
      {currentAccount?.typeOfUser === "admin" && (
        <>
          <Button onClick={handleOpenProductForm} $className="submitFormBtn">
            {isFormOpen ? "Hide Form" : "Add new Dish"}
          </Button>
          {isFormOpen && (
            <AddProductForm ref={formRef} setIsFormOpen={setIsFormOpen} />
          )}
        </>
      )}
    </FoodPage>
  );
}

export default FoodProductPage;

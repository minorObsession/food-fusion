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
import { useSearchParams } from "react-router-dom";

const SortBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }

  @media (min-width: 768px) {
    /* flex-direction: column; */

    justify-content: flex-end;
  }
`;

function FoodProductPage({ queryKey }) {
  const { data: foodData, isLoading } = useFood(queryKey, () =>
    getFood(queryKey)
  );
  const foodType = window.location.pathname.slice(1);
  const { currentAccount } = useSelector((store) => store.accounts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(
    localStorage.getItem("sort") || "soldOut"
  );

  const [sortedFood, setSortedFood] = useState(
    sortFood(foodData, sortCriteria)
  );
  const [params, setParams] = useSearchParams(
    localStorage.getItem("sort") || "soldOut"
  );

  function handleSortFood(e) {
    const newSortCriteria = e.target.value;

    if (sortCriteria === newSortCriteria) {
      setSortCriteria("soldOut");
      setSortedFood(sortFood(foodData, "soldOut"));
    } else {
      setSortCriteria(newSortCriteria);
      setSortedFood(sortFood(foodData, newSortCriteria));
    }
  }

  // ? initialize food
  useEffect(() => {
    if (!foodData) return;
    setSortedFood(sortFood(foodData, sortCriteria));
    // setSortCriteria("soldOut");
  }, [foodData, sortCriteria]);

  // ? sync with url
  useEffect(() => {
    setParams({ sort: sortCriteria });
    localStorage.setItem("sort", sortCriteria);
  }, [sortCriteria, setParams, foodData]);

  function handleOpenProductForm() {
    setIsFormOpen((s) => !s);
  }
  // ? auto scroll to form
  const formRef = useRef(null);
  useEffect(() => {
    if (isFormOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isFormOpen]);

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
      <H2 style={{ marginBottom: "3rem" }} $foodPageTitle={true}>
        {foodType[0].toUpperCase() + foodType.slice(1)} Menu
      </H2>
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

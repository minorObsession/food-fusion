import styled from "styled-components";
import { Input, Option, Select } from "./Input";
import FileInput from "./FileInput";

import { Button } from "./ButtonUI";
import { useAddFood } from "../hooks/useAddFood";
import React from "react";
import FormRow from "./FormRow";
import { useKeyPress } from "../hooks/useKeyPress";

const StyledAddProductForm = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-wrap: wrap; */
  width: 100%;
  gap: 2rem;
  padding: 1rem;

  scroll-behavior: smooth;

  @media (min-width: 1024px) {
    width: 80%;
  }
  @media (min-width: 1300px) {
    width: 60%;
  }
  button {
    margin-top: 3rem; /* Adjust the margin top as needed */
  }
`;

const InlineInput = styled.input`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-brand-200);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.5rem;
  box-shadow: var(--shadow-sm);
  width: 100%;

  filter: ${({ disabled }) => (disabled === true ? "grayscale(80%)" : "none")};
  opacity: ${({ disabled }) => (disabled === true ? "0.4" : "1")};

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    background-color: var(--color-grey-100);
    font-weight: 600;
    outline: 2px solid var(--color-brand-300);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const IngredientsDiv = styled.div`
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row: 3 / span 2;
  grid-column: 2;
`;

const AddProductForm = React.forwardRef(({ setIsFormOpen }, ref) => {
  const {
    addNewFoodItem,
    isCreating,
    register,
    handleSubmit,
    foodTypeFromUrl,
    errors,
  } = useAddFood();

  function formSubmit(data) {
    addNewFoodItem(data);
    setTimeout(() => {
      setIsFormOpen(false);
    }, 2000);
  }

  useKeyPress("Enter", handleSubmit(formSubmit));
  useKeyPress("NumpadEnter", handleSubmit(formSubmit));

  return (
    <StyledAddProductForm ref={ref} onSubmit={handleSubmit(formSubmit)}>
      <FormRow span="name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Dish needs to have a name",
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow span="category" errorMessage={errors?.category?.message}>
        <Select
          {...register("foodType")}
          disabled={isCreating}
          defaultValue={foodTypeFromUrl}
        >
          <Option value="pizza">pizza</Option>
          <Option value="pasta">pasta</Option>
          <Option value="mediterranean">mediterranean</Option>
        </Select>
      </FormRow>
      <FormRow span="ingredients" errorMessage={errors?.ingredients?.message}>
        <IngredientsDiv>
          <InlineInput
            type="text"
            id="ing1"
            disabled={isCreating}
            {...register("ingredients[0]", {
              required: "There needs to be at least 3 ingredients",
            })}
          />
          <InlineInput
            type="text"
            id="ing2"
            disabled={isCreating}
            {...register("ingredients[1]", {
              required: "There needs to be at least 3 ingredients",
            })}
          />
          <InlineInput
            type="text"
            id="ing3"
            disabled={isCreating}
            {...register("ingredients[2]", {
              required: "There needs to be at least 3 ingredients",
            })}
          />
          <InlineInput
            type="text"
            id="ing4"
            disabled={isCreating}
            {...register("ingredients[3]", {
              required: false,
            })}
          />
          <InlineInput
            type="text"
            id="ing5"
            disabled={isCreating}
            {...register("ingredients[4]", { required: false })}
          />
          <InlineInput
            type="text"
            id="ing6"
            disabled={isCreating}
            {...register("ingredients[5]", {
              required: false,
            })}
          />
        </IngredientsDiv>
      </FormRow>
      <FormRow span="price" errorMessage={errors?.unitPrice?.message}>
        <Input
          type="number"
          id="unitPrice"
          {...register("unitPrice", {
            required: "Dish needs to have a price",
            min: {
              value: 1,
              message: "Price needs to be a at lease $1",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow span="image" errorMessage={errors?.image?.message}>
        <FileInput
          disabled={isCreating}
          type="file"
          id="image"
          {...register("image", {
            required: "Dish needs to have an image",
          })}
        />
      </FormRow>
      <Button style={{ width: "80%", margin: "0 auto" }} $className="main">
        Add product
      </Button>
    </StyledAddProductForm>
  );
});

AddProductForm.displayName = "AddProductForm";

export default AddProductForm;

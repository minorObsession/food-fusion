import styled from "styled-components";
import { Ingredients } from "../styles/reusableStyles";
import { Input, Option, Select, Span } from "./Input";
import FileInput from "./FileInput";
import { useForm } from "react-hook-form";

import { Button } from "./ButtonUI";
import { useAddFood } from "../hooks/useAddFood";

const StyledAddProductForm = styled.form`
  margin: 0 auto;
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr;
  row-gap: 1rem;
  padding: 2rem;
`;

const InlineInput = styled.input`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
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
  width: 75%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row: 3 / span 2;
  grid-column: 2;

  background-color: ${({ $disabled }) =>
    $disabled === true && "var(--color-grey-500)"};

  color: ${({ disabled }) => disabled === true && "var(--color-grey-100)"};
`;

function AddProductForm({ setIsFormOpen }) {
  const {
    addNewFoodItem,
    isCreating,
    register,
    handleSubmit,
    foodTypeFromUrl,
  } = useAddFood();

  function formSubmit(data) {
    console.log(data);
    setTimeout(() => {
      addNewFoodItem(data);
      // setIsFormOpen(false);
    }, 1000);
  }

  return (
    <StyledAddProductForm onSubmit={handleSubmit(formSubmit)}>
      <Span>name</Span>
      <Input
        type="text"
        id="name"
        {...register("name", {
          required: "required field",
        })}
        disabled={isCreating}
      ></Input>
      <Span>category</Span>
      <Select
        {...register("foodType")}
        disabled={isCreating}
        defaultValue={foodTypeFromUrl}
      >
        <Option value="pizza">pizza</Option>
        <Option value="pasta">pasta</Option>
        <Option value="mediterranean">mediterranean</Option>
      </Select>
      <Span $ingSpan={true}>ingredients</Span>
      <IngredientsDiv $disabled={isCreating}>
        <InlineInput
          type="text"
          id="ing1"
          {...register("ingredients[0]", {
            required: "required field",
          })}
        ></InlineInput>
        <InlineInput
          type="text"
          id="ing2"
          {...register("ingredients[1]", {
            required: "required field",
          })}
        ></InlineInput>
        <InlineInput
          type="text"
          id="ing3"
          {...register("ingredients[2]", {
            required: "required field",
          })}
        ></InlineInput>
        <InlineInput
          type="text"
          id="ing4"
          {...register("ingredients[3]", {
            required: false,
          })}
        ></InlineInput>
        <InlineInput
          type="text"
          id="ing5"
          {...register("ingredients[4]", { required: false })}
        ></InlineInput>
        <InlineInput
          type="text"
          id="ing6"
          {...register("ingredients[5]", {
            required: false,
          })}
        ></InlineInput>
      </IngredientsDiv>
      <Span>price</Span>
      <Input
        type="number"
        id="unitPrice"
        {...register("unitPrice", {
          required: "required field",
        })}
        disabled={isCreating}
      ></Input>
      <Span>image</Span>
      <FileInput
        disabled={isCreating}
        type="file"
        id="image"
        {...register("image", {
          required: "required field",
        })}
      ></FileInput>
      <Button $className="main">Add product</Button>
    </StyledAddProductForm>
  );
}

export default AddProductForm;

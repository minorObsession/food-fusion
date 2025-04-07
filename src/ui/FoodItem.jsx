import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import {
  addItemToCart,
  deleteItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../features/cartSlice";

import {
  Img,
  Ingredients,
  Name,
  NameIngPriceDiv,
  Price,
  StyledFoodItem,
} from "../styles/reusableStyles";

import { Button } from "./ButtonUI";

import { DeleteBtn, ModifyQuantityBtn, ModifyQuantityDiv } from "./CartItem";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { Input } from "./Input";

import { useEditFood } from "../hooks/useEditFood";
import { useDeleteFood } from "../hooks/useDeleteFood";
import FileInput from "./FileInput";
import { supabaseUrl } from "../services/supabase";
import { NavLink } from "react-router-dom";
import { updateFood } from "../services/apiFood";
import { useKeyPress } from "../hooks/useKeyPress";

const Div = styled.div`
  align-self: flex-end;
  justify-self: end;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / span 2;

  ${({ $isEditing }) =>
    $isEditing &&
    css`
      /* flex-direction: row; */
      grid-column: 1 / 3;
      margin: 0 auto;

      & button {
        width: 100%;
      }
    `}

  @media (min-width: 480px) {
    /* grid-template-columns: 30% 35% 35%; */
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    grid-column: 3/4;
    /* grid-row: 1; */
    margin: 0;

    & button {
    }
  }
`;

const SmallerDiv = styled.div`
  /* align-self: flex-end; */
  display: flex;
  /* flex-direction: column; */

  gap: 1rem;
  grid-column: 1 / span 2;
  justify-self: center;

  @media (min-width: 480px) {
    /* grid-template-columns: 30% 35% 35%; */
    flex-direction: row;

    justify-self: end;
  }
  @media (min-width: 768px) {
    /* grid-template-columns: 30% 35% 35%; */
    flex-direction: column;

    grid-column: 3;
    /* justify-self: end; */
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  grid-row: 2 / span 2;
`;

function FoodItem({ foodType }) {
  const [foodTypeFromUrl, setFoodTypeFromUrl] = useState(
    window.location.pathname.slice(1)
  );

  useEffect(() => {
    setFoodTypeFromUrl(window.location.pathname.slice(1));
  }, []);

  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cart);
  const { currentAccount } = useSelector((store) => store.accounts);
  const itemInCart = cart.map((item) => item.name).includes(foodType.name);
  const quantityInCart = cart.find(
    (item) => item.name === foodType.name
  )?.quantity;

  // ? edit/delete
  const { isEditingItem, modifyFoodItem } = useEditFood();
  const { isDeletingItem, deleteFoodItem } = useDeleteFood();
  const [editedFoodType, setEditedFoodType] = useState(foodType);
  const [isEditing, setIsEditing] = useState(true);

  useKeyPress("Escape", () => setIsEditing(false));

  const inStock = !foodType.soldOut;
  const isSoldOut = foodType.soldOut;

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  function saveChanges(e) {
    console.log(e);
    handleInputChange(e);
    // Dispatch an action to update the foodType
    modifyFoodItem({ editedFoodType, foodTypeFromUrl });
    // Turn off editing mode
    setTimeout(() => {
      setIsEditing(false);
    }, 1000);
  }

  //

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedFoodType({ ...editedFoodType, [name]: value });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];

    const filePath = `${supabaseUrl}/storage/v1/object/public/${foodTypeFromUrl}-photos/${file.name}`;

    setEditedFoodType({ ...editedFoodType, image: filePath });
  }

  function handleBackInStock() {
    if (inStock) return;

    if (!isEditing) toggleEditMode();
    if (foodType) {
      foodType.soldOut = false;
      updateFood(foodType, foodTypeFromUrl);
      toggleEditMode();
    }
  }

  function handleOutOfStock() {
    if (!inStock) return;

    if (!isEditing) toggleEditMode();
    if (foodType) {
      foodType.soldOut = true;
      updateFood(foodType, foodTypeFromUrl);
      toggleEditMode();
    }
  }

  function deleteFood() {
    deleteFoodItem({ foodObjectToDelete: foodType, foodTypeFromUrl });
  }

  return (
    <StyledFoodItem
      className="food-item"
      $soldOut={foodType.soldOut}
      $isEditing={isEditing}
    >
      <Img src={foodType.image} alt={`image of ${foodType.name}`} />
      <NameIngPriceDiv $isEditing={isEditing}>
        {isEditing ? (
          <EditContainer $isEditing={isEditing}>
            <FileInput
              name="image"
              id="image"
              accept="image/*"
              // value={editedFoodType.image}
              onChange={handleImageUpload}
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="text"
              name="name"
              value={editedFoodType.name}
              onChange={handleInputChange}
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="object"
              name="ingredients"
              value={editedFoodType.ingredients.join(", ")}
              onChange={(e) =>
                setEditedFoodType({
                  ...editedFoodType,
                  ingredients: e.target.value.split(", "),
                })
              }
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="number"
              name="unitPrice"
              value={editedFoodType.unitPrice}
              onChange={handleInputChange}
              $editInput={true}
              disabled={isEditingItem}
            />
          </EditContainer>
        ) : (
          // ! not editing
          <>
            <Name>{foodType.name}</Name>
            <Ingredients>{foodType.ingredients.join(", ")}</Ingredients>
            <Price>${foodType.unitPrice}</Price>
          </>
        )}
      </NameIngPriceDiv>
      {currentAccount?.typeOfUser === "customer" ? (
        itemInCart ? (
          <Div>
            <ModifyQuantityDiv>
              <ModifyQuantityBtn
                onClick={() => dispatch(decreaseItemQuantity(foodType))}
              >
                -
              </ModifyQuantityBtn>
              {quantityInCart}
              <ModifyQuantityBtn
                onClick={() => dispatch(increaseItemQuantity(foodType))}
              >
                +
              </ModifyQuantityBtn>
              <DeleteBtn onClick={() => dispatch(deleteItemFromCart(foodType))}>
                <IoTrashOutline />
              </DeleteBtn>
            </ModifyQuantityDiv>
          </Div>
        ) : (
          <Div>
            <Button onClick={() => dispatch(addItemToCart(foodType))}>
              Add to cart
            </Button>
          </Div>
        )
      ) : (
        (currentAccount?.typeOfUser === "admin" && (
          <Div $isEditing={isEditing}>
            {isEditing ? (
              <Div $isEditing={isEditing}>
                <Button disabled={isDeletingItem} onClick={deleteFood}>
                  Delete
                </Button>
                <Button onClick={handleOutOfStock}>Out of Stock</Button>
                <Button onClick={toggleEditMode}>Cancel</Button>
                <Button $className="main" onClick={saveChanges}>
                  Save
                </Button>
              </Div>
            ) : isSoldOut ? (
              <Button onClick={handleBackInStock}>Make available</Button>
            ) : (
              <Button onClick={toggleEditMode}>Edit Product</Button>
            )}
          </Div>
        )) ||
        (!currentAccount && (
          <SmallerDiv>
            <NavLink to="/loginCustomer">
              <Button $className="">Log In</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button $className="">Sign Up</Button>
            </NavLink>
          </SmallerDiv>
        ))
      )}
    </StyledFoodItem>
  );
}

export default FoodItem;

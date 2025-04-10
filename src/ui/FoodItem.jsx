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

import { DeleteBtn, ModifyButton, ModifyDiv } from "./CartItem";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { Input } from "./Input";

import { useKeyPress } from "../hooks/useKeyPress";

import { useDeleteFood } from "../hooks/useDeleteFood";
import FileInput from "./FileInput";
import { NavLink } from "react-router-dom";
import { updateFood } from "../services/apiFood";
import { useEditFood } from "../hooks/useEditFood";

const ButtonsDiv = styled.div`
  align-self: flex-end;
  justify-self: end;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / span 2;

  ${({ $isEditing }) =>
    $isEditing &&
    css`
      grid-column: 1 / 3;
      margin: 0 auto;

      @media (min-width: 768px) {
        margin: 0;
      }

      & button {
        width: 100%;
        /* padding: ; */
      }
    `}

  @media (min-width: 768px) {
    grid-column: 3/4;
  }
`;

const LoginSignupDiv = styled.div`
  justify-self: center;

  display: flex;
  align-self: end;

  gap: 1rem;
  grid-column: 1 / span 2;

  @media (min-width: 480px) {
    justify-self: end;

    flex-direction: row;
  }
  @media (min-width: 768px) {
    flex-direction: column;
    grid-column: 3;
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

function FoodItem({ food }) {
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cart);
  const { currentAccount } = useSelector((store) => store.accounts);
  const itemInCart = cart.map((item) => item.name).includes(food.name);
  const quantityInCart = cart.find((item) => item.name === food.name)?.quantity;

  // ? edit/delete
  const { isEditingItem, modifyFoodItem } = useEditFood();
  const { isDeletingItem, deleteFoodItem } = useDeleteFood();
  const [editedFood, setEditedFood] = useState(food);
  const [isEditing, setIsEditing] = useState(false);

  useKeyPress("Escape", () => setIsEditing(false));

  const inStock = !food.soldOut;
  const isSoldOut = food.soldOut;

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  function saveChanges(e) {
    handleInputChange(e);
    // Dispatch an action to update the foodType
    // ! if image is updated
    if (editedFood.image instanceof File) {
      modifyFoodItem({ editedFood, isImgUpdated: true });
    } else modifyFoodItem({ editedFood });

    // Turn off editing mode
    setTimeout(() => {
      setIsEditing(false);
      setEditedFood(food);
    }, 1000);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "unitPrice")
      setEditedFood({ ...editedFood, unitPrice: +value });
    else setEditedFood({ ...editedFood, [name]: value });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    setEditedFood({ ...editedFood, image: file });
  }

  function handleBackInStock() {
    if (inStock) return;

    if (!isEditing) toggleEditMode();

    if (food) {
      food.soldOut = false;
      updateFood(food);
      toggleEditMode();
    }
  }

  function handleOutOfStock() {
    if (!inStock) return;

    if (!isEditing) toggleEditMode();

    if (food) {
      food.soldOut = true;
      updateFood(food);
      toggleEditMode();
    }
  }

  function deleteFood() {
    deleteFoodItem({ foodObjectToDelete: food });
  }

  return (
    <StyledFoodItem
      className="food-item"
      $soldOut={food.soldOut}
      $isEditing={isEditing}
    >
      <Img src={food.image} alt={`image of ${food.name}`} />
      <NameIngPriceDiv $isEditing={isEditing}>
        {isEditing ? (
          <EditContainer $isEditing={isEditing}>
            <FileInput
              name="image"
              id="image"
              type="file"
              accept="image/*"
              // value={editedFood.image}
              onChange={handleImageUpload}
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="text"
              name="name"
              value={editedFood.name}
              onChange={handleInputChange}
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="object"
              name="ingredients"
              value={editedFood.ingredients.join(", ")}
              onChange={(e) =>
                setEditedFood({
                  ...editedFood,
                  ingredients: e.target.value.split(", "),
                })
              }
              $editInput={true}
              disabled={isEditingItem}
            />
            <Input
              type="text"
              name="unitPrice"
              value={editedFood.unitPrice}
              onChange={handleInputChange}
              $editInput={true}
              disabled={isEditingItem}
            />
          </EditContainer>
        ) : (
          // ! not editing
          <>
            <Name>{food.name}</Name>
            <Ingredients>{food.ingredients.join(", ")}</Ingredients>
            <Price>${food.unitPrice}</Price>
          </>
        )}
      </NameIngPriceDiv>
      {currentAccount?.typeOfUser === "customer" ? (
        itemInCart ? (
          <ButtonsDiv>
            <ModifyDiv>
              <ModifyButton
                onClick={(e) => {
                  dispatch(decreaseItemQuantity(food));
                  e.currentTarget.blur();
                }}
              >
                -
              </ModifyButton>
              <span style={{ width: "1rem" }}>{quantityInCart}</span>
              <ModifyButton
                onClick={(e) => {
                  dispatch(increaseItemQuantity(food));
                  e.currentTarget.blur();
                }}
              >
                +
              </ModifyButton>
              <DeleteBtn onClick={() => dispatch(deleteItemFromCart(food))}>
                <IoTrashOutline />
              </DeleteBtn>
            </ModifyDiv>
          </ButtonsDiv>
        ) : (
          <ButtonsDiv>
            <Button onClick={() => dispatch(addItemToCart(food))}>
              Add to cart
            </Button>
          </ButtonsDiv>
        )
      ) : (
        (currentAccount?.typeOfUser === "admin" && (
          <ButtonsDiv $isEditing={isEditing}>
            {isEditing ? (
              <ButtonsDiv $isEditing={isEditing}>
                <Button disabled={isDeletingItem} onClick={deleteFood}>
                  Delete
                </Button>
                <Button onClick={handleOutOfStock}>Out of Stock</Button>
                <Button onClick={toggleEditMode}>Cancel</Button>
                <Button $className="main" onClick={saveChanges}>
                  Save
                </Button>
              </ButtonsDiv>
            ) : isSoldOut ? (
              <Button onClick={handleBackInStock}>Make available</Button>
            ) : (
              <Button onClick={toggleEditMode}>Edit Product</Button>
            )}
          </ButtonsDiv>
        )) ||
        (!currentAccount && (
          <LoginSignupDiv>
            <NavLink to="/loginCustomer">
              <Button style={{ width: "100%" }}>Log In</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button style={{ width: "100%" }}>Sign Up</Button>
            </NavLink>
          </LoginSignupDiv>
        ))
      )}
    </StyledFoodItem>
  );
}

export default FoodItem;

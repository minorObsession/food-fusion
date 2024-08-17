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

import ButtonUI from "./ButtonUI";

import { DeleteBtn, ModifyQuantityBtn, ModifyQuantityDiv } from "./CartItem";
import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
  align-self: flex-end;
  display: flex;
  grid-column: 2;

  @media (min-width: 480px) {
    /* grid-template-columns: 30% 35% 35%; */
    grid-column: 3;
    justify-self: end;
  }
`;

function FoodItem({ foodType }) {
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cart);
  const { currentAccount } = useSelector((store) => store.accounts);

  const itemInCart = cart.map((item) => item.name).includes(foodType.name);

  const quantityInCart = cart.find(
    (item) => item.name === foodType.name
  )?.quantity;

  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedFoodType, setEditedFoodType] = useState(foodType);

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedFoodType({ ...editedFoodType, [name]: value });
  }

  function saveChanges() {
    // Dispatch an action to update the foodType
    // For now, just log the changes
    console.log("Updated foodType:", editedFoodType);

    // Turn off editing mode
    setIsEditing(false);
  }

  function editProduct() {
    // ! create new object

    // ! how to edit this data live on screen

    console.log(foodType);
  }
  return (
    <StyledFoodItem $soldOut={foodType.soldOut}>
      <Img src={foodType.image} alt={`image of ${foodType.name}`} />
      <NameIngPriceDiv>
        <Name>{foodType.name}</Name>
        <Ingredients>{foodType.ingredients.join(", ")}</Ingredients>
        <Price>${foodType.unitPrice}</Price>
      </NameIngPriceDiv>
      {/* // ! if in cart */}
      {currentAccount.typeOfUser === "customer" ? (
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
            <ButtonUI onClick={() => dispatch(addItemToCart(foodType))}>
              Add to cart
            </ButtonUI>
          </Div>
        )
      ) : (
        <Div>
          <ButtonUI onClick={editProduct}>Edit Product</ButtonUI>
        </Div>
      )}
    </StyledFoodItem>
  );
}

export default FoodItem;

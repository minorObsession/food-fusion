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

import ButtonUI, { Button } from "./ButtonUI";

import { DeleteBtn, ModifyQuantityBtn, ModifyQuantityDiv } from "./CartItem";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Input } from "./Input";

import { useEditFood } from "../menu/useEditFood";
import { useDeleteFood } from "../menu/useDeleteFood";
import FileInput from "./FileInput";
import { supabaseUrl } from "../services/supabase";
import { NavLink } from "react-router-dom";

const Div = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: ${({ $isEditing }) => ($isEditing === true ? "column" : "")};
  gap: 1rem;
  grid-column: 2;

  @media (min-width: 480px) {
    /* grid-template-columns: 30% 35% 35%; */
    grid-column: 3;
    justify-self: end;
  }
`;

const SmallerDiv = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  /* flex-direction: ${({ $isEditing }) =>
    $isEditing === true ? "column" : ""}; */
  gap: 1rem;
  grid-column: 2;

  @media (min-width: 480px) {
    /* grid-template-columns: 30% 35% 35%; */
    grid-column: 3;
    justify-self: end;
  }
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

  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedFoodType, setEditedFoodType] = useState(foodType);

  const { isEditingItem, modifyFoodItem } = useEditFood();
  const { isDeletingItem, deleteFoodItem } = useDeleteFood();

  const inStock = !foodType.soldOut;
  const isSoldOut = foodType.soldOut;

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedFoodType({ ...editedFoodType, [name]: value });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];

    // ! I WAS HERE WORKING ON THE IMAGE PATH
    const filePath = `${supabaseUrl}/storage/v1/object/public/${foodTypeFromUrl}-photos/${file.name}`;
    // ("https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Eggplant Parmesan.jpg");

    setEditedFoodType({ ...editedFoodType, image: filePath });
  }

  function handleBackInStock() {
    if (inStock) return;

    if (!isEditing) toggleEditMode();
    if (foodType) return (foodType.soldOut = false);
  }

  // ? https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Margherita.jpg?t=2024-08-14T21%3A21%3A28.994Z
  // ? https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Hawaiian.jpg?t=2024-08-14T21%3A21%3A39.106Z

  function handleOutOfStock() {
    if (!inStock) return;

    if (!isEditing) toggleEditMode();
    if (foodType) {
      foodType.soldOut = true;
      toggleEditMode();
    }
  }

  function saveChanges(e) {
    // console.log(e.target);
    handleInputChange(e);
    // Dispatch an action to update the foodType
    modifyFoodItem({ editedFoodType, foodTypeFromUrl });
    // Turn off editing mode
    setTimeout(() => {
      setIsEditing(false);
    }, 1000);
  }

  function deleteFood() {
    deleteFoodItem({ foodObjectToDelete: foodType, foodTypeFromUrl });
  }

  return (
    <StyledFoodItem className="food-item" $soldOut={foodType.soldOut}>
      <Img src={foodType.image} alt={`image of ${foodType.name}`} />
      <NameIngPriceDiv>
        {isEditing ? (
          <>
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
          </>
        ) : (
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
            <ButtonUI onClick={() => dispatch(addItemToCart(foodType))}>
              Add to cart
            </ButtonUI>
          </Div>
        )
      ) : (
        // !! when current account = 'admin'
        (currentAccount?.typeOfUser === "admin" && (
          <Div>
            {isEditing ? (
              <Div $isEditing={isEditing}>
                <ButtonUI onClick={deleteFood}>Delete</ButtonUI>
                <ButtonUI onClick={handleOutOfStock}>Out of Stock</ButtonUI>
                <ButtonUI onClick={toggleEditMode}>Cancel</ButtonUI>
                <ButtonUI onClick={saveChanges}>Save</ButtonUI>
              </Div>
            ) : isSoldOut ? (
              <ButtonUI onClick={handleBackInStock}>Make available</ButtonUI>
            ) : (
              <ButtonUI onClick={toggleEditMode}>Edit Product</ButtonUI>
            )}
          </Div>
        )) ||
        (!currentAccount && (
          <SmallerDiv>
            <NavLink to="/loginCustomer">
              <Button $className="">Log In</Button>
            </NavLink>
            <NavLink to="/signup">
              {" "}
              <Button $className="">Sign Up</Button>
            </NavLink>
          </SmallerDiv>
        ))
      )}
    </StyledFoodItem>
  );
}

export default FoodItem;

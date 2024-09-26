import styled from "styled-components";

import { IoTrashOutline } from "react-icons/io5";

import {
  addItemToCart,
  deleteItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../features/cartSlice";
import { useDispatch } from "react-redux";

const StyledCartItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 4rem;
  gap: 1rem;
  align-items: center;
  padding-bottom: 0.5rem;
  font-size: 16px;

  border-bottom: 1px solid var(--color-brand-600);

  &:last-child {
    border-bottom: none;
  }
`;

const NameAndQuantity = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const Quantity = styled.span``;

const Name = styled.h4`
  font-weight: 500;
`;

const PriceModifyDelete = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-self: end;

  @media (min-width: 1024px) {
    gap: 3rem;
  }
`;

export const ModifyQuantityDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: end;
  justify-self: center;
  align-self: center;

  @media (min-width: 480px) {
    /* grid-column: span 2; */
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    gap: 3rem;
    font-size: 20px;
  }
`;

const Price = styled.span`
  width: 3rem;
  font-weight: 500;
  font-style: italic;
`;

export const ModifyQuantityBtn = styled.button`
  border-radius: 50%;
  /* color: var(--color-grey-800); */
  width: 3rem;
  /* background-color: var(--color-brand-200); */
  color: var(--color-grey-50);

  background-color: var(--color-grey-500);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteBtn = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  font-size: 18px;
  color: var(--color-grey-50);
  background-color: var(--color-grey-700);
  margin-left: 2rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  align-self: flex-end;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    margin-left: 3rem;
  }
`;

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <StyledCartItem>
      <NameAndQuantity>
        <Quantity>{item.quantity}x</Quantity>
        <Name>{item.name}</Name>
      </NameAndQuantity>
      <PriceModifyDelete>
        <div>
          <Price>${item.quantity * item.unitPrice}</Price>
        </div>
        <ModifyQuantityDiv>
          <ModifyQuantityBtn
            onClick={() => dispatch(decreaseItemQuantity(item))}
          >
            -
          </ModifyQuantityBtn>
          <span style={{ width: "1rem" }}>{item.quantity}</span>
          <ModifyQuantityBtn
            onClick={() => dispatch(increaseItemQuantity(item))}
          >
            +
          </ModifyQuantityBtn>
        </ModifyQuantityDiv>

        <DeleteBtn onClick={() => dispatch(deleteItemFromCart(item))}>
          <IoTrashOutline />
        </DeleteBtn>
      </PriceModifyDelete>
    </StyledCartItem>
  );
}

export default CartItem;

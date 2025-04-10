import styled from "styled-components";

import { IoTrashOutline } from "react-icons/io5";

import {
  deleteItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../features/cartSlice";
import { useDispatch } from "react-redux";

const StyledCartItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  gap: 1rem;
  align-items: center;
  padding-bottom: 0.5rem;
  font-size: 16px;

  border-bottom: 2px solid var(--color-brand-500);

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
`;

const NameAndQuantity = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-basis: 40%;
  grid-column: span 2;
  justify-content: center;

  @media (min-width: 768px) {
    /* width */
    gap: 1.5rem;
    justify-content: start;
  }
  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
`;

const Name = styled.h4`
  font-weight: 600;
  grid-column: 2/3;
`;

export const ModifyDiv = styled.div`
  display: flex;

  gap: 1rem;
  align-items: center;

  align-self: center;
  font-weight: 600;
  background-color: var(--color-brand-200);
  padding: 0.6rem 1.2rem;

  border-radius: 25px;

  @media (min-width: 480px) {
  }

  @media (min-width: 768px) {
    justify-self: center;
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    gap: 1.5rem;
    font-size: 20px;
  }
`;

const Price = styled.span`
  font-weight: 700;
  letter-spacing: 1.8px;
  font-style: italic;

  grid-column: 2;
  grid-row: 2;
  justify-self: end;
  align-self: end;

  padding: 0.6rem 1.2rem;
`;

export const ModifyButton = styled.button`
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
  margin-left: 1rem;
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
      <Price>${item.quantity * item.unitPrice}</Price>
      <ModifyDiv>
        <ModifyButton
          onClick={(e) => {
            dispatch(decreaseItemQuantity(item));
            e.currentTarget.blur();
          }}
        >
          -
        </ModifyButton>
        <span>{item.quantity}</span>
        <ModifyButton
          onClick={(e) => {
            dispatch(decreaseItemQuantity(item));
            e.currentTarget.blur();
          }}
        >
          +
        </ModifyButton>
        <DeleteBtn onClick={() => dispatch(deleteItemFromCart(item))}>
          <IoTrashOutline />
        </DeleteBtn>
      </ModifyDiv>
    </StyledCartItem>
  );
}

export default CartItem;

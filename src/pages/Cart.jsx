import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import CartItem from "../ui/CartItem";
import { clearCart } from "../features/cartSlice";
import { createNewOrder } from "../features/orderSlice";
import { formatCurrency, formatDate } from "../helpers/helperFunctions";
import { useCreateNewOrder } from "../hooks/useCreateNewOrder";

const CartPage = styled.div`
  margin: 0 auto;
  overflow-y: scroll;
  scroll-behavior: smooth;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 480px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
    font-size: 20px;
  }

  /* Hide the scrollbar when there's nothing to scroll */
  &::-webkit-scrollbar {
    width: 0; /* Hides the scrollbar */
    height: 0;
  }

  /* Optional: For Firefox */
  scrollbar-width: none; /* Hides scrollbar in Firefox */
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 28px;
  padding: 3rem;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 3rem;

  @media (min-width: 1024px) {
    width: 60vw;
  }
`;
const CartDiv = styled.div`
  width: 100%;
  background-color: var(--color-brand-200);
  box-shadow: 5px 7px 28px var(--color-grey-500);
  border-radius: 18px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    /* align-items: center; */
  }
`;

const GrandTotalDiv = styled.div`
  background-color: var(--color-brand-200);

  text-align: end;
  align-items: end;
  font-size: 20px;
  font-weight: 500;
  padding: 1.5rem;
  box-shadow: 5px 7px 28px var(--color-grey-500);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & > :last-child {
    padding: 1rem 0 0;

    border-bottom: 2px solid var(--color-brand-500);
  }
`;

const OrderClearBtns = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  font-weight: 700;
`;

const OrderBtn = styled.button`
  padding: 2rem;

  @media (min-width: 1024px) {
    padding: 2.5rem;
    font-size: 18px;
  }

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    background-color: var(--color-brand -500);
    font-weight: 600;
    outline: 2px solid var(--color-brand-300);
  }

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const ClearBtn = styled.button`
  padding: 2rem;
  background-color: var(--color-grey-200);

  @media (min-width: 1024px) {
    padding: 2.5rem;
    font-size: 18px;
  }

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    background-color: var(--color-brand -500);
    font-weight: 600;
    outline: 2px solid var(--color-brand-300);
  }

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const DiscountDiv = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

function Cart() {
  // ! sync cart with local storage
  const { cart } = useSelector((store) => store.cart);
  const { orders } = useSelector((store) => store.order);
  const { currentAccount } = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderTotal = cart.reduce(
    (acm, item) => (acm += item.unitPrice * item.quantity),
    0
  );
  const { createOrder, isCreating } = useCreateNewOrder();

  const previousOrdersForCustomer =
    orders.filter((o) => o.customerName === currentAccount?.username)?.length ||
    0;
  const discountPercentage =
    previousOrdersForCustomer > 0 && previousOrdersForCustomer * 5;
  const discount = (discountPercentage / 100) * orderTotal;
  const grandTotal = orderTotal - discount;
  const deliveryFee = orderTotal < 50 ? 5 : 0;

  function handleSubmitOrder() {
    const newOrder = {
      orderID: Math.trunc(Math.random() * 100),
      orderTotal,
      discount,
      grandTotal,
      orderTime: formatDate(new Date()),
      orderObject: cart,
      customerName: currentAccount?.username,
    };

    // * navigate to order page with new orderID
    navigate(`/order/${newOrder.orderID}`);

    // ! don't go there if failed upload to SUPA
    setTimeout(() => {
      // * dispatch order to reducer
      dispatch(createNewOrder(newOrder));

      // * supabase submit order
      createOrder(newOrder);
    }, 500);
  }

  function handleClearCart() {
    const confirmClear = confirm("are you sure?");
    setTimeout(() => {
      if (confirmClear === true) dispatch(clearCart());
    }, 1000);
  }

  if (cart.length < 1)
    return (
      <CartPage>
        <H1>Your cart is empty </H1>
      </CartPage>
    );

  return (
    <CartPage>
      <H1>Your Cart</H1>
      <CartContainer>
        <CartDiv>
          {cart.map((item, i) => (
            <CartItem item={item} key={Math.random() + i} />
          ))}
        </CartDiv>
        <GrandTotalDiv>
          <h4>Subtotal: {formatCurrency(orderTotal)}</h4>
          <DiscountDiv>
            <p style={{ fontSize: "16px", fontStyle: "italic" }}>
              (based on your past {previousOrdersForCustomer} orders)
            </p>
            <h4>Discount: {formatCurrency(discount)}</h4>
          </DiscountDiv>
          <h4>Tax: {formatCurrency(grandTotal * 0.1)}</h4>
          {deliveryFee > 0 && <h4>Delivery fee: {formatCurrency(5)}</h4>}
          <h3>Grand Total: {formatCurrency(grandTotal)}</h3>
        </GrandTotalDiv>
        <OrderClearBtns>
          <OrderBtn disabled={isCreating} onClick={handleSubmitOrder}>
            ORDER ITEMS
          </OrderBtn>
          <ClearBtn disabled={isCreating} onClick={handleClearCart}>
            CLEAR CART
          </ClearBtn>
        </OrderClearBtns>{" "}
      </CartContainer>
    </CartPage>
  );
}

export default Cart;

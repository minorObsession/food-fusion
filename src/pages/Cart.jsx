import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import CartItem from "../ui/CartItem";
import { clearCart } from "../features/cartSlice";
import { createNewOrder } from "../features/orderSlice";
import { formatCurrency, formatDate } from "../helpers/helperFunctions";
import { createStoreNewOrder } from "../services/apiOrders";
import { useCreateNewOrder } from "../hooks/useCreateNewOrder";

const CartPage = styled.div`
  width: 80%;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 4rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    font-size: 20px;
    padding: 2.5rem;
    width: 60vw;
  }
`;

const H1 = styled.h1`
  text-align: left;
  font-size: 28px;
`;

const CartDiv = styled.div`
  width: 100%;
  background-color: var(--color-grey-100);
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
  background-color: var(--color-grey-100);

  align-self: end;
  text-align: end;
  font-size: 20px;
  font-weight: 500;
  padding: 1.5rem;
  box-shadow: 5px 7px 28px var(--color-grey-500);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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
`;

const ClearBtn = styled.button`
  padding: 2rem;
  background-color: var(--color-grey-200);

  @media (min-width: 1024px) {
    padding: 2.5rem;
    font-size: 18px;
  }
`;

function Cart() {
  const { cart } = useSelector((store) => store.cart);
  const { currentAccount } = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const grandTotal = cart.reduce(
    (acm, item) => (acm += item.unitPrice * item.quantity),
    0
  );
  const { createOrder, isCreating } = useCreateNewOrder();

  function handleSubmitOrder() {
    const newOrder = {
      orderID: Math.trunc(Math.random() * 100),
      grandTotal,
      orderTime: formatDate(new Date()),
      orderObject: cart,
      customerName: currentAccount?.username,
    };

    // * dispatch order
    dispatch(createNewOrder(newOrder));

    // * supabase submit order
    createOrder(newOrder);

    setTimeout(() => {
      // * navigate to order page with new orderID
      navigate(`/order/${newOrder.orderID}`);
    }, 2000);
  }
  console.log(isCreating);
  if (cart.length < 1)
    return (
      <CartPage>
        <H1>Your cart is empty </H1>
      </CartPage>
    );

  return (
    <CartPage>
      <H1>Your Cart</H1>
      <CartDiv>
        {cart.map((item, i) => (
          <CartItem item={item} key={Math.random + i} />
        ))}
      </CartDiv>
      <GrandTotalDiv>
        <p>
          Subtotal: <strong> {formatCurrency(grandTotal)}</strong>{" "}
        </p>
        <p>
          Tax: <strong> {formatCurrency(grandTotal * 0.1)}</strong>
        </p>
      </GrandTotalDiv>
      <OrderClearBtns>
        <OrderBtn disabled={isCreating} onClick={handleSubmitOrder}>
          ORDER ITEMS
        </OrderBtn>
        <ClearBtn disabled={isCreating} onClick={() => dispatch(clearCart())}>
          CLEAR CART
        </ClearBtn>
      </OrderClearBtns>
    </CartPage>
  );
}

export default Cart;

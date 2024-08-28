import { useSelector } from "react-redux";
import styled from "styled-components";
import { H1 } from "../styles/reusableStyles";
import Order from "../ui/Order";

const StyledOrders = styled.div`
  width: 85%;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 4rem;

  display: flex;
  flex-direction: column;
  /* gap: 3rem; */

  @media (min-width: 1024px) {
    font-size: 20px;
    padding: 2.5rem;
    width: 60vw;
  }
`;
const OrdersBox = styled.div`
  width: 100%;
  height: 80%;
  margin: 0 auto;
  /* background-color: green; */
  padding: 1rem;
  background-color: var(--color-brand-100);
  box-shadow: 5px 7px 28px var(--color-grey-500);
  border-radius: 18px;
  overflow-y: scroll;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2rem;
`;

function Orders() {
  const { currentAccount } = useSelector((store) => store.accounts);

  const { orders } = useSelector((store) => store.order);
  // ! most recent orders first
  const sortedOrders = orders.slice().reverse();

  if (currentAccount?.typeOfUser !== "admin") return;

  return (
    <StyledOrders>
      <H1>ORDERS</H1>
      <OrdersBox>
        {sortedOrders.map((o) => (
          <Order order={o} key={Math.random() + +o.orderID} />
        ))}
      </OrdersBox>
    </StyledOrders>
  );
}

export default Orders;

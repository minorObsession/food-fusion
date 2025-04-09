import { useSelector } from "react-redux";
import styled from "styled-components";
import { FoodPage, H1, H2 } from "../styles/reusableStyles";
import Order from "../ui/Order";

const StyledOrders = styled.div`
  margin: 0 auto;
  padding: 1rem;
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  /* gap: 3rem; */

  @media (min-width: 480px) {
    padding: 2rem;
  }
  @media (min-width: 1024px) {
    padding: 4rem;
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
  overflow-y: auto;

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
    <FoodPage style={{ scrollbarWidth: "none" }}>
      <H2 style={{ marginBottom: "3rem" }}>Orders</H2>
      <OrdersBox>
        {sortedOrders.map((o) => (
          <Order order={o} key={Math.random() + +o.orderID} />
        ))}
      </OrdersBox>
    </FoodPage>
  );
}

export default Orders;

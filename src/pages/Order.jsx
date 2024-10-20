import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FoodPage, H1 } from "../styles/reusableStyles";
import styled from "styled-components";
import { formatCurrency } from "../helpers/helperFunctions";
import BackButton from "../ui/BackButton";

const Name = styled.h2`
  text-align: left;
  font-size: 16px;
  font-weight: 600;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const Ingredients = styled.p`
  grid-row: 2;

  flex-grow: 1;
  font-style: italic;
  font-size: 12px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

const Price = styled.span`
  align-self: center;
  justify-self: flex-end;
  font-weight: 500;
  font-size: 15px;
`;

const TimeLeftUntilDelivery = styled.div`
  background-color: var(--color-grey-200);
  padding: 2rem;
  border-radius: 7px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderSummary = styled.div`
  padding: 2rem;

  display: flex;
  gap: 1rem;
  flex-direction: column;
  /* align-items: sta; */
  justify-content: space-between;
`;

const StyledOrderItem = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 2fr 1fr;
  align-items: center;
`;

const Quantity = styled.span``;
const QuantityName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const GrandTotalBreakdown = styled.div`
  background-color: var(--color-grey-200);
  padding: 2rem;
  border-radius: 7px;
  font-size: 2.2rem;

  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: end;
  /* justify-content: space-between; */
`;

const OrderContainer = styled.div`
  /* background-color: var(--color-grey-400); */
`;
function Order() {
  const { orderID } = useParams();
  const { orders } = useSelector((store) => store.order);
  const { currentAccount } = useSelector((store) => store.accounts);
  // console.log(orders);
  const order = orders?.find((o) => +o.orderID === +orderID);
  const orderItems = order?.orderObject;
  console.log(order);
  if (!order)
    return (
      <FoodPage>
        <H1>Couldn&apos;t find this order</H1>
        <BackButton />
      </FoodPage>
    );

  return (
    <FoodPage>
      <OrderContainer>
        <H1>ORDER #{order?.orderID}</H1>
        {/* // ! 1/3 - HOW LONG IS LEFT FOR DELIVERY */}
        <TimeLeftUntilDelivery>
          <h2> Delivery to {currentAccount?.streetAddress}</h2>
          <p>estimated: ETA</p>
        </TimeLeftUntilDelivery>
        {/* // ! 2/3 ORDER BREAKDOWN */}
        <OrderSummary>
          {orderItems?.map((orderItem) => (
            <StyledOrderItem key={Math.random() + orderItem.id}>
              <QuantityName>
                <Quantity>{orderItem.quantity} x</Quantity>
                <Name>{orderItem.name}</Name>
              </QuantityName>
              <Ingredients>{orderItem.ingredients.join(", ")}</Ingredients>
              <Price>${orderItem.unitPrice * orderItem.quantity}</Price>
            </StyledOrderItem>
          ))}
        </OrderSummary>

        {/* // ! 3/3 GRAND TOTAL BREAKDOWN */}
        <GrandTotalBreakdown>
          <h4>To pay on delivery: {formatCurrency(order?.grandTotal)}</h4>
        </GrandTotalBreakdown>
      </OrderContainer>
    </FoodPage>
  );
}

export default Order;

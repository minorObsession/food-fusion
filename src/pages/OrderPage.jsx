import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FoodPage, H1, H2 } from "../styles/reusableStyles";
import styled from "styled-components";
import { formatCurrency } from "../helpers/helperFunctions";
import BackButton from "../ui/BackButton";

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;

  @media (min-width: 1024px) {
    width: 70%;
  }
  @media (min-width: 1300px) {
    width: 60%;
  }
`;

const Name = styled.h2`
  text-align: left;
  font-size: 1.6rem;
  font-weight: 600;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Ingredients = styled.p`
  grid-row: 2;
  flex-grow: 1;
  font-style: italic;
  font-size: 1.2rem;

  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const Price = styled.span`
  align-self: center;
  justify-self: flex-end;
  font-weight: 600;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    grid-row: 2;
    font-size: 1.8rem;
  }
`;

const TimeLeftUntilDelivery = styled.div`
  background-color: var(--color-brand-200);
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid var(--color-brand-500);
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const OrderSummary = styled.div`
  background-color: var(--color-brand-200);
  border-radius: 10px;
  border: 2px solid var(--color-brand-500);
  padding: 2rem;

  display: flex;
  gap: 1rem;
  flex-direction: column;

  justify-content: space-between;
`;

const StyledOrderItem = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;

  &:not(:last-child) {
    padding: 1rem 0;

    border-bottom: 2px solid var(--color-brand-500);
  }

  @media (min-width: 768px) {
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 2fr 1fr;
  }
`;

const Quantity = styled.span`
  white-space: nowrap;
  font-weight: 600;
`;

const QuantityName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const GrandTotalBreakdown = styled.div`
  background-color: var(--color-brand-200);
  padding: 2rem;
  border-radius: 7px;
  font-size: 2rem;
  border-radius: 10px;
  border: 2px solid var(--color-brand-500);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: end;

  /* large screen  */
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

function Order() {
  const { orderID } = useParams();
  const { orders } = useSelector((store) => store.order);
  const { currentAccount } = useSelector((store) => store.accounts);
  // console.log(orders);
  const order = orders?.find((o) => +o.orderID === +orderID);
  const orderItems = order?.orderObject;

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
          <div>
            <h3 style={{ fontWeight: "400" }}>We will deliver to:</h3>
            <strong style={{ fontSize: "2rem" }}>
              {currentAccount?.streetAddress}
            </strong>
          </div>
          <div>
            <p>ETA:</p>
            <strong style={{ fontSize: "2rem" }}>
              {new Date(
                new Date(order?.orderTime).getTime() + 30 * 60000
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </strong>
          </div>
        </TimeLeftUntilDelivery>
        {/* // ! 2/3 ORDER BREAKDOWN */}
        <H2>Order Summary</H2>
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
          <h4 style={{ fontWeight: "500" }}>
            To pay on delivery:
            <strong> {formatCurrency(order?.grandTotal)}</strong>
          </h4>
          {order.discount && (
            <h5 style={{ fontWeight: "500", textAlign: "right" }}>
              you saved <strong>{formatCurrency(order.discount)} </strong>
              on this order by being a returning customer
            </h5>
          )}
        </GrandTotalBreakdown>
      </OrderContainer>
    </FoodPage>
  );
}

export default Order;

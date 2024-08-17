import styled from "styled-components";
import { CiCircleChevDown } from "react-icons/ci";

import { Button } from "./ButtonUI";
import { formatDate } from "../helpers/helperFunctions";
import OrderItem from "./OrderItem";
import { useState } from "react";

const StyledOrder = styled.div`
  background-color: ;
  /* max-height: 20rem; */
  padding: 0.5rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 12rem 1rem;
  grid-template-rows: 3rem 1fr;
  align-items: end;
  justify-content: space-between;
  row-gap: 0.5rem;
  /* column-gap: 2rem; */

  background-color: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed === true
      ? "var(--color-grey-50)"
      : "var(--color-grey-100)"};
`;

const OrderItems = styled.div`
  /* width: 30%; */
`;

const GrandTotalDiv = styled.div`
  grid-column: 4/5;
  justify-self: end;
`;

const H3 = styled.h3``;
const H4 = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionDiv = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
  border-top: 2px solid black;
  padding-top: 0.6rem;
  display: flex;
  gap: 0.1rem;

  transition: all 0.4s ease-in-out;
  flex-direction: column;
`;

function Order({ order }) {
  const [isOrderCollapsed, setIsOrderCollapsed] = useState(true);

  console.log(order);

  return (
    <StyledOrder $isOrderCollapsed={isOrderCollapsed}>
      <H4> {formatDate(order.orderTime)}</H4>
      <H4>for {order.customerName}</H4>
      <GrandTotalDiv>
        <H4>total: ${order.grandTotal}</H4>
      </GrandTotalDiv>

      {isOrderCollapsed ? (
        <Button
          $className="small"
          onClick={() => setIsOrderCollapsed((s) => !s)}
        >
          &#11165;
        </Button>
      ) : (
        <Button
          $className="small"
          onClick={() => setIsOrderCollapsed((s) => !s)}
        >
          &#11167;
        </Button>
      )}
      {isOrderCollapsed && (
        <DescriptionDiv>
          {order.orderObject.map((item, i) => (
            <OrderItem key={order.orderID + i} item={item}></OrderItem>
          ))}
        </DescriptionDiv>
      )}
    </StyledOrder>
  );
}

export default Order;

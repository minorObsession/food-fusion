import styled from "styled-components";
import { CiCircleChevDown } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

import { Button } from "./ButtonUI";
import { formatDate } from "../helpers/helperFunctions";
import OrderItem from "./OrderItem";
import { useState } from "react";
import toast from "react-hot-toast";

const StyledOrder = styled.div`
  /* background-color: ; */
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
  flex-direction: column;
  /* Adding transition for smooth effect */
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;

  /* Using max-height to handle collapse and expand smoothly */
  max-height: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "0" : "1000px"};
  overflow: hidden;

  /* Handling opacity for smooth appearance */
  opacity: ${({ $isOrderCollapsed }) => ($isOrderCollapsed ? "0" : "1")};
`;

function Order({ order }) {
  const [isOrderCollapsed, setIsOrderCollapsed] = useState(true);

  // function to toggle the collapsed state
  function toggleOrderCollapse() {
    setIsOrderCollapsed((s) => !s);
  }

  // ! hover for description
  function showActionDescription(e) {
    console.log(e);
  }

  // ! mark order as finished
  function handleMarkAsCompleted() {}

  return (
    <StyledOrder $isOrderCollapsed={isOrderCollapsed}>
      <H4>{formatDate(order.orderTime)}</H4>
      <H4>for {order.customerName}</H4>
      <GrandTotalDiv>
        <H4>total: ${order.grandTotal}</H4>
      </GrandTotalDiv>

      {isOrderCollapsed ? (
        <Button $className="small" onClick={toggleOrderCollapse}>
          &#11167;
        </Button>
      ) : (
        <>
          <Button $className="small" onClick={toggleOrderCollapse}>
            &#11165;
          </Button>
          <Button
            onClick={handleMarkAsCompleted}
            onMouseEnter={showActionDescription}
            $className="small"
          >
            &#10004;
          </Button>
        </>
      )}

      <DescriptionDiv $isOrderCollapsed={isOrderCollapsed}>
        {order.orderObject.map((item, i) => (
          <OrderItem
            key={Math.random() + order.orderID + i}
            item={item}
          ></OrderItem>
        ))}
      </DescriptionDiv>
    </StyledOrder>
  );
}

export default Order;

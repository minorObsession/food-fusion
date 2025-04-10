import styled from "styled-components";

import { formatDate } from "../helpers/helperFunctions";
import OrderItem from "./OrderItem";
import { useRef, useState } from "react";
import { useScreenWidthPx } from "../hooks/useScreenWidthPx";

const StyledOrder = styled.article`
  padding: 0.5rem 1.5rem;
  font-size: 1.5rem;
  border-radius: 10px;

  display: grid;
  grid-template-columns: 5fr 5fr 3rem;
  justify-items: center;
  align-items: center;
  grid-template-rows: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "1fr" : "max-content 8fr"};

  background-color: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed === true
      ? "var(--color-grey-300)"
      : "var(--color-grey-200)"};

  &:hover {
    background-color: var(--color-grey-200);
    cursor: pointer;
  }
`;

const H4 = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "" : "translateY(20%)"};

  transition: all 0.4s ease-in-out;
`;

const DescriptionDiv = styled.div`
  width: 100%;
  grid-column: 1/-1;
  border-top: 2px solid black;

  margin-block-start: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "0" : "1rem"};
  padding-block-start: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "0" : "0.5rem"};

  display: flex;
  gap: 0.1rem;
  flex-direction: column;

  /* Adding transition for smooth effect */
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out,
    margin-block-start 0.5s ease-in-out, padding-block-start 0.5s ease-in-out;

  /* Using max-height to handle collapse and expand smoothly */
  max-height: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "0" : "1000px"};

  overflow: hidden;
  padding-bottom: ${({ $isOrderCollapsed }) =>
    $isOrderCollapsed ? "" : "0.5rem"};

  /* Handling opacity for smooth appearance */
  opacity: ${({ $isOrderCollapsed }) => ($isOrderCollapsed ? "0" : "1")};
`;

function Order({ order }) {
  const screenWidth = useScreenWidthPx();
  const [isOrderCollapsed, setIsOrderCollapsed] = useState(false);

  const btnRef = useRef(null);

  // function to toggle the collapsed state
  function toggleOrderCollapse() {
    setIsOrderCollapsed((s) => !s);
  }

  return (
    <StyledOrder
      $isOrderCollapsed={isOrderCollapsed}
      onClick={toggleOrderCollapse}
    >
      <H4 $isOrderCollapsed={isOrderCollapsed} style={{ justifySelf: "start" }}>
        {screenWidth > 480 && "Order"} #{order.orderID}
      </H4>
      <H4 $isOrderCollapsed={isOrderCollapsed}>
        {formatDate(order.orderTime, screenWidth < 768 && { time: "short" })}
      </H4>

      {/* // ! collapse/expandbuttons  */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          fontSize: "1.3rem",
        }}
      >
        {isOrderCollapsed ? (
          <button ref={btnRef} style={{ width: "3rem", height: "3rem" }}>
            &#11015;
          </button>
        ) : (
          <>
            <button ref={btnRef} style={{ width: "3rem", height: "3rem" }}>
              &#11014;
            </button>
          </>
        )}
      </div>

      <DescriptionDiv $isOrderCollapsed={isOrderCollapsed}>
        {order.orderObject.map((item, i) => (
          <OrderItem
            key={Math.random() + order.orderID + i}
            item={item}
            isOrderCollapsed
            isLastItem={i === order.orderObject.length - 1}
          />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid black",
            paddingBlockStart: "0.5rem",
          }}
        >
          <H4>for {capitalize(order.customerName)}</H4>
          <H4 style={{}}>total ${order.grandTotal}</H4>
        </div>
      </DescriptionDiv>
    </StyledOrder>
  );
}

export default Order;
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

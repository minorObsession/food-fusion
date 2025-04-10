import styled from "styled-components";

const StyledOrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px dotted black;

  ${({ isLastItem }) =>
    isLastItem &&
    `
border:none;
  `}
`;

const ItemName = styled.span`
  width: 40%;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const NumbersBreakdownDiv = styled.div`
  white-space: nowrap;
  justify-self: end;

  width: 13rem;
`;

const UnitPrice = styled.span``;
const UnitQuantity = styled.span``;

const TotalForItem = styled.span`
  font-weight: 500;
`;

function OrderItem({ item, isOrderCollapsed, isLastItem }) {
  return (
    <StyledOrderItem isLastItem={isLastItem}>
      <ItemName>{item.name}</ItemName>
      <NumbersBreakdownDiv $isOrderCollapsed={isOrderCollapsed}>
        <UnitQuantity>{item.quantity}&nbsp;x&nbsp;</UnitQuantity>
        <UnitPrice> ${item.unitPrice}</UnitPrice>
        <TotalForItem $isOrderCollapsed={isOrderCollapsed}>
          = ${item.quantity * item.unitPrice}
        </TotalForItem>
      </NumbersBreakdownDiv>
    </StyledOrderItem>
  );
}

export default OrderItem;

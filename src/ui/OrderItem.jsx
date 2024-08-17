import styled from "styled-components";

const StyledOrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-grow: 1; */
  /* gap: 2rem; */
`;

const NumbersBreakdownDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UnitPrice = styled.span`
  /* grid-column: 3; */
  /* justify-self: end; */
  /* width: 7%; */
`;
const UnitQuantity = styled.span`
  /* grid-column: 3; */
  /* justify-self: end; */
  /* width:1rem; */
`;

const TotalForItem = styled.span`
  font-weight: 500;
`;
const PriceQuantity = styled.div``;

function OrderItem({ item }) {
  // console.log(item);

  return (
    <StyledOrderItem>
      <span>{item.name}</span>
      <NumbersBreakdownDiv>
        <PriceQuantity>
          <UnitQuantity>{item.quantity} x </UnitQuantity>
          <UnitPrice>${item.unitPrice}</UnitPrice>
        </PriceQuantity>
        <TotalForItem> = ${item.quantity * item.unitPrice}</TotalForItem>
      </NumbersBreakdownDiv>
    </StyledOrderItem>
  );
  //  <div>{item.name}</div>
}

export default OrderItem;

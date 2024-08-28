import styled from "styled-components";
// import { Span } from "./Input";

const StyledFormRow = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  /* gap: 1rem; */
  grid-column: -1;

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

const Span = styled.span`
  font-weight: 600;
  width: 20rem;
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
`;

function FormRow({ children, span, errorMessage }) {
  return (
    <>
      <StyledFormRow>
        {span && <Span htmlFor={span}>{span}</Span>}

        {children}
      </StyledFormRow>
      {errorMessage && <Error>{errorMessage}</Error>}
    </>
  );
}

export default FormRow;

/* <Label htmlFor="password">Password</Label>; */

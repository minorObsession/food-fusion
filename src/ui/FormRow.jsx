import styled from "styled-components";
// import { Span } from "./Input";

const StyledFormRow = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
  /* flex-basis: 100%; */
  /* gap: 1rem; */
  /* grid-column: -1; */

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

const Span = styled.span`
  font-weight: 600;
  /* // ! don't remove */
  width: 20rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
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

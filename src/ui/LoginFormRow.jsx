import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  gap: 1rem;
  /* grid-column: span 2; */
  width: 70%;

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  text-align: start;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

{
  /* <Label htmlFor="password">Password</Label>; */
}
function LoginFormRow({ children, label, error }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={label}>{label}</Label>}

      {children}
      {error && <Error>{error.message}</Error>}
    </StyledFormRow>
  );
}

export default LoginFormRow;

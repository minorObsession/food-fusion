import styled from "styled-components";

const StyledFormRow = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  text-align: start;
`;

{
  /* <Label htmlFor="password">Password</Label>; */
}
function FormRow({ children, label, errors }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={label}>{label}</Label>}

      {children}
      {/* {errors} */}
    </StyledFormRow>
  );
}

export default FormRow;

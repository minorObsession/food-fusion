import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 1rem;
  box-shadow: var(--shadow-sm);
  width: ${({ $editInput }) => ($editInput === true ? "0.4" : "75%")};
  /* opacity: ; */

  filter: ${({ disabled }) => (disabled === true ? "grayscale(80%)" : "none")};
  opacity: ${({ disabled }) => (disabled === true ? "0.4" : "1")};

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    /* border: 5px var(--color-brand-900); */
    background-color: var(--color-grey-100);
    font-weight: 600;
  }
`;

export const Option = styled.option`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 1rem;
  box-shadow: var(--shadow-sm);
  width: 75%;
`;

export const Select = styled.select`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  /* padding: 0.2rem 1rem; */
  box-shadow: var(--shadow-sm);
`;

export const Span = styled.span`
  text-align: start;
  width: 10rem;
`;

// export default Input;

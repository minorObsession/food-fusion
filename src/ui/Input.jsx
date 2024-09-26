import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  padding: 0.2rem 1rem;
  box-shadow: var(--shadow-sm);
  width: ${({ $login }) => ($login === true ? "90%" : "75%")};
  line-height: 1.5;
  border-radius: var(--border-radius-md);
  filter: ${({ disabled }) => (disabled === true ? "grayscale(80%)" : "none")};

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    background-color: var(--color-grey-100);
    font-weight: 600;
    outline: 2px solid var(--color-brand-300);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  @media (min-width: 1024px) {
    line-height: 1.6;
  }
`;

export const Option = styled.option`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  padding: 0.3rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: 2px solid var(--color-brand-300);
    /* outline-offset: 2px;? */
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

export const Span = styled.span`
  grid-row: ${({ $ingSpan }) => ($ingSpan === true ? "3/5" : "")};

  text-align: start;
`;

// export default Input;

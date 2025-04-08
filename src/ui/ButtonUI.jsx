import styled, { css } from "styled-components";

export const Button = styled.button`
  /* Base styles */
  height: 4rem;
  width: fit-content;
  padding: 1rem 1.5rem;
  font-size: 1.3rem;
  /* letter-spacing: 0.8px; */

  color: var(--color-grey-50);
  font-weight: 800;
  background-color: var(--color-grey-500);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  text-transform: uppercase;
  align-self: flex-end;
  justify-self: flex-end;

  @media (min-width: 480px) {
    padding: 1.5rem 3rem;
    align-self: flex-end;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 3.5rem;
    align-self: flex-end;
  }
  /* Dynamically set properties */
  background-color: ${({ $className, value, $sortCriteria }) =>
    ($className === "main" && "var(--color-brand-500) !important ") ||
    ($className === "login" && "var(--color-grey-50) !important ") ||
    ($sortCriteria === value &&
      $className === undefined &&
      value !== undefined &&
      "var(--color-brand-500) !important ") ||
    "var(--color-brand-200)"};
  color: ${({ $className }) =>
    ($className === "main" && "var(--color-grey-900) !important ") ||
    ($className === "login" && "var(--color-grey-600) !important ") ||
    "inherit"};

  ${({ $className }) =>
    $className === "submitFormBtn" &&
    css`
      align-self: center;
      justify-self: flex-end;
      padding: 1.5rem 3rem;

      /* width: 80%; */
      background-color: var(--color-brand-300);
      &:hover {
        background-color: var(--color-brand-500);
      }

      @media (min-width: 480px) {
        align-self: center;
      }

      @media (min-width: 1024px) {
        align-self: center;
      }
    `}

  ${({ $className }) =>
    $className === "main" &&
    css`
      &:hover,
      &:active {
        background-color: var(--color-grey-100) !important;
      }
    `}

  ${({ $className }) =>
    $className === "small" &&
    css`
      width: 5rem;
      padding: 1.4rem;
      align-self: center;
      justify-self: flex-end;
      max-width: 10%;
      grid-column: 5 / span 2;
      border-radius: 20px;

      @media (min-width: 480px) {
        max-width: 10%;
        padding: 1.4rem;
        align-self: center;
      }

      @media (min-width: 1024px) {
        max-width: 10%;
        padding: 1.6rem;
        align-self: center;
      }
    `}

  ${({ $className }) =>
    $className === "backButton" &&
    css`
      width: 5rem;
      align-self: center;
      border-radius: 20px;

      @media (min-width: 480px) {
        align-self: center;
        padding: 1.8rem 7.5rem;
      }

      @media (min-width: 1024px) {
        align-self: center;
        padding: 1.8rem 10rem;
      }
    `}

  ${({ $className }) =>
    !$className ||
    ($className !== "submitFormBtn" &&
      $className !== "small" &&
      $className !== "signup" &&
      $className !== "login" &&
      $className !== "backButton" &&
      $className !== "main")
      ? css``
      : ``}
`;

function ButtonUI({ children, onClick, className, disabled, onMouseEnter }) {
  return (
    <Button
      onMouseEnter={onMouseEnter}
      $className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonUI;

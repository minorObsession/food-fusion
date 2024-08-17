import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ $className }) =>
    ($className === "signup" && "var(--color-brand-100) !important ") ||
    ($className === "login" && "var(--color-grey-50) !important ") ||
    "inherit"};
  color: ${({ $className }) =>
    ($className === "signup" && "var(--color-grey-800) !important ") ||
    ($className === "login" && "var(--color-grey-600) !important ") ||
    "inherit"};
  opacity: ${({ $className }) =>
    ($className === "signup" && " 0.6") ||
    ($className === "login" && " 0.6") ||
    "1"};

  border: ${({ $className }) =>
    $className === "signup" || $className === "login" ? "none" : "inherit"};

  font-weight: ${({ $className }) =>
    ($className === "signup" && "800") ||
    ($className === "login" && "700") ||
    "inherit"};

  border-radius: ${({ $className }) =>
    ($className === "signup" && "6px") ||
    ($className === "login" && "5px") ||
    "20px"};

  width: ${({ $className }) =>
    $className === "submitFormBtn" ? "2rem" : "5rem"};

  height: 3rem;
  font-size: 14px;
  padding: ${({ $className }) =>
    ($className === "small" ? "1.4rem " : "1.8rem 7rem") ||
    $className === "login" ||
    ($className === "signup" && "1.8rem 2rem")};

  letter-spacing: 0.8px;
  align-self: ${({ $className }) =>
    $className === "submitFormBtn" ||
    $className === "backButton" ||
    $className === "small"
      ? "center"
      : "flex-end"};
  justify-self: ${({ $className }) =>
    $className === "small" ? "flex-end" : "flex-end"};
  margin-top: ${({ $className }) =>
    $className === "submitFormBtn" ? "1rem" : "auto"};
  min-width: ${({ $className }) =>
    $className === "submitFormBtn" ? "80%" : "auto"};
  max-width: ${({ $className }) => ($className === "small" ? "10%" : "auto")};
  color: var(--color-grey-50);
  font-weight: 800;

  background-color: var(--color-grey-500);

  grid-column: ${({ $className }) =>
    $className === "small" ? "5 / span 2 " : ""};
  z-index: 2;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active {
    /* color: var(--color-grey-900);
    background-color: var(--color-brand-300); */
    opacity: ${({ $className }) =>
      ($className === "signup" && " 0.95") ||
      ($className === "login" && " 0.9") ||
      "1"};

    box-shadow: 0 0 10px var(--color-grey-700);
  }

  @media (min-width: 480px) {
    /* width: 10rem; */
    max-width: ${({ $className }) => ($className === "small" ? "10%" : "auto")};
    padding: ${({ $className }) =>
      $className === "small" ? "1.4rem " : "1.8rem 7rem"};
    align-self: ${({ $className }) =>
      $className === "submitFormBtn" ||
      $className === "backButton" ||
      $className === "small"
        ? "center"
        : "flex-end"};
  }

  @media (min-width: 1024px) {
    /* width: 12rem; */
    /* height: 3.5rem; */
    font-size: 16px;
    padding: ${({ $className }) =>
      $className === "small" ? "1.6rem " : "1.8rem 7rem"};
    max-width: ${({ $className }) => ($className === "small" ? "10%" : "auto")};

    align-self: ${({ $className }) =>
      $className === "submitFormBtn" ||
      $className === "backButton" ||
      $className === "small"
        ? "center"
        : "flex-end"};
  }
`;

function ButtonUI({ children, onClick, className, disabled }) {
  return (
    <Button $className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ButtonUI;

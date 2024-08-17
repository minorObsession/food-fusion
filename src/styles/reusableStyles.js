import styled from "styled-components";

export const H1 = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 2rem;

  margin-bottom: ${({ $foodPageTitle }) =>
    $foodPageTitle === true ? "8rem" : "2rem"};
`;

export const H2 = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const FoodPage = styled.div`
  width: 100vw;
  padding: 1rem;

  @media (min-width: 480px) {
    padding: 5rem;
  }
  @media (min-width: 1024px) {
    padding: 7rem;
  }

  background-color: var(--color-grey-100);
  overflow-y: scroll;
`;

export const FoodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const StyledFoodItem = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 2px dotted var(--color-brand-500);

  filter: ${({ $soldOut }) => ($soldOut === true ? "grayscale(80%)" : "none")};
  opacity: ${({ $soldOut }) => ($soldOut === true ? "0.4" : "1")};

  display: grid;
  column-gap: 1.5rem;
  row-gap: 2rem;
  grid-template-columns: 10rem auto;

  @media (min-width: 480px) {
    grid-template-columns: 12rem 30vw auto;
    column-gap: 2rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 15rem 6fr auto;
    column-gap: 4rem;
  }

  &:last-child {
    border: none;
  }
`;

export const Img = styled.img`
  width: 14rem;
  height: 9rem;
  border-radius: 1.5rem;
  display: inline;
  /* 
  @media (min-width: 480px) {
    width: 12rem;
    height: 9rem;
  } */

  @media (min-width: 1024px) {
    width: 18rem;
    height: 12rem;
  }
`;

export const NameIngPriceDiv = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.h2`
  text-align: left;
  font-size: 16px;
  font-weight: 600;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const Ingredients = styled.p`
  flex-grow: 1;
  font-style: italic;
  font-size: 12px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const Price = styled.span`
  align-self: flex-start;
  justify-self: flex-end;
  font-weight: 500;
  font-size: 15px;
`;

export const AddToCart = styled.button`
  width: 10rem;
  height: 3rem;
  font-size: 14px;
  padding: 1.8rem 7rem;
  background-color: var(--color-brand-200);
  font-weight: 600;
  letter-spacing: 0.8px;
  align-self: flex-end;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:visited {
    font-weight: 600;
    background-color: var(--color-brand-300);
  }

  @media (min-width: 480px) {
    /* padding: 2rem; */
  }

  @media (min-width: 1024px) {
    width: 12rem;
    height: 3.5rem;
    font-size: 16px;
    /* padding: 2rem; */
  }
`;

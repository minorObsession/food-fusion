import styled, { css } from "styled-components";

export const H1 = styled.h1`
  text-align: center;
  font-size: 3.5rem;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;
  hyphens: none;

  padding: ${({ $foodPageTitle }) =>
    $foodPageTitle === true ? "2rem" : "2rem"};

  @media (min-width: 480px) {
    /* padding: 3rem; */
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 1024px) {
    /* padding: 5rem; */
    font-size: 4.5rem;
    margin-bottom: 2rem;
  }
`;

export const H2 = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 3.2rem;
  margin-bottom: 1rem;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;
  hyphens: none;

  @media (min-width: 480px) {
    /* padding: 3rem; */
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 1024px) {
    /* padding: 5rem; */
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

export const FoodPage = styled.section`
  width: 100svw;
  height: 100svh;
  height: 100%;
  padding: 5rem 1rem;

  overflow: hidden;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;

  @media (min-width: 480px) {
    padding: 3rem;
    padding-top: 1rem;
  }

  @media (min-width: 1024px) {
  }

  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export const FoodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const StyledFoodItem = styled.article`
  width: 100%;
  // ! to prevent layout shift  on mobile landscape
  /* height: 20rem; */
  max-height: ${({ $isEditing }) => $isEditing && "fit-content"};
  padding-bottom: 2rem;
  border-bottom: 2px dotted var(--color-brand-500);

  filter: ${({ $soldOut }) => ($soldOut === true ? "grayscale(80%)" : "none")};
  opacity: ${({ $soldOut }) => ($soldOut === true ? "0.4" : "1")};

  display: grid;
  column-gap: 1.5rem;
  row-gap: 2rem;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 3fr 5rem;

  ${({ $isEditing }) =>
    $isEditing &&
    css`
      /* flex-direction: row; */
      height: auto;

      align-items: center;
      justify-content: center;
      grid-template-columns: 1fr !important;
      grid-template-rows: auto auto auto;
      margin: 0 auto;

      @media (min-width: 768px) {
        grid-template-columns: 1fr 2fr 1fr !important;
        grid-template-rows: 1fr;

        /* column-gap: 3rem; */
        /* grid-template-rows: 1fr; */
      }
      @media (min-width: 1024px) {
        /* grid-template-rows: 1fr; */
      }
    `}

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1.5fr;
    // ! was auto
    grid-template-rows: 1fr;
    column-gap: 2rem;
    align-self: end;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.5fr 1fr;
    /* column-gap: 3rem; */
    grid-template-rows: 1fr;
    /* height: auto; */
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr;
    /* column-gap: 4rem; */
  }
  @media (min-width: 1300px) {
    grid-template-columns: 1fr 3fr 1fr;
    column-gap: 4rem;
  }

  &:last-child {
    border: none;
  }
`;

export const Img = styled.img`
  /* width: 14rem; */
  width: clamp(8rem, 100%, 20rem);
  height: 10rem;
  /* max-height: 100%; */
  margin: 0 auto;
  border-radius: 1.5rem;
  display: inline;
  object-fit: cover;

  filter: grayscale(8%);

  transition: all 0.3s ease;

  @media (min-width: 480px) {
    height: 13rem;
  }

  @media (min-width: 768px) {
  }
`;

export const NameIngPriceDiv = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;

  transition: all 0.2s ease;

  ${({ $isEditing }) =>
    $isEditing &&
    css`
      grid-column: 1 / span 2;
      margin: 0 auto;

      @media (min-width: 768px) {
        grid-column: 2;
        margin: 0;
      }
      @media (min-width: 1024px) {
        grid-column: 2;
      }
    `}
`;

export const Name = styled.h2`
  text-align: left;
  font-size: 18px;
  font-weight: 700;

  @media (min-width: 480px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

export const Ingredients = styled.p`
  flex-grow: 1;
  font-style: italic;
  font-size: 12px;

  @media (min-width: 480px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const Price = styled.span`
  align-self: flex-start;
  justify-self: flex-end;
  font-weight: 600;
  font-size: 15px;

  @media (min-width: 480px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

// export const AddToCart = styled.button`
//   width: 10rem;
//   height: 3rem;
//   font-size: 14px;
//   padding: 1.8rem 7rem;
//   background-color: var(--color-brand-200);
//   font-weight: 600;
//   letter-spacing: 0.8px;
//   align-self: flex-end;
//   text-transform: uppercase;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:hover,
//   &:visited {
//     font-weight: 600;
//     background-color: var(--color-brand-300);
//   }

//   @media (min-width: 480px) {
//     /* padding: 2rem; */
//   }

//   @media (min-width: 1024px) {
//     width: 12rem;
//     height: 3.5rem;
//     font-size: 16px;
//     /* padding: 2rem; */
//   }
// `;

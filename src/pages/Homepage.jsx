import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { H1, H2 } from "../styles/reusableStyles";
import { useKeyPress } from "../helpers/useKeyPress";
import { useLocation } from "react-router";
import { useModalContext } from "../ui/useModalContext";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../helpers/helperFunctions";
import {
  fakeLogin,
  logIntoAccount,
  logOutOfAccount,
} from "../features/accountsSlice";

const StyledHomepage = styled.div`
  position: relative;
  width: 100vw;
  margin: 0 auto;
  padding: 5rem;

  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DIV = styled.div`
  position: ${({ $store }) => $store === true && "absolute"};
  top: ${({ $store }) => $store === true && "2rem"};
  right: ${({ $store }) => $store === true && "3rem"};
  padding-bottom: ${({ $title }) => $title === true && "3rem"};
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomepageBtn = styled.button`
  border: 2px solid var(--color-grey-300);

  padding: 1.7rem;

  &:active,
  &:focus {
    box-shadow: var(--shadow-md);
    background-color: var(--color-brand -500);
    font-weight: 600;
    outline: 2px solid var(--color-brand-300);
  }

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const DemoDiv = styled.div`
  position: absolute;
  bottom: 6rem;
  right: 6rem;
  background-color: var(--color-brand-100);
  color: var(--color-grey-900);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

// const DemoBtnAdmin = styled.button`
//   background-color: var(--color-brand-500);
//   color: var(--color-grey-900);
//   padding: 2.5rem 5rem;
//   border: none;
//   border-radius: var(--border-radius-md);
//   font-size: 2rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: var(--shadow-md);

//   &:hover {
//     background-color: var(--color-brand-600);
//     box-shadow: var(--shadow-lg);
//   }

//   &:active {
//     background-color: var(--color-brand-700);
//     transform: scale(0.98);
//   }
// `;

// const DemoBtnCustomer = styled.button`
//   background-color: var(--color-brand-500);
//   color: var(--color-grey-900);
//   padding: 2.5rem 5rem;
//   border: none;
//   border-radius: var(--border-radius-md);
//   font-size: 2rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: var(--shadow-md);

//   &:hover {
//     background-color: var(--color-brand-600);
//     box-shadow: var(--shadow-lg);
//   }

//   &:active {
//     background-color: var(--color-brand-700);
//     transform: scale(0.98);
//   }
// `;
const BaseButton = styled.button`
  background-color: var(--color-brand-500);
  color: var(--color-grey-900);
  padding: 2.5rem 5rem;
  width: 100%; /* Ensures all buttons take the same width */
  max-width: 80%; /* Optional: Set a maximum width for consistency */
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  text-align: center;

  &:hover {
    background-color: var(--color-brand-600);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    background-color: var(--color-brand-700);
    transform: scale(0.98);
  }
`;

const DemoBtnAdmin = styled(BaseButton)``;
const DemoBtnCustomer = styled(BaseButton)``;

function Homepage() {
  const { currentAccount } = useSelector((store) => store.accounts);

  const dispatch = useDispatch();

  function logOut() {
    const confirmLogout = confirm("are you sure?");
    setTimeout(() => {
      if (confirmLogout === true) dispatch(logOutOfAccount());
    }, 1000);
  }

  const {
    isOpenModalLoginC,
    isOpenModalLoginA,
    isOpenModalSignup,
    setIsOpenModalLoginC,
    setIsOpenModalLoginA,
    setIsOpenModalSignup,
  } = useModalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpenModalLoginA) {
      navigate("/loginAdmin");
    }
  }, [isOpenModalLoginA, navigate]);

  useEffect(() => {
    if (isOpenModalLoginC) {
      navigate("/loginCustomer");
    }
  }, [isOpenModalLoginC, navigate]);

  useEffect(() => {
    if (isOpenModalSignup) {
      navigate("/signup");
    }
  }, [isOpenModalSignup, navigate]);

  return (
    <StyledHomepage>
      {currentAccount && (
        <>
          {currentAccount.typeOfUser === "admin" && (
            <H2>Check upcoming orders</H2>
            // ! navLink for Orders
          )}
          {currentAccount.typeOfUser === "customer" && (
            <H2>Get back to ordering, {capitalize(currentAccount.username)}</H2>
            // ! navLink for ... ?
          )}

          <DIV $store={true}>
            <h3>{capitalize(currentAccount.username)}</h3>
            <HomepageBtn onClick={logOut}>LOGOUT</HomepageBtn>
          </DIV>
        </>
      )}
      {!currentAccount && (
        <>
          <DIV $title={true}>
            <H1>FOOD FUSION</H1>
            <H2>
              Fresh selections of mediterranean food, delivered right to your
              door!{" "}
            </H2>
          </DIV>
          <DIV>
            <H2>New customer?</H2>
            <HomepageBtn onClick={() => setIsOpenModalSignup(true)}>
              MAKE NEW ACCOUNT
            </HomepageBtn>
          </DIV>
          <DIV>
            <H2>Already have an account?</H2>
            <HomepageBtn onClick={() => setIsOpenModalLoginC(true)}>
              USER LOGIN
            </HomepageBtn>
          </DIV>
          <DIV $store={true}>
            <H2>Store member login</H2>
            <HomepageBtn onClick={() => setIsOpenModalLoginA(true)}>
              ADMIN LOGIN
            </HomepageBtn>
          </DIV>

          <DemoDiv>
            <H2>JUST WANT TO TEST THE APP?</H2>
            <DemoBtnAdmin
              onClick={() => {
                navigate("pizza");
                dispatch(
                  fakeLogin({
                    username: "admin",
                    password: "pass",
                  })
                );
              }}
            >
              DEMO ADMIN
            </DemoBtnAdmin>
            <DemoBtnCustomer
              onClick={() => {
                navigate("faq");
                dispatch(
                  fakeLogin({
                    username: "customer",
                    password: "passw",
                  })
                );
              }}
            >
              DEMO CUSTOMER
            </DemoBtnCustomer>
          </DemoDiv>
        </>
      )}
    </StyledHomepage>
  );
}

export default Homepage;

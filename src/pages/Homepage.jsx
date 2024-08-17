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
import { logOutOfAccount } from "../features/accountsSlice";

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
  padding: 1.7rem;
  font-weight: 600;
`;

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
            <h3>New customer?</h3>
            <HomepageBtn onClick={() => setIsOpenModalSignup(true)}>
              MAKE NEW ACCOUNT
            </HomepageBtn>
          </DIV>
          <DIV>
            <h3>Already have an account?</h3>
            <HomepageBtn onClick={() => setIsOpenModalLoginC(true)}>
              USER LOGIN
            </HomepageBtn>
          </DIV>
          <DIV $store={true}>
            <h3>Store member login</h3>
            <HomepageBtn onClick={() => setIsOpenModalLoginA(true)}>
              ADMIN LOGIN
            </HomepageBtn>
          </DIV>
        </>
      )}
    </StyledHomepage>
  );
}

export default Homepage;

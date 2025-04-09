import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { H1, H2 } from "../styles/reusableStyles";

import { useModalContext } from "../ui/useModalContext";
import { useDispatch, useSelector } from "react-redux";
import { capitalize, fakeCart } from "../helpers/helperFunctions";
import { fakeLogin, logOutOfAccount } from "../features/accountsSlice";
import { useScreenWidthPx } from "../hooks/useScreenWidthPx";
import { setCart } from "../features/cartSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";

const StyledHomepage = styled.div`
  position: relative;
  width: 100svw;
  height: 100svh;
  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 5rem;
  /* padding-bottom: 20rem; */
  /* padding-top: 7rem; */

  display: flex;
  gap: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 480px) {
    /* padding-top: 0; */
  }
`;

const DIV = styled.div`
  /* margin-bottom: 1rem; */

  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomepageBtn = styled.button`
  border: 2px solid var(--color-grey-300);
  font-size: 1.3rem;
  padding: 1.5rem;
  text-align: center;
  min-width: 100px;

  @media (min-width: 480px) {
    font-size: 1.5rem;
    padding: 1.6rem;
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
    padding: 1.8rem;
    min-width: 200px;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
    padding: 2rem 4rem;
  }
`;

function Homepage() {
  const { currentAccount } = useSelector((store) => store.accounts);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const screenSize = useScreenWidthPx();

  const [_, setAccountFromLS] = useLocalStorage(null, "currentAccount");

  function logOut() {
    const confirmLogout = confirm("are you sure?");
    setTimeout(() => {
      if (confirmLogout === true) {
        dispatch(logOutOfAccount());
        setAccountFromLS(null);
      }
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

  // ! sync account w redux state
  useEffect(() => {
    if (!currentAccount) return;
    console.log("settingAccountINLS...");
    setAccountFromLS({ ...currentAccount, cart: cart });
  }, [currentAccount, setAccountFromLS, cart]);

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
            <>
              <H2>
                Check upcoming orders, {capitalize(currentAccount.username)}{" "}
              </H2>
              <HomepageBtn>
                <NavLink to="/orders">VIEW ORDERS</NavLink>
              </HomepageBtn>
            </>
            // ! navLink for Orders
          )}
          {currentAccount.typeOfUser === "customer" && (
            <>
              <H2>
                Get back to ordering, {capitalize(currentAccount.username)}
                {/* // ! navLink for cart */}
              </H2>{" "}
              <HomepageBtn>
                <NavLink to="/cart">GO TO CART</NavLink>
              </HomepageBtn>{" "}
            </>
          )}

          <DIV $store={true}>
            <h3>{capitalize(currentAccount.typeOfUser)}</h3>
            <HomepageBtn onClick={logOut}>LOGOUT</HomepageBtn>
          </DIV>
        </>
      )}
      {!currentAccount && (
        <>
          <DIV $title={true}>
            <H1 style={{ whiteSpace: "nowrap" }}>FOOD FUSION</H1>
            {screenSize > 768 && (
              <H2 style={{ marginBottom: "3rem" }}>
                Fresh selections of mediterranean food, delivered right to your
                door!
              </H2>
            )}
          </DIV>
          <DIV>
            <H2>New customer?</H2>
            <HomepageBtn
              onClick={() => {
                setIsOpenModalSignup(true);
              }}
            >
              MAKE NEW ACCOUNT
            </HomepageBtn>
          </DIV>
          <DIV>
            <H2>Already have an account?</H2>
            <DIV style={{ flexDirection: "row" }}>
              <HomepageBtn
                onClick={() => {
                  setIsOpenModalLoginC(true);
                }}
              >
                USER LOGIN
              </HomepageBtn>
              <HomepageBtn
                onClick={() => {
                  dispatch(
                    fakeLogin({
                      username: "christina",
                      password: "passw",
                    })
                  );
                  dispatch(
                    setCart({
                      cart: fakeCart,
                    })
                  );
                }}
              >
                DEMO USER
              </HomepageBtn>
            </DIV>
          </DIV>
          <DIV $store={true}>
            <H2>Store member login</H2>
            <DIV style={{ flexDirection: "row" }}>
              <HomepageBtn
                onClick={() => {
                  setIsOpenModalLoginA(true);
                }}
              >
                ADMIN LOGIN
              </HomepageBtn>
              <HomepageBtn
                onClick={() => {
                  // navigate("pizza");
                  dispatch(
                    fakeLogin({
                      username: "michael",
                      password: "pass",
                    })
                  );
                }}
              >
                DEMO ADMIN
              </HomepageBtn>
            </DIV>
          </DIV>
        </>
      )}
    </StyledHomepage>
  );
}

export default Homepage;

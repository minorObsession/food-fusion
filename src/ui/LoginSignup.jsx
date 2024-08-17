import styled from "styled-components";
import ButtonUI, { Button } from "./ButtonUI";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StyledLoginSignupBox = styled.div`
  position: absolute;
  width: 50vw;
  top: 5%;
  left: 50%;

  transform: translate(-50%, -50%);

  @media (min-width: 480px) {
    opacity: 1;

    left: 75%;
  }
  @media (min-width: 1024px) {
    top: 7%;
    left: 85%;
  }

  display: flex;
  gap: 0.6rem;
`;

function LoginSignup() {
  const { currentAccount } = useSelector((store) => store.accounts);
  // if (isCurrentPageHomepage) return null;
  const location = useLocation();
  console.log(location);
  const pathname = location.pathname.length > 1;
  // console.log(pathname);
  // const [isHomepage, setIsHomepage] = useState();

  if (!pathname || currentAccount) return null;

  return (
    <StyledLoginSignupBox>
      <NavLink to="/loginCustomer">
        <Button $className="login">Log In</Button>
      </NavLink>
      <NavLink to="/signup">
        <Button $className="signup">Sign Up</Button>
      </NavLink>
    </StyledLoginSignupBox>
  );
}

export default LoginSignup;

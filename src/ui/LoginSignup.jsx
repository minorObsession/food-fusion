import styled from "styled-components";
import ButtonUI, { Button } from "./ButtonUI";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiRuler } from "react-icons/ci";

const StyledLoginSignupBox = styled.div`
  position: absolute;
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

  const location = useLocation();
  const pathname = location.pathname.length > 1;

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

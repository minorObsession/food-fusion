import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
("react-icons/md");
import { FiCoffee } from "react-icons/fi";
import { MdOutlineLocalPizza } from "react-icons/md";
import { LiaPastafarianismSolid } from "react-icons/lia";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BiFoodMenu } from "react-icons/bi";

import {
  IoCartOutline,
  IoNewspaperOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Span } from "./Input";
import { capitalize } from "../helpers/helperFunctions";
import { logOutOfAccount } from "../features/accountsSlice";

const StyledSidebar = styled.div`
  position: relative;
  background-color: var(--color-brand-200);

  padding: ${({ $collapsed }) =>
    $collapsed === true ? "15rem 1.5rem" : "15rem 5rem"};

  height: 100vh !important;
  max-width: 20%;
  border-right: 2px solid var(--color-grey-300);
  transition: all 0.15s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 480px) {
    /* max-width: 6vw; */
    padding: ${({ $collapsed }) =>
      $collapsed === true ? "15rem 2rem" : "15rem 8rem"};
  }

  @media (min-width: 1024px) {
    max-width: 15vw;
  }
`;

const LogoutBox = styled.div`
  position: absolute;
  bottom: 2%;
  right: ${({ $collapsed }) => ($collapsed === true ? "30%" : "10%")};

  display: flex;
  gap: 1rem;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const CollapseBtn = styled.button`
  position: absolute;
  top: 2%;

  right: ${({ $collapsed }) => ($collapsed === true ? "30%" : "10%")};
  border-radius: 50%;
  padding: 1.5rem;
  color: var(--color-grey-50);
  width: 3rem;
  /* height: 3rem; */
  background-color: var(--color-grey-500);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutBtn = styled.button`
  border-radius: 50%;
  color: var(--color-grey-50);
  width: 3rem;
  /* height: 3rem; */
  background-color: var(--color-grey-500);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 500;

  display: flex;
  align-items: center;
  border-radius: var(--border-radius-lg);
  padding: 0.5rem 1rem;

  &:hover,
  &:visited {
    font-weight: 600;
    background-color: var(--color-brand-500);
  }

  &.active {
    font-weight: 700;
    background-color: var(--color-grey-500);
    color: var(--color-grey-50);
  }
`;

const UsernameSidebar = styled.span`
  position: absolute;
  bottom: 7rem;

  right: ${({ $collapsed }) => ($collapsed === true ? "50%" : "")};
  font-style: italic;
  font-weight: 600;
`;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const { currentAccount, accounts } = useSelector((store) => store.accounts);
  // console.log(accounts);
  const dispatch = useDispatch();

  function logOut() {
    const confirmLogout = confirm("are you sure?");
    setTimeout(() => {
      if (confirmLogout === true) dispatch(logOutOfAccount());
    }, 1000);
  }

  return (
    <StyledSidebar $collapsed={collapsed}>
      {currentAccount &&
        (collapsed ? (
          <UsernameSidebar>
            {capitalize(currentAccount.username)}
          </UsernameSidebar>
        ) : (
          <UsernameSidebar>
            {capitalize(currentAccount.username)}
          </UsernameSidebar>
        ))}
      <CollapseBtn onClick={() => setCollapsed((s) => !s)}>
        {collapsed ? ">" : "<"}
      </CollapseBtn>

      <StyledNavLink to="/">
        {collapsed ? <IoHomeOutline /> : "Home"}
      </StyledNavLink>
      <StyledNavLink to="pizza">
        {collapsed ? <MdOutlineLocalPizza /> : "Pizza"}
      </StyledNavLink>

      <StyledNavLink to="pasta">
        {collapsed ? <LiaPastafarianismSolid /> : "Pasta"}
      </StyledNavLink>

      <StyledNavLink to="mediterranean">
        {collapsed ? <BiFoodMenu /> : "Mediterranean"}
      </StyledNavLink>

      {currentAccount?.typeOfUser === "customer" && (
        <StyledNavLink to="cart">
          {collapsed ? <IoCartOutline /> : "Cart"}
        </StyledNavLink>
      )}
      {currentAccount?.typeOfUser === "admin" && (
        <StyledNavLink to="orders">
          {collapsed ? <IoNewspaperOutline /> : "Orders"}
        </StyledNavLink>
      )}

      {currentAccount && (
        <LogoutBox>
          <LogoutBox>
            {collapsed || <span>Logout</span>}
            <LogoutBtn onClick={logOut}>
              <RiLogoutBoxLine />
            </LogoutBtn>
          </LogoutBox>
        </LogoutBox>
      )}
    </StyledSidebar>
  );
}

export default Sidebar;

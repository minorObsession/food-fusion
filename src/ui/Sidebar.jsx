import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineLocalPizza } from "react-icons/md";
import { LiaPastafarianismSolid } from "react-icons/lia";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BiFoodMenu } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa6";
import {
  IoCartOutline,
  IoNewspaperOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../helpers/helperFunctions";
import { logOutOfAccount } from "../features/accountsSlice";

const StyledSidebar = styled.nav`
  /* display: flex; */
  position: fixed;
  top: 0;
  left: 0;
  height: 100svh;
  width: ${({ $collapsed }) => ($collapsed ? "8rem" : "23rem")};
  background-color: var(--color-brand-200);
  border-right: 2px solid var(--color-grey-300);
  padding: 2rem;
  z-index: 500;
  transition: width 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 480px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 5rem;
    z-index: 600;
    /* padding: 1rem; */
    padding: 0;
    flex-direction: row;
    justify-content: space-around;
    gap: 0rem;
  }
`;

const LogoutBox = styled.div`
  position: absolute;
  bottom: 2%;
  right: ${({ $collapsed }) => ($collapsed ? "30%" : "10%")};
  display: flex;
  gap: 1rem;
  opacity: 1;
  align-items: center;
  opacity: ${({ $collapsed }) => ($collapsed ? "0" : "1")};

  transition: opacity 0.8s ease, max-width 0.8s ease, margin-left 0.8s ease;

  &:hover {
    cursor: pointer;
  }
`;

const CollapseBtn = styled.button`
  position: absolute;
  top: 2%;
  right: ${({ $collapsed }) => ($collapsed ? "25%" : "10%")};
  border-radius: 50%;
  padding: 1.5rem;
  color: var(--color-grey-50);
  width: 3rem;
  background-color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 600;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-lg);
  padding: 0.5rem 1rem;
  transition: width 0.5s ease-in-out, color 0.3s ease;
  overflow: hidden;
  width: ${({ $collapsed }) => ($collapsed ? "4rem" : "100%")};
  position: relative;

  svg {
    font-size: 2rem;
    min-width: 2rem;
    transition: transform 0.3s ease-in-out;
    /* Icon moves from center to left when expanded */
    transform: translateX(
      ${({ $collapsed }) => ($collapsed ? "0" : "-0.5rem")}
    );
    position: relative;
    z-index: 1;
  }

  span {
    white-space: nowrap;
    opacity: ${({ $collapsed }) => ($collapsed ? "0" : "1")};
    max-width: ${({ $collapsed }) => ($collapsed ? "0" : "150px")};
    overflow: hidden;
    transition: opacity 0.2s ease-in-out, max-width 0.3s ease-in-out;
    transition-delay: ${({ $collapsed }) => ($collapsed ? "0s" : "0.05s")};
    margin-left: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 4rem;

    span {
      display: none;
    }
  }

  &:hover,
  &:visited {
    font-weight: 600;
    background-color: var(--color-brand-500);
  }

  &.active {
    font-weight: 800;
    background-color: var(--color-grey-500);
    color: var(--color-grey-50);
  }
`;
const UsernameSidebar = styled.span`
  position: absolute;
  bottom: 7rem;
  font-style: italic;
  font-weight: 600;
  /* white-space: nowrap; */
  text-align: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
  width: ${({ $collapsed }) => ($collapsed ? "fit-content" : "auto")};
  opacity: 1;
  opacity: ${({ $collapsed }) => ($collapsed ? "0" : "1")};

  transition: opacity 0.2s
      ${({ $collapsed }) => ($collapsed ? "ease" : "ease 0.2s")},
    max-width 0.3s ease, margin-left 0.3s ease;
`;

const LogoutBtn = styled.button`
  border-radius: 50%;
  color: var(--color-grey-50);
  width: 3rem;
  background-color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const { currentAccount } = useSelector((store) => store.accounts);
  const dispatch = useDispatch();

  function logOut() {
    const confirmLogout = confirm("are you sure?");
    setTimeout(() => {
      if (confirmLogout === true) dispatch(logOutOfAccount());
    }, 1000);
  }
  const handleNavLinkClick = () => {
    setCollapsed(true);
  };

  return (
    <StyledSidebar id="sidebar" $collapsed={collapsed}>
      {currentAccount && (
        <UsernameSidebar $collapsed={collapsed}>
          {collapsed
            ? capitalize(currentAccount.username)[0]
            : capitalize(currentAccount.username)}
        </UsernameSidebar>
      )}

      <CollapseBtn
        $collapsed={collapsed}
        onClick={(e) => {
          setCollapsed((s) => !s);
          e.currentTarget.blur();
        }}
      >
        {collapsed ? ">" : "<"}
      </CollapseBtn>

      <StyledNavLink onClick={handleNavLinkClick} to="/" $collapsed={collapsed}>
        <IoHomeOutline />
        <span>Home</span>
      </StyledNavLink>

      <StyledNavLink
        onClick={handleNavLinkClick}
        to="pizza"
        $collapsed={collapsed}
      >
        <MdOutlineLocalPizza />
        <span>Pizza</span>
      </StyledNavLink>

      <StyledNavLink
        onClick={handleNavLinkClick}
        to="pasta"
        $collapsed={collapsed}
      >
        <LiaPastafarianismSolid />
        <span>Pasta</span>
      </StyledNavLink>

      <StyledNavLink
        onClick={handleNavLinkClick}
        to="mediterranean"
        $collapsed={collapsed}
      >
        <BiFoodMenu />
        <span>Mediterranean</span>
      </StyledNavLink>

      {currentAccount?.typeOfUser === "customer" && (
        <StyledNavLink
          onClick={handleNavLinkClick}
          to="faq"
          $collapsed={collapsed}
        >
          <FaQuestion />
          <span>FAQ</span>
        </StyledNavLink>
      )}

      {currentAccount?.typeOfUser === "customer" && (
        <StyledNavLink to="cart" $collapsed={collapsed}>
          <IoCartOutline />
          <span>Cart</span>
        </StyledNavLink>
      )}

      {currentAccount?.typeOfUser === "admin" && (
        <StyledNavLink to="orders" $collapsed={collapsed}>
          <IoNewspaperOutline />
          <span>Orders</span>
        </StyledNavLink>
      )}

      {currentAccount && (
        <LogoutBox $collapsed={collapsed}>
          <span
            style={{
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : "100px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "opacity 0.1s ease, max-width 0.3s ease",
            }}
          >
            Logout
          </span>
          <LogoutBtn onClick={logOut}>
            <RiLogoutBoxLine />
          </LogoutBtn>
        </LogoutBox>
      )}
    </StyledSidebar>
  );
}

export default Sidebar;

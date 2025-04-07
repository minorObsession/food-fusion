import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledMain = styled.main`
  display: flex;
  width: 100%;

  transition: margin-left 0.3s ease;

  @media (min-width: 480px) {
    padding-left: 8rem;
  }
  padding-top: 2rem;
`;

function Main() {
  const [sidebarWidth, setSidebarWidth] = useState(0);

  return (
    <StyledMain $sidebarWidth={sidebarWidth}>
      <Outlet />
    </StyledMain>
  );
}

export default Main;

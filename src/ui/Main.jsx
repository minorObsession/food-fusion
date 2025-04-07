import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  width: 100vw;

  transition: margin-left 0.3s ease;

  @media (min-width: 480px) {
    padding-left: 8rem;
  }
  padding-top: 2rem;
`;

function Main() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default Main;

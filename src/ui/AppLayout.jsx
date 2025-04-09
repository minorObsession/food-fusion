import styled from "styled-components";
import Main from "./Main";
import Sidebar from "./Sidebar";
import LoginSignup from "./LoginSignup";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100svh;
  width: 100svw;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Main />
    </StyledAppLayout>
  );
}

export default AppLayout;

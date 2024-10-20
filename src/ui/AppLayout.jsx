import styled from "styled-components";
import Main from "./Main";
import Sidebar from "./Sidebar";
import LoginSignup from "./LoginSignup";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      {/* <LoginSignup /> */}
      <Main />
    </StyledAppLayout>
  );
}

export default AppLayout;

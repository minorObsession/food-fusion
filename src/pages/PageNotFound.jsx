import styled from "styled-components";
import BackButton from "../ui/BackButton";

const DIV = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 18px;

  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function PageNotFound() {
  return (
    <DIV>
      <p>Page was not found ): </p>
      <BackButton $className="backButton" />
    </DIV>
  );
}

export default PageNotFound;

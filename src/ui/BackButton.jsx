import { useNavigate } from "react-router-dom";
import { Button } from "./ButtonUI";
function BackButton({ $className }) {
  const navigate = useNavigate();
  return (
    <Button $className={$className} onClick={() => navigate(-1)}>
      {" "}
      &larr; Go back{" "}
    </Button>
  );
}

export default BackButton;

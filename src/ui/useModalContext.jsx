import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useKeyPress } from "../helpers/useKeyPress";
import { useNavigate } from "react-router-dom";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpenModalLoginC, setIsOpenModalLoginC] = useState(false);
  const [isOpenModalLoginA, setIsOpenModalLoginA] = useState(false);
  const [isOpenModalSignup, setIsOpenModalSignup] = useState(false);

  const navigate = useNavigate();

  function closeAnyModal() {
    setIsOpenModalLoginC(false);
    setIsOpenModalLoginA(false);
    setIsOpenModalSignup(false);
    navigate(-1);
  }

  const isAnyModalOpen =
    isOpenModalLoginC ||
    isOpenModalSignup ||
    isOpenModalLoginA ||
    window.location.pathname === "/loginCustomer" ||
    window.location.pathname === "/loginAdmin" ||
    window.location.pathname === "/signup";

  useKeyPress("Escape", () => {
    if (!isAnyModalOpen) return;
    else {
      closeAnyModal();
      navigate("/");
    }
  });

  // ! hide sidebar when opening modals
  useEffect(() => {
    const sidebarEl = document.getElementById("sidebar");

    if (isAnyModalOpen) sidebarEl.style.opacity = 0;
    else sidebarEl.style.opacity = 1;
  });

  return (
    <ModalContext.Provider
      value={{
        closeAnyModal,
        isAnyModalOpen,
        isOpenModalLoginC,
        isOpenModalLoginA,
        isOpenModalSignup,
        setIsOpenModalLoginC,
        setIsOpenModalLoginA,
        setIsOpenModalSignup,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}

import { createContext, useContext, useState, useCallback } from "react";
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
    isOpenModalLoginC || isOpenModalSignup || isOpenModalLoginA;

  useKeyPress("Escape", () => {
    if (!isAnyModalOpen) return;
    else {
      closeAnyModal();
      navigate("/");
    }
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

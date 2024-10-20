import styled from "styled-components";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";

import ButtonUI from "./ButtonUI";
import LoginFormRow from "./LoginFormRow";
import { Input, Option, Select, Span } from "./Input";
import { getPosition } from "../helpers/helperFunctions";
import { createNewAccount } from "../services/apiAccounts";
import { logIntoAccount, newAccount } from "../features/accountsSlice";
import { useModalContext } from "./useModalContext";

// prettier-ignore
const states = [
  "--",
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35); // Dark semi-transparent background
  backdrop-filter: blur(5px); // Apply blur effect
  z-index: 1; // Ensure it's on top of other content
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormLogin = styled.form`
  position: relative;
  width: 70%;
  /* height: 0%; */
  height: 60%;
  padding: 2rem;
  background-color: rgba(255, 236, 153, 0.85);
  border-radius: 12px;
  text-align: center;
  overflow: hidden;
  box-shadow: 5px 5px 15px var(--color-grey-400);

  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 1024px) {
    width: 40%;
    height: 70%;
    padding: 3rem;
  }
`;

const FormSignup = styled.form`
  position: relative;
  width: 90%;
  height: 80%;
  background-color: rgba(255, 236, 153, 0.85);
  border-radius: 12px;
  text-align: center;
  overflow-y: scroll;
  box-shadow: 5px 5px 15px var(--color-grey-400);

  display: flex;
  gap: 3rem;

  @media (min-width: 1024px) {
    width: 60%;
    height: 80%;
  }
`;

const Div = styled.div`
  padding-bottom: 2rem;
  width: 75%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 1024px) {
    /* // ? when signup form uses this div - padding-top 10rem */
    padding-top: ${({ $login }) => ($login === true ? "0rem" : "10rem")};

    width: 70%;
    gap: 1.5rem;
  }
`;

const SmallerDiv = styled.div`
  width: 75%;
  /* font-size: 16px; */
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: ${({ $checkbox }) =>
    $checkbox === true ? "space-around" : "space-between"};

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  text-align: center;
`;

const GetPositionButton = styled.button`
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.9rem;
  font-size: 1.3rem;
  font-weight: 600;
  border: 2px solid;
  white-space: nowrap;
`;

const ClearButton = styled.button`
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.5rem;
  font-size: 1.1rem;
  border: 1.2px solid;
  white-space: nowrap;
`;

const AdminCheckbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 4px;
  border: 2px solid var(--color-grey-500);
  background-color: var(--color-grey-200);
  cursor: pointer;
  appearance: none;

  &:checked {
    background-color: var(--color-brand-500);
    border-color: var(--color-primary);
  }

  &:hover {
    background-color: var(--color-brand-300);
  }
  &:focus {
    outline: 2px solid var(--color-brand-300);
  }
`;

function Modal({
  type = "loginCustomer",
  // closeAnyModal,
  isAnyModalOpen = true,
  navigate,
  location,
}) {
  const [currentAddress, setCurrentAddress] = useState(null);
  const { closeAnyModal } = useModalContext();

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createAccount, isLoading: isSubmitting } = useMutation({
    mutationFn: createNewAccount,
    onSuccess: () => {
      toast.success("account successfully created");
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  async function handleGetCurrentCity(e) {
    e.preventDefault();
    try {
      const address = await getPosition();
      console.log(address);
      setCurrentAddress(address);
    } catch (err) {
      console.error("Error getting current city:", err);
    }
  }

  function handleInputReset(e) {
    e.preventDefault();
    setCurrentAddress(null);
  }

  function onLoginFormSubmit(data) {
    reset();

    closeAnyModal();
    dispatch(logIntoAccount(data));
    // navigate();
    // ! clear inputs and close form
  }

  function onSignupFormSubmit(data) {
    const preparedData = {
      ...data,
      typeOfUser: data.typeOfUser === false ? "customer" : "admin",
    };

    createAccount(preparedData);

    dispatch(newAccount(preparedData));
  }

  function onError(err) {
    console.log("error", err);
  }

  useEffect(() => {
    function clickOutsideToCloseModal(e) {
      if (!isAnyModalOpen) return;

      if (e.target.closest("form") !== null) return;
      else closeAnyModal();
    }

    if (isAnyModalOpen) {
      document.addEventListener("mousedown", clickOutsideToCloseModal);
    }

    return () =>
      document.removeEventListener("mousedown", clickOutsideToCloseModal);
  }, [closeAnyModal, isAnyModalOpen]);

  // ! autofocus on username field
  useEffect(() => {
    document.getElementById("username").focus();
  }, []);

  if (type === "loginCustomer")
    return (
      <Overlay>
        <FormLogin onSubmit={handleSubmit(onLoginFormSubmit, onError)}>
          <Div $login={true}>
            <H2>Log back into your account</H2>
            <LoginFormRow label="username">
              <Input
                $login={true}
                type="text"
                id="username"
                {...register("username", {
                  required: "required field",
                })}
              ></Input>
            </LoginFormRow>
            <LoginFormRow label="password">
              <Input
                $login={true}
                type="password"
                id="password"
                {...register("password", {
                  required: "required field",
                })}
              ></Input>
            </LoginFormRow>
          </Div>
          <ButtonUI disabled={false}>LOG IN</ButtonUI>
        </FormLogin>
      </Overlay>
    );

  if (type === "loginAdmin")
    return (
      <Overlay>
        <FormLogin onSubmit={handleSubmit(onLoginFormSubmit, onError)}>
          <Div $login={true}>
            <H2>Log back into your account</H2>
            <LoginFormRow label="username">
              <Input
                $login={true}
                type="text"
                id="username"
                {...register("username", {
                  required: "required field",
                })}
              ></Input>
            </LoginFormRow>
            <LoginFormRow label="password">
              <Input
                $login={true}
                type="password"
                id="password"
                {...register("password", {
                  required: "required field",
                })}
              ></Input>
            </LoginFormRow>
          </Div>
          <ButtonUI disabled={false}>LOG IN</ButtonUI>
        </FormLogin>
      </Overlay>
    );

  if (type === "signup")
    return (
      <Overlay>
        <FormSignup onSubmit={handleSubmit(onSignupFormSubmit, onError)}>
          <Div>
            <p></p>
            <p></p>
            <p></p>

            <p></p>
            <p></p>
            <p></p>
            <H2>Let&apos;s get you set up!</H2>
            <Label htmlFor="username">Choose username</Label>
            <Input
              type="text"
              id="username"
              {...register("username", {
                required: "required field",
              })}
            ></Input>
            <Label htmlFor="password">Choose password</Label>
            <Input
              type="text"
              id="password"
              {...register("password", {
                required: "required field",
              })}
            ></Input>
            <SmallerDiv $checkbox={true}>
              <Label htmlFor="accountType">Store admin? </Label>
              <AdminCheckbox
                type="checkbox"
                value="admin"
                id="accountType"
                {...register("typeOfUser", {})}
              ></AdminCheckbox>
            </SmallerDiv>
            {/* // ! ADDRESS */}
            <SmallerDiv>
              <Label>Delivery address</Label>
              {currentAddress && (
                <ClearButton onClick={(e) => handleInputReset(e)}>
                  Clear
                </ClearButton>
              )}
              <GetPositionButton onClick={handleGetCurrentCity}>
                Get Position
              </GetPositionButton>
            </SmallerDiv>

            <SmallerDiv>
              <Label htmlFor="streetAddress">Street address</Label>
              <Input
                type="text"
                placeholder="e.g. 123 Main street"
                id="streetAddress"
                {...register("streetAddress", {
                  required: "required field",
                })}
              />
            </SmallerDiv>
            <SmallerDiv>
              <Label htmlFor="city">City</Label>
              <Input
                defaultValue={currentAddress?.city || ""}
                type="address"
                placeholder="city"
                id="city"
                {...register("city", {
                  required: "required field",
                })}
              />
            </SmallerDiv>
            <SmallerDiv>
              <Label>State</Label>
              <Select defaultValue={currentAddress?.state}>
                {states.map((s) => (
                  <Option key={s}>{currentAddress?.state || s}</Option>
                ))}
              </Select>
              <Label htmlFor="zipCode">Zip code</Label>
              <Input
                defaultValue={currentAddress?.zipCode || ""}
                type="number"
                placeholder="Zip code"
                id="zipCode"
                {...register("zipCode", {
                  required: "required field",
                })}
              />
            </SmallerDiv>
            <ButtonUI disabled={isSubmitting} className="submitFormBtn">
              DONE
            </ButtonUI>
          </Div>
        </FormSignup>
      </Overlay>
    );
}

export default Modal;

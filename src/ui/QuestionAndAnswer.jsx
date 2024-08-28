import { IoArrowDownCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import { H2 } from "../styles/reusableStyles";
import { useEffect, useRef } from "react";

const QuestionAnswerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: 5px 7px 15px var(--color-grey-400);

  transition: all 0.5s ease-in-out;

  &:hover,
  &:active {
    background-color: var(--color-grey-200);
  }
`;

const Question = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Answer = styled.div`
  padding: 1rem 3rem;
  text-align: start;
  max-height: ${({ $isExpanded }) => ($isExpanded ? "200px" : "0px")};
  opacity: ${({ $isExpanded }) => ($isExpanded ? "1" : "0")};
  transition: all 0.3s ease-in-out;
`;

function QuestionAndAnswer({
  question,
  answer,
  id,
  isQExpanded,
  setExpandedQuestionID,
}) {
  function handleToggleExpand() {
    setExpandedQuestionID((prevState) => (prevState === id ? null : id));
  }

  const questionRef = useRef(null);

  useEffect(() => {
    if (isQExpanded && questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isQExpanded]);

  return (
    <QuestionAnswerDiv>
      <Question onClick={handleToggleExpand} ref={questionRef}>
        <H2>{question}</H2>

        <IoArrowDownCircleSharp
          size="4rem"
          style={{
            cursor: "pointer",
            fill: "var(--color-brand-500)",
            transform: isQExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
          }}
        />
      </Question>
      <Answer $isExpanded={isQExpanded}>{answer}</Answer>
    </QuestionAnswerDiv>
  );
}

export default QuestionAndAnswer;

import { useState } from "react";
import styled from "styled-components";
import { FoodPage, H1 } from "../styles/reusableStyles";
import QuestionAndAnswer from "../ui/QuestionAndAnswer";

const Accordion = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 5px 7px 28px var(--color-grey-500);
  border-radius: 18px;
  padding: 1rem;

  @media (min-width: 480px) {
    /* width: 60vw; */
    padding: 2rem;
  }
  @media (min-width: 768px) {
    width: 75vw;
    padding: 3rem;
  }
  @media (min-width: 1024px) {
    width: 70vw;
  }
`;

const questions = [
  {
    question: "What kinds of food do you offer?",
    answer:
      "FoodFusion offers a variety of delicious mediterranean food and wood-owen pizzas!",
    id: 1465,
  },
  {
    question: "Do you charge a delivery fee?",
    answer:
      "All orders above $50 get free delivery! Smaller orders have a $5 delivery charge",
    id: 2465,
  },
  {
    question: "Any discounts for return customers?",
    answer:
      "Absolutely! Every additional order receives a 5% discount.. YES, there will be a 50% discount on your 11th order",
    id: 3684,
  },
  {
    question: "What kinds of food do you offer?",
    answer:
      "FoodFusion offers a variety of delicious mediterranean food and wood-owen pizzas!",
    id: 1465345,
  },
  {
    question: "Do you charge a delivery fee?",
    answer:
      "All orders above $50 get free delivery! Smaller orders have a $5 delivery charge",
    id: 2465345,
  },
  {
    question: "Any discounts for return customers?",
    answer:
      "Absolutely! Every additional order receives a 5% discount.. YES, there will be a 50% discount on your 11th order",
    id: 368443,
  },
  {
    question: "What kinds of food do you offer?",
    answer:
      "FoodFusion offers a variety of delicious mediterranean food and wood-owen pizzas!",
    id: 1464535,
  },
  {
    question: "Do you charge a delivery fee?",
    answer:
      "All orders above $50 get free delivery! Smaller orders have a $5 delivery charge",
    id: 2464535,
  },
  {
    question: "Any discounts for return customers?",
    answer:
      "Absolutely! Every additional order receives a 5% discount.. YES, there will be a 50% discount on your 11th order",
    id: 36453584,
  },
];

function FAQ() {
  //
  const [expandedQuestionID, setExpandedQuestionID] = useState(null);

  return (
    <FoodPage>
      <H1>Frequently Asked Questions</H1>
      <Accordion>
        {questions.map((q) => (
          <QuestionAndAnswer
            key={q.id}
            id={q.id}
            question={q.question}
            answer={q.answer}
            setExpandedQuestionID={setExpandedQuestionID}
            isQExpanded={q.id === expandedQuestionID}
          />
        ))}
      </Accordion>
    </FoodPage>
  );
}

export default FAQ;

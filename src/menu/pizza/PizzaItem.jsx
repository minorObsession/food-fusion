import { useDispatch, useSelector } from "react-redux";

import FoodItem from "../../ui/FoodItem";

function PizzaItem({ pizza }) {
  const { cart } = useSelector((store) => store.cart);

  return <FoodItem foodType={pizza} />;
  // return (
  //   <StyledFoodItem $soldOut={soldOut}>
  //     <Img src={image} alt={`image of ${name}`} />
  //     <NameIngPriceDiv>
  //       <Name>{name}</Name>
  //       <Ingredients>{ingredients.join(", ")}</Ingredients>
  //       <Price>${unitPrice}</Price>
  //     </NameIngPriceDiv>
  //     {!soldOut && (
  //       <ButtonUI onClick={() => dispatch(addItemToCart(pizza))}>
  //         Add to cart
  //       </ButtonUI>
  //     )}
  //   </StyledFoodItem>
  // );
}

export default PizzaItem;

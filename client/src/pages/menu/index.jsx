import { useGetProducts } from "../../hooks/useGetProducts";

//Components
import DishCard from "./DishCard";
import { Box, Container } from "@mui/material";
import { DrawerDesktop } from "./DrawerDesktop";
import { DrawerPhone } from "./DrawerPhone";

//Style
import * as Styled from "./style";

export default function Menu() {
  const { products } = useGetProducts();
  return (
    <Container maxWidth={false} disableGutters>
      <HeaderHero />
      <DrawerDesktop />
      <Container maxWidth={"xl"}>
        <Box paddingY={3} sx={Styled.DishCardList}>
          {products && products.map(product => (<DishCard key={product._id} product={product}/>))}
        </Box>
        <DrawerPhone />
      </Container>
    </Container>
  );
}

function HeaderHero() {
  return <Box sx={Styled.HeaderHero} />;
}

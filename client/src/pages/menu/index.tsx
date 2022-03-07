import { useFetchProductsQuery } from "../../features/api/apiSlice";

//Components
import DishCard from "./DishCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DrawerDesktop } from "./DrawerDesktop";
import { DrawerPhone } from "./DrawerPhone";

// Styles
import * as Styled from "./style";
import CircularProgress from "@mui/material/CircularProgress";

export default function Menu() {
  const { data: products = [], isLoading, error } = useFetchProductsQuery();

  return (
    <Container maxWidth={false} disableGutters>
      <HeaderHero />
      <DrawerDesktop />
      <Container maxWidth={"xl"}>
        {isLoading && <CircularProgress />}
        {error && <p>There was an error loading the products</p>}
        <Box paddingY={3} sx={Styled.DishCardList}>
          {products &&
            products.map((product) => (
              <DishCard key={product._id} product={product} />
            ))}
        </Box>
        <DrawerPhone />
      </Container>
    </Container>
  );
}

function HeaderHero() {
  return <Box sx={Styled.HeaderHero} />;
}

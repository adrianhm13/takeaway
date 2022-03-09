import { useState } from "react";

// Types
import { Product } from "../../../features/api/apiSlice.types";

//Components
import { Box, Card, CardActionArea, CardMedia, Collapse } from "@mui/material";
import { DishInformation } from "./DishInformation";
import { DishOptions } from "./DishOptions";

//Style
import * as Styled from "./style";

type DishCardProps = {
  product: Product;
};

export default function DishCard({ product }: DishCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={Styled.Card}>
      <CardActionArea onClick={() => handleExpandClick()} component="div">
        <Box sx={Styled.CardContent}>
          <Box display={"flex"} flexDirection={"column"}>
            <DishInformation
              price={product.price}
              title={product.title}
              description={product.description}
              isExpanded={isExpanded}
            />
            <Collapse
              unmountOnExit
              onClick={(e) => e.stopPropagation()}
              in={isExpanded}
              timeout="auto"
            >
              <DishOptions
                id={product._id}
                title={product.title}
                price={product.price}
                optionsDish={product.options}
                onExpanded={setIsExpanded}
              />
            </Collapse>
          </Box>
          <CardMedia
            component="img"
            image="product.image"
            alt={product.title}
            sx={Styled.CardImage}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}

import React from "react";
import { Box, Typography, CardHeader } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "./style";
import { Product } from "../../../../features/api/apiSliceTypes";

type DishInformationProps = {
  title: Product["title"];
  description: Product["description"];
  price: Product["price"];
  isExpanded: boolean;
};

export function DishInformation({
  title,
  description,
  price,
  isExpanded,
}: DishInformationProps) {
  return (
    <>
      <CardHeader title={title} subheader={description} />
      <Box marginTop={1} display={"flex"} flexDirection={"row"}>
        <Typography variant={"h5"} padding={2} color={"secondary"}>
          ${price}
        </Typography>
        <ExpandMore
          expand={isExpanded}
          aria-expanded={isExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color={"secondary"} />
        </ExpandMore>
      </Box>
    </>
  );
}

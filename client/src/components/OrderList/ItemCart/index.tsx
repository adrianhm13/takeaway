// import { CartState, CartAction } from "../../../context/CartContext";
import { useAppDispatch } from "../../../app/hooks";
import { increaseQty, decreaseQty } from "../../../features/cart/cartSlice";
import { OrderProduct } from "../../../features/cart/cartSlice.types";

//Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

//Style
import * as Styled from "./style";

//Components
import { Button, Box, ListItem, Typography, ButtonGroup } from "@mui/material";

export function ItemCart({ item }: { item: OrderProduct }) {
  const dispatch = useAppDispatch();

  return (
    <ListItem divider sx={Styled.ListItem}>
      <Typography variant={"subtitle1"}>{item.title}</Typography>
      <Typography variant={"body2"} color="grey.500">
        {item.options.join(", ").toLowerCase()}
      </Typography>
      <Box sx={Styled.QuantityPrice}>
        <ButtonGroup variant="text" color="secondary" size="small">
          <Button onClick={() => dispatch(decreaseQty(item.tempId))}>
            <RemoveIcon />
          </Button>
          <Button disabled>{item.qty}</Button>
          <Button onClick={() => dispatch(increaseQty(item.tempId))}>
            <AddIcon />
          </Button>
        </ButtonGroup>
        <Typography variant={"subtitle1"} color="secondary">
          ${item.priceTotal}.00
        </Typography>
      </Box>
    </ListItem>
  );
}

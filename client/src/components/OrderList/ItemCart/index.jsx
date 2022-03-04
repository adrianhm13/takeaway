// import { CartState, CartAction } from "../../../context/CartContext";
import { useDispatch } from "react-redux";
import {
  increaseQtyAction,
  decreaseQtyAction,
} from "../../../redux/actions/cart";

//Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

//Style
import * as Styled from "./style";

//Components
import { Button, Box, ListItem, Typography, ButtonGroup } from "@mui/material";

export function ItemCart({ item }) {
  const dispatch = useDispatch();

  const handleDecrease = (id) => dispatch(decreaseQtyAction(id));
  const handleIncrease = (id) => dispatch(increaseQtyAction(id));
  
  return (
    <ListItem divider sx={Styled.ListItem}>
      <Typography variant={"subtitle1"}>{item.title}</Typography>
      <Typography variant={"body2"} color="grey.500">
        {item.options.join(", ").toLowerCase()}
      </Typography>
      <Box sx={Styled.QuantityPrice}>
        <ButtonGroup variant="text" color="secondary" size="small">
          <Button onClick={() => handleDecrease(item.tempId)}>
            <RemoveIcon />
          </Button>
          <Button disabled>{item.qty}</Button>
          <Button onClick={() => handleIncrease(item.tempId)}>
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

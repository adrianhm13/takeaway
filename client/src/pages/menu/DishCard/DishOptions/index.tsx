import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { addProduct } from "../../../../features/cart/cartSlice";

//Types
import { Product } from "../../../../features/api/apiSliceTypes";

//Components
import {
  Box,
  Button,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ButtonGroup,
} from "@mui/material";

//Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

//Style
import * as Styled from "./style";

type DishOptionsProps = {
  title: Product["title"];
  id: Product["_id"];
  price: Product["price"];
  optionsDish: Product["options"];
  onExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DishOptions(props: DishOptionsProps) {
  const { id, price, optionsDish, onExpanded, title } = props;

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);

  const dispatch = useAppDispatch();

  // Unique temp ID for each product in the orderlist,
  const uniqueId = Math.random().toString(16).slice(2);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    let optionsChoosen: string[] = [];
    for (let [key] of formData.entries()) {
      optionsChoosen.push(key);
    }
    dispatch(
      addProduct({
        id,
        tempId: uniqueId,
        title,
        price,
        priceTotal: total,
        qty: quantity,
        options: optionsChoosen,
      })
    );
    onExpanded(!onExpanded);
  };

  const handleIncrement = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQty) => prevQty - 1);
  };

  //Update total price per product
  useEffect(() => {
    setTotal(price * quantity);
  }, [quantity, price]);

  return (
    <Box padding={1} bgcolor={"grey.200"}>
      <FormOptions
        uniqueId={uniqueId}
        handleSubmit={handleSubmit}
        optionsDish={optionsDish}
      />
      <Box sx={Styled.DishQuantity}>
        <ButtonGroup variant="text" color="secondary">
          <Button onClick={() => handleDecrement()}>
            <RemoveIcon />
          </Button>
          <Button disabled>{quantity}</Button>
          <Button onClick={() => handleIncrement()}>
            <AddIcon />
          </Button>
        </ButtonGroup>
        <Button
          type="submit"
          form={uniqueId}
          variant="contained"
          color="secondary"
          fullWidth
        >
          {`$${total}.00`}
        </Button>
      </Box>
    </Box>
  );
}

type FormOptionsProps = {
  uniqueId: string;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  optionsDish: Product["options"];
};

function FormOptions(props: FormOptionsProps) {
  const { uniqueId, handleSubmit, optionsDish } = props;
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Pick your options</FormLabel>
      <form id={uniqueId} onSubmit={handleSubmit}>
        <FormGroup row>
          {optionsDish.map((optionDish) => (
            <OptionCheckbox key={optionDish} optionDish={optionDish} />
          ))}
        </FormGroup>
      </form>
    </FormControl>
  );
}

type OptionCheckboxProps = {
  optionDish: string;
};

function OptionCheckbox({ optionDish }: OptionCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox onChange={(e) => e.stopPropagation()} name={optionDish} />
      }
      label={optionDish}
    />
  );
}

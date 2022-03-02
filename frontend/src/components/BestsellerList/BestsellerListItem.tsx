import { Grid, Paper } from "@mui/material";
import { IBook } from "../../interfaces/BestsellerList";
import { BestsellerDetails } from "./BestsellerDetails";
import { ReviewList } from "../ReviewList/ReviewList";

interface IProps {
  book: IBook;
}

export const BestsellerListItem = ({ book }: IProps) => {
  return (
    <Grid item xs={12}>
      <Paper elevation={1}>
        <Grid container flexDirection={{ xs: "column", sm: "row" }} padding={1}>
          <BestsellerDetails book={book} />
          <ReviewList reviews={book.reviews} />
        </Grid>
      </Paper>
    </Grid>
  );
};

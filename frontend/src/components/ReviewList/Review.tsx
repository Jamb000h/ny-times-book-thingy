import { Grid, Link, Paper } from "@mui/material";
import {
  Column,
  ColumnDescription,
  ColumnData,
} from "../BestsellerList/Styled";
import { IReview } from "../../interfaces/BestsellerList";

interface IProps {
  review: IReview;
}

export const Review = ({ review }: IProps) => {
  return (
    <Grid item xs={12} sm={6} padding={1}>
      <Paper>
        <Grid container padding={1}>
          <Column item xs={12} sm={6}>
            <ColumnDescription>Byline</ColumnDescription>
            <ColumnData>{review.byline || "-"}</ColumnData>
          </Column>
          <Column item xs={12} sm={6}>
            <ColumnDescription>Link to review</ColumnDescription>
            <ColumnData sx={{ fontSize: "1rem" }}>
              <Link href={review.url} underline="hover" target="_blank">
                Read
              </Link>
            </ColumnData>
          </Column>
        </Grid>
      </Paper>
    </Grid>
  );
};

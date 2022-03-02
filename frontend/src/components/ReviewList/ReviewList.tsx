import { Collapse, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import { IReview } from "../../interfaces/BestsellerList";
import { Review } from "./Review";
import { ReviewDivider } from "./ReviewDivider";
import { Column } from "../BestsellerList/Styled";

interface IProps {
  reviews: IReview[];
}

export const ReviewList = ({ reviews }: IProps) => {
  const [showReviews, setShowReviews] = useState(false);

  if (reviews.length === 0) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <ReviewDivider
        showReviews={showReviews}
        setShowReviews={setShowReviews}
      />
      <Column item xs={12} mt={1}>
        <Collapse
          orientation="vertical"
          in={showReviews}
          sx={{ width: "100%" }}
        >
          <Grid container flexDirection={{ xs: "column", sm: "row" }}>
            <Fragment>
              {reviews.map((review, i) => (
                <Review review={review} key={i} />
              ))}
            </Fragment>
          </Grid>
        </Collapse>
      </Column>
    </Fragment>
  );
};

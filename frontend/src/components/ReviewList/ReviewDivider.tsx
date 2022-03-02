import { Grid, Divider, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface IProps {
  showReviews: boolean;
  setShowReviews: (showReviews: boolean) => void;
}

export const ReviewDivider = ({ showReviews, setShowReviews }: IProps) => {
  return (
    <Grid item xs={12} mt={1}>
      <Divider>
        <Chip
          label="Reviews"
          variant="outlined"
          onClick={() => setShowReviews(!showReviews)}
          icon={showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
      </Divider>
    </Grid>
  );
};

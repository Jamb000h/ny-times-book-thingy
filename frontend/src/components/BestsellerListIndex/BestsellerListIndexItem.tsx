import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { BestsellerListName } from "../../interfaces/BestsellerListNames";

export const BestsellerListIndexItem = (props: BestsellerListName) => {
  const { list_name_encoded, list_name } = props;
  return (
    <Grid item>
      <Link
        to={{
          pathname: `/bestsellers/${list_name_encoded}`,
          state: { list_name },
        }}
      >
        <Button variant="outlined">{list_name}</Button>
      </Link>
    </Grid>
  );
};

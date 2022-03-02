import { Button, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
  heading: string;
  backLink?: string;
}

export const Header = ({ heading, backLink }: IProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {backLink && (
          <Link component={RouterLink} to="/">
            <Button variant="outlined">Back</Button>
          </Link>
        )}
      </Grid>
      <Grid item xs={12}>
        <h1>{heading}</h1>
      </Grid>
    </Grid>
  );
};

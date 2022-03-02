import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { BestsellerListIndexItem } from "./BestsellerListIndexItem";
import { Header } from "../Shared/Header";
import { BestsellerListName } from "../../interfaces/BestsellerListNames";

interface IProps {
  bestsellerLists: BestsellerListName[];
}

export const BestsellerListIndex = ({ bestsellerLists }: IProps) => {
  return (
    <Container>
      <Header heading="Bestseller Lists" />
      <Grid container spacing={2}>
        {bestsellerLists.map((bestsellerList) => (
          <BestsellerListIndexItem
            key={bestsellerList.list_name_encoded}
            {...bestsellerList}
          />
        ))}
      </Grid>
    </Container>
  );
};

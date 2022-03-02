import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BestsellerListItem } from "./BestsellerListItem";
import { Header } from "../Shared/Header";
import { IBook } from "../../interfaces/BestsellerList";
import { BestsellerListName } from "../../interfaces/BestsellerListNames";
import { LoadingWithRetry } from "../Shared/LoadingWithRetry";
import { bestsellersService } from "../../services/bestsellersService";

interface IProps {
  bestsellerLists: BestsellerListName[];
}

export const BestsellerList = ({ bestsellerLists }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bestsellerList, setBestsellerList] = useState<IBook[]>([]);
  const { encodedListName } = useParams<any>();

  const getBestsellerList = async () => {
    setLoading(true);
    setError(false);
    try {
      const bestsellerList = await bestsellersService.getBestsellerList(
        encodedListName
      );
      setBestsellerList(bestsellerList);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBestsellerList();
  }, []);

  const heading =
    bestsellerLists.find((list) => list.list_name_encoded === encodedListName)
      ?.list_name || encodedListName;

  return (
    <Container>
      <Header backLink="/bestsellers" heading={`Bestsellers in ${heading}`} />
      <LoadingWithRetry
        loading={loading}
        error={error}
        retry={getBestsellerList}
      >
        <Grid container spacing={2}>
          {bestsellerList.map((book, i) => (
            <BestsellerListItem key={i} book={book} />
          ))}
        </Grid>
      </LoadingWithRetry>
    </Container>
  );
};

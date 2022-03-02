import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { BestsellerList } from "./BestsellerList/BestsellerList";
import { BestsellerListIndex } from "./BestsellerListIndex/BestsellerListIndex";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { bestsellersService } from "../services/bestsellersService";
import { BestsellerListName } from "../interfaces/BestsellerListNames";
import { Loading } from "./Shared/Loading";
import { Retry } from "./Shared/Retry";
import { LoadingWithRetry } from "./Shared/LoadingWithRetry";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bestsellerLists, setBestsellerListNames] = useState<
    BestsellerListName[]
  >([]);

  const getBestsellerLists = async () => {
    setLoading(true);
    setError(false);
    try {
      setBestsellerListNames(await bestsellersService.getBestsellerListNames());
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBestsellerLists();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <LoadingWithRetry
        loading={loading}
        error={error}
        retry={getBestsellerLists}
      >
        <Router>
          <Switch>
            <Route exact path="/bestsellers/:encodedListName">
              <BestsellerList bestsellerLists={bestsellerLists} />
            </Route>
            <Route path="/">
              <BestsellerListIndex bestsellerLists={bestsellerLists} />
            </Route>
          </Switch>
        </Router>
      </LoadingWithRetry>
    </React.Fragment>
  );
};

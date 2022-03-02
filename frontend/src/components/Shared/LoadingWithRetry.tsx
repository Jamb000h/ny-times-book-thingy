import { Fragment } from "react";
import { Loading } from "./Loading";
import { Retry } from "./Retry";

interface IProps {
  loading: boolean;
  error: boolean;
  retry: () => void;
  children: React.ReactNode;
}

export const LoadingWithRetry = ({
  loading,
  error,
  retry,
  children,
}: IProps) => {
  return (
    <Fragment>
      {loading && <Loading />}
      {!loading && error && <Retry retry={retry} />}
      {!loading && !error && <>{children}</>}
    </Fragment>
  );
};

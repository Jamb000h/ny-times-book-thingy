import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface IProps {
  retry: () => void;
}

export const Retry = (props: IProps) => {
  const { retry } = props;
  return (
    <Box padding={"1rem 0"}>
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={() => retry()}>
            Retry
          </Button>
        }
      >
        Could not load data. Please try again.
      </Alert>
    </Box>
  );
};

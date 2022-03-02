import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} padding={"1rem 0"}>
      <CircularProgress />
    </Box>
  );
};

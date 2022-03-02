import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

export const Column = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

export const ColumnDescription = styled(Typography)({
  fontSize: "0.8rem",
  lineHeight: "1.2rem",
});

export const ColumnData = styled(Typography)({
  fontSize: "1.2rem",
  lineHeight: "1.2rem",
  fontWeight: "normal",
});

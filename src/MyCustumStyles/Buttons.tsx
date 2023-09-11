import { Button, styled } from "@mui/material";

export const MyButtonMain = styled(Button)({
  borderRadius: "100px",
  backgroundColor: "#5048E5",
});

export const MyButtonContrast = styled(Button)(({ theme }) => ({
  borderRadius: "100px",
  backgroundColor: "#FFFFFF",
  color: theme.palette.primary.main,
}));

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  ThemeProvider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, CheckCircleOutline } from "@mui/icons-material";
import { myTheme } from "../../Themes/Themes";
import { FC, useState } from "react";
import CreatePartner from "../CreatePartner/CreatePartner";
import { MyButtonMain } from "../../MyCustumStyles/Buttons";

const CustomAppBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreatePartner = () => {
    setIsOpen(true);
  };
  const closeCreateDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#F9FAFC" }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="black"
          >
            Partners
          </Typography>
          <ThemeProvider theme={myTheme}>
            <MyButtonMain
              variant="contained"
              type="button"
              startIcon={<Add />}
              onClick={handleCreatePartner}
            >
              CREATE PARTNER
            </MyButtonMain>
          </ThemeProvider>
        </Toolbar>
      </Box>
      {isOpen && <CreatePartner onClose={closeCreateDialog} />}
    </>
  );
};

export default CustomAppBar;

import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue.A400,
    },
  },
  shape: {
    borderRadius: 7,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  }
});

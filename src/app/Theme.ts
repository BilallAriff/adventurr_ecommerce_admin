import { ThemeOptions, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    props?: any;
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#000722",
      light: "#f1f1f1",
      dark: "#000722",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f1f1f1",
    },
    text: {
      primary: "#000722",
      secondary: "rgba(255,255,255,0.6)",
      disabled: "rgba(0,7,34,0.5)",
    },
    divider: "#f1f1f1",
  },
  typography: {
    fontFamily: "Quicksand",
    textAlign: "left",
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 15,
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
    MuiTooltip: {
      arrow: true,
    },
  },
};

export const theme = createTheme(themeOptions);

// src/themes/theme.ts
import { extendTheme } from "@mui/joy/styles";
declare module "@mui/joy/styles" {
  interface Palette {
    primaryDark: string;
  }
  interface PaletteOptions {
    primaryDark?: string;
  }
}

const palette = {
  primary: {
    solidBg: "#0d6efd",
    solidBorder: "#0d6efd",
    solidHoverBg: "#0b5ed7",
    solidHoverBorder: "#0a58ca",
    solidActiveBg: "#0082ff",
    solidActiveBorder: "#0a53be",
    solidDisabledBg: "#0d6efd",
    solidDisabledBorder: "#0d6efd",
  },
};

const joytheme = extendTheme({
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },

  // 👇 Joy UI Button overrides
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          letterSpacing: "normal",
          fontWeight: theme.vars.fontWeight.md,
          fontFamily: theme.vars.fontFamily.fallback,
          outlineWidth: 0,
          borderRadius: "0.375rem",
          transition:
            "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
          ...(ownerState.size === "md" && {
            paddingInline: "0.75rem",
            minHeight: 38,
          }),
        }),
      },
    },
  },
});

export default joytheme;

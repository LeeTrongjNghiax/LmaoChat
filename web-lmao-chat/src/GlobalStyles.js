import ExportColor from "./GlobalVariables";

export default function GlobalStyles() {
  const {
    backgroundColor,
    textColor,
  } = ExportColor();
  
  const GlobalStyles = {
    input: {
      background: backgroundColor, 
      color: textColor, 
      colorScheme: `dark`
    }
  }

  return GlobalStyles;
}
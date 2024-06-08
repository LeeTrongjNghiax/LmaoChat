import ExportColor from "./GlobalVariables";

export default function GlobalStyles() {
  const {
    backgroundColor,
    buttonColor,
    iconColor,
    linkColor,
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
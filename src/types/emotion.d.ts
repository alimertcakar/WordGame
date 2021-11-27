// emotion.d.ts
import "@emotion/react";
import { Theme as CustomTheme } from "styles/theme";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}

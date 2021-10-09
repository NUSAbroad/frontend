import {} from "styled-components";

import { Theme as ThemeType } from "./styles/theme";

declare module "styled-components" {
  type Theme = ThemeType;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

import { createContext,  useEffect } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { useSelector } from "src/store/Store";
import { ThemeSettings } from "./theme/Theme";
import RTL from "./layouts/full/shared/customizer/RTL";
import ScrollToTop from "./components/shared/ScrollToTop";
import Router from "./routes/Router";
import { AppState } from "./store/Store";
import {values} from "./services/user.service";
import * as AuthService from "./services/auth.service";
import { useNavigate } from 'react-router-dom';
const defaultValue = values



export const CartContext = createContext(defaultValue);

const App = () => {
  const navigate = useNavigate();
  const routing = useRoutes(Router);
  
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  useEffect(() => {
  const user = AuthService.getCurrentUser();
  if (user ==  null){
    navigate("/auth/login");
  }
 

  }, []);
  return (
    <CartContext.Provider value={defaultValue} >
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
      </RTL>
    </ThemeProvider>
    </CartContext.Provider>
  );
}

export default App;

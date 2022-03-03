import { ThemeProvider } from "@mui/material/styles";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { theme } from "./theme/theme";
import Layout from "./components/Layout";

//Pages
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Menu from "./pages/menu";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/menu">
              <Menu />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

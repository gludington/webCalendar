import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";

import "./styles/Global.css";
import TridenTheme from "./styles/theme";

import Header from "./components/header";
import { DiscordAuthDone } from "./components/authentication/DiscordAuthDone";
import Home from "./pages/Home";
import Benefits from "./pages/Benefits";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Tridenverse from "./pages/Tridenverse";
import Dashboard from "./pages/Dashboard";
import PoliciesPage from "./pages/Policies";
import MemberLandingPage from "./pages/MemberLandingPage";
import GameCreationPage from "./pages/GameCreationPage";
import ErrorPage from "./pages/ErrorPage";
import AuthErrorPage from "./pages/AuthErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUserDetails } from "./api/unseenservant";

const queryClient = new QueryClient({ defaultOptions: {queries: { refetchOnWindowFocus: false, retry: false } } });

function AppContainer() {
  return <QueryClientProvider client={queryClient}><App/></QueryClientProvider>
}

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { data, isLoading, error } = useUserDetails();
  console.warn("app", data, isLoading);

  return (
    <UserContext.Provider value={{ data, isLoading, error}}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}

function App() {
  return (
    <UserProvider >
    <ThemeProvider theme={TridenTheme}>
      <Router>
        <Grid container direction="column" className="Background">
          <Grid item>
            <Header />
          </Grid>
          <Grid
            item
            container
            sx={{
              py: 10,
            }}
          >
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/tridenverse" element={<Tridenverse />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/policies" element={<PoliciesPage />} />
                <Route path="/members" element={<MemberLandingPage />} />
                <Route path="/game/create" element={<GameCreationPage />} />
                <Route
                  path="/discord_auth_done"
                  element={<DiscordAuthDone />}
                />
                <Route path="/auth_error" element={<AuthErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Grid>
            <Grid item xs={false} sm={2} />
          </Grid>
        </Grid>
        </Router>
      </ThemeProvider>
      </UserProvider>
  );
}

export default AppContainer;

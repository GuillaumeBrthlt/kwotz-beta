import { observer } from "mobx-react-lite";
import { useUserStore } from "./contexts/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import {LoginPage} from "./pages/loginPage";
import {RegisterPage} from "./pages/registerPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import NewPasswordPage from "./pages/newPasswordPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@theme";


export const App = observer(() => {
  const userStore = useUserStore()

  let localAuthToken = localStorage.auth_token;
  let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
  if (cookieExists) {
    const auth_token = localStorage.getItem('auth_token');
    const authTokenExists = auth_token !== undefined && auth_token !== null
    if (authTokenExists) {
      userStore.loginUserWithToken(auth_token)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/resetpassword" element={<ResetPasswordPage />}/>
          <Route path="/new_password" element={<NewPasswordPage />}/>
        </Routes>
      </main>
    </Router>
    </ThemeProvider>
  )
})
import RoutesMain from "./routes";
import { GlobalStyle } from "./styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <UserProvider>
        <RoutesMain />
      </UserProvider>
    </>
  );
}

export default App;

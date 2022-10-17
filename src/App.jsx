import RoutesMain from "./routes";
import { GlobalStyle } from "./styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import UserProvider from "./contexts/UserContext";
import GlobalLoading from "./components/GlobalLoading";
import TechProvider from "./contexts/TechContext";

function App() {
  return (
    <>
      <GlobalStyle/>
      <ToastContainer />

      <UserProvider>
        <TechProvider>
          <GlobalLoading>
            <RoutesMain/>
          </GlobalLoading>
        </TechProvider>
      </UserProvider>
    </>
  );
}

export default App;

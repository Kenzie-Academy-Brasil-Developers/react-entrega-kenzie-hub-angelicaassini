import RoutesMain from "./routes";
import { GlobalStyle } from "./styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import UserProvider from "./contexts/UserContext";
import TechProvider from "./contexts/TechContext";

function App() {

  return (
    <>
      <GlobalStyle/>
      <ToastContainer/>

      <UserProvider>
        <TechProvider>   
          <RoutesMain/>
        </TechProvider>
      </UserProvider>
    </>
  );
}

export default App;

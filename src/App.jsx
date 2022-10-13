import RoutesMain from './routes';
import { GlobalStyle } from './styles/global';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {

  return (
    <div className="App">
      <GlobalStyle/>
      <ToastContainer/>
      <RoutesMain/> 
    </div>
  );
}

export default App;

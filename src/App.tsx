import './App.css';
import Home from './Components/Table/Table';
import { Route, Router, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import WebsiteDetails from './Pages/WebsiteDetails/WebsiteDetails';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Main />} path='/' />
        {/* <Route element={<WebsiteDetails />} path='/:id' /> */}
        <Route element={<WebsiteDetails />} path='/:id/:tabs' /> 
        {/* change to general */}
      </Routes>
    </div>
  );
}

export default App;

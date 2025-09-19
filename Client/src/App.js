import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NB from './components/NB'
import Bodys from './components/BodyS';
import { ShopContextProvider } from './components/Context';
import CheckOut from './components/Checkout';
function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <NB />
          
          <Routes>
            <Route path='/' element={<Bodys />}></Route>
            <Route path='/checkout' element={<CheckOut />}></Route>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;

import './App.css';
import NavBar from "./components/navbar/Navbar";
import {Provider} from "react-redux";
import store from "./core/redux-store/store";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CartModal from "./components/shopping-cart/CartModal";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
      <Provider store={store}>
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='user/products' element={<ProductPage />} />
            </Routes>
            <CartModal />
        </Router>
      </Provider>
  );
}

export default App;
